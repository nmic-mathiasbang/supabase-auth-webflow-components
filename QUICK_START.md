# Quick Start - Supabase Auth for Webflow

## ✅ Everything is Ready!

Your components are configured and ready to share to Webflow.

## Step 1: Share Components

Run this command:

```bash
npx webflow library share
```

**What to expect:**
- It will show: `AuthGate (Changed)` and `LoginForm (Changed)`
- Type `Y` to confirm
- Components will be uploaded to your workspace

## Step 2: Install in Webflow

1. Open your Webflow site
2. Press `L` → Find **"auth-test"** → Click **Install**

## Step 3: Use Components

### Login Page
1. Press `⇧C` → Find **LoginForm**
2. Drag to login page
3. Props are pre-configured (you can verify)

### Dashboard Page
1. Press `⇧C` → Find **AuthGate**
2. Drag to dashboard page
3. Drag ALL dashboard content INTO the AuthGate component
4. Props are pre-configured

## Step 4: Test

1. Publish/Preview site
2. Go to login page
3. Create account
4. Should redirect to dashboard
5. Try accessing dashboard directly (should redirect if not logged in)

## That's It! 🎉

Your authentication is ready to use!

See `NEXT_STEPS.md` for detailed instructions.

