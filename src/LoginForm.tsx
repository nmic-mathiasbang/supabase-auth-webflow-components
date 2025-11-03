import * as React from "react";

// Supabase configuration - controlled in code, not in Webflow props
// TODO: Replace with your Supabase project URL and anon key
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Redirect URL after successful login - controlled in code, not in Webflow props
const REDIRECT_AFTER_LOGIN = '/dashboard';

interface LoginFormProps {
  showSignUp: boolean;
}

// This is the actual React component
export const LoginForm = ({ 
  showSignUp
}: LoginFormProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Initialize Supabase client
  const [supabase, setSupabase] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically import Supabase client
      import('@supabase/supabase-js').then(({ createClient }) => {
        setSupabase(createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
      });
    }
  }, []);


  // Check if user is already logged in
  React.useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session) {
        window.location.href = REDIRECT_AFTER_LOGIN;
      }
    });
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase not configured. Please add your URL and key in component settings.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else if (data.user) {
          setSuccess('Account created! Please check your email to verify, or sign in if verification is disabled.');
          setTimeout(() => {
            setIsSignUp(false);
            setSuccess(null);
          }, 3000);
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
        } else if (data.session) {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => {
            window.location.href = REDIRECT_AFTER_LOGIN;
          }, 500);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px' }}>
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h1>

      {error && (
        <div style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          background: '#e8f5e9',
          color: '#2e7d32',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '500'
          }}
        >
          {loading ? (isSignUp ? 'Signing up...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      {showSignUp && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccess(null);
            }}
            style={{ color: '#4CAF50', textDecoration: 'none' }}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </a>
        </div>
      )}
    </div>
  );
};

