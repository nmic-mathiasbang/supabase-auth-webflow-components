import * as React from "react";

// Supabase configuration - controlled in code, not in Webflow props
// TODO: Replace with your Supabase project URL and anon key
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Redirect URLs
const REDIRECT_TO_AUTH_DENIED = '/auth-denied';
const REDIRECT_TO_LOGIN = '/login';

// Detect if we're running inside the Webflow Designer canvas
const isWebflowDesigner = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Webflow exposes env mode when available
  if ((window as any).Webflow?.env?.mode === 'design') {
    return true;
  }

  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    const body = document.body;

    if (html?.getAttribute('data-wf-mode') === 'design') {
      return true;
    }

    if (html?.classList.contains('wf-design-mode') || body?.classList.contains('wf-design-mode')) {
      return true;
    }

    const referrer = document.referrer || '';
    if (referrer.includes('webflow.com/design') || referrer.includes('design.webflow.com')) {
      return true;
    }
  }

  if (window.self !== window.top) {
    try {
      if ((window.parent as any)?.Webflow?.env?.mode === 'design') {
        return true;
      }

      if ((window.parent as any)?.document?.documentElement?.classList.contains('wf-design-mode')) {
        return true;
      }
    } catch (error) {
      // Cross-origin access (expected inside designer preview). Use referrer heuristic.
      if (typeof document !== 'undefined') {
        const referrer = document.referrer || '';
        if (referrer.includes('webflow.com/design') || referrer.includes('design.webflow.com')) {
          return true;
        }
      }
    }
  }

  const hostname = window.location.hostname;
  if (hostname === 'design.webflow.com' || (hostname === 'webflow.com' && window.location.pathname.startsWith('/design'))) {
    return true;
  }

  return false;
};

interface AuthGateProps {
  showLoadingMessage: boolean;
  children?: React.ReactNode;
}

export const AuthGate = ({ 
  showLoadingMessage,
  children 
}: AuthGateProps) => {
  const isDesigner = React.useMemo(() => isWebflowDesigner(), []);

  const [authState, setAuthState] = React.useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
  const [supabase, setSupabase] = React.useState<any>(null);
  const isLoggingOut = React.useRef(false);

  // If in Webflow Designer, skip authentication and always show content
  if (isDesigner) {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.5rem 1rem',
          fontSize: '12px',
          fontWeight: 500,
          color: '#666',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd',
          borderRadius: '4px',
          zIndex: 1000,
        }}>
          🎨 Webflow Designer Mode - Auth disabled
        </div>
        <button
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            padding: '0.5rem 1rem',
            fontSize: '14px',
            fontWeight: 500,
            color: '#999',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'not-allowed',
            zIndex: 1000,
            opacity: 0.6,
          }}
          disabled
        >
          Logout (disabled in designer)
        </button>
        {children}
      </div>
    );
  }

  React.useEffect(() => {
    // Don't initialize Supabase in designer mode
    if (isDesigner) return;
    
    if (typeof window !== 'undefined') {
      // Dynamically import Supabase client
      import('@supabase/supabase-js').then(({ createClient }) => {
        setSupabase(createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
      });
    }
  }, [isDesigner]);

  React.useEffect(() => {
    if (!supabase) return;

    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('AuthGate: Error checking session', error);
          setAuthState('unauthenticated');
          return;
        }

        if (!session) {
          setAuthState('unauthenticated');
          return;
        }

        setAuthState('authenticated');
      } catch (error) {
        console.error('AuthGate: Unexpected error', error);
        setAuthState('unauthenticated');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setAuthState('unauthenticated');
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setAuthState('authenticated');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Redirect unauthenticated users to /auth-denied (but not if we're logging out)
  React.useEffect(() => {
    if (authState === 'unauthenticated' && typeof window !== 'undefined' && !isLoggingOut.current) {
      window.location.href = REDIRECT_TO_AUTH_DENIED;
    }
  }, [authState]);

  // Logout handler
  const handleLogout = async () => {
    if (!supabase) return;
    
    // Set flag to prevent redirect to /auth-denied
    isLoggingOut.current = true;
    
    try {
      // Sign out first and wait for it to complete
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('AuthGate: Error signing out', error);
        // Still redirect even if there's an error
      }
      
      // Redirect after signOut completes
      window.location.href = REDIRECT_TO_LOGIN;
    } catch (error) {
      console.error('AuthGate: Unexpected error during logout', error);
      // Still redirect even if there's an error
      window.location.href = REDIRECT_TO_LOGIN;
    }
  };

  // Show loading state while checking authentication
  if (authState === 'checking' && showLoadingMessage) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Checking authentication...
      </div>
    );
  }

  // If unauthenticated, redirect will happen via useEffect - show nothing or loading
  if (authState === 'unauthenticated') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Redirecting...
      </div>
    );
  }

  // User is authenticated - show page content with logout button
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          padding: '0.5rem 1rem',
          fontSize: '14px',
          fontWeight: 500,
          color: '#333',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#fff';
        }}
      >
        Logout
      </button>
      {children}
    </div>
  );
};

