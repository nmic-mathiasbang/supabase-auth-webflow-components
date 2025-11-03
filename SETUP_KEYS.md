# Setting Up Supabase Keys

⚠️ **IMPORTANT:** The Supabase API keys have been removed from the source code for security. You need to add them before deploying to Webflow.

## Quick Setup

1. Open `src/AuthGate.tsx` and `src/LoginForm.tsx`
2. Replace the placeholder values:

```typescript
// Replace this:
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// With your actual values:
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

3. Get your keys from [Supabase Dashboard](https://app.supabase.com):
   - Go to Settings → API
   - Copy your **Project URL** (for SUPABASE_URL)
   - Copy your **anon public** key (for SUPABASE_ANON_KEY)

## For Local Development

You can create a `.env` file (already in .gitignore):

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

However, note that Webflow Code Components are bundled, so environment variables won't work at runtime. You'll need to hardcode them in the source files before sharing to Webflow.

## Security Note

- The `.env` file is already in `.gitignore` and won't be committed
- Never commit actual API keys to Git

