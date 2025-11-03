# Webflow DevLink Setup Guide

Complete guide for setting up Supabase Auth components with Webflow DevLink.

## Your Supabase Credentials

**⚠️ IMPORTANT:** Before using these components, you must add your Supabase credentials:

1. Get your Supabase URL and anon key from your [Supabase Dashboard](https://app.supabase.com)
2. Replace the placeholder values in `src/AuthGate.tsx` and `src/LoginForm.tsx`:
   - Replace `YOUR_SUPABASE_PROJECT_URL` with your Supabase project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your Supabase anon key

**Supabase URL format:**
```
https://[your-project-ref].supabase.co
```

**Supabase Anon Key:**
Get this from your Supabase Dashboard → Settings → API → Project API keys → `anon` `public` key

## Step 1: Initial Setup

### Install Dependencies

```bash
npm install
```

This will install:
- `@supabase/supabase-js` - Supabase client library
- `react` & `react-dom` - React dependencies
- `@webflow/webflow-cli` - Webflow CLI (dev dependency)
- `@webflow/data-types` - Webflow prop types (dev dependency)
- `@webflow/react` - Webflow React utilities (dev dependency)

### Project Structure

```
.
├── src/
│   ├── LoginForm.tsx          # React component
│   ├── LoginForm.webflow.tsx  # Webflow component definition
│   ├── AuthGate.tsx           # React component
│   └── AuthGate.webflow.tsx   # Webflow component definition
├── webflow.json               # Webflow library configuration
├── package.json               # Dependencies
└── DEVLINK_SETUP.md          # This file
```

## Step 2: Authenticate with Webflow

Before you can share your library, you need to authenticate with Webflow:

```bash
npx webflow library share
```

The CLI will:
1. Check for authentication token
2. If not found, open a browser window for authorization
3. **Authorize your workspace** (Freelancer, Core, Growth, Agency, or Enterprise plan required)
4. Save the authentication token

## Step 3: Share Your Library

After authentication, run:

```bash
npx webflow library share
```

The CLI will:
1. **Bundle your library** - Compile all components
2. **Show component list** - Confirm which components to share:
   - LoginForm
   - AuthGate
3. **Upload to your Workspace** - Make the library available to all sites in your workspace

## Step 4: Install Library on Your Webflow Site

1. Open your Webflow site in the designer
2. Open the **Libraries panel**:
   - Press `L` or click the Resources icon in the left sidebar
3. Find **"Supabase Auth Components"** in the available libraries
4. Click **Install** next to your library

## Step 5: Add Components to Your Pages

### Login Page Setup

1. **Open the Components panel**:
   - Press `⇧C` or click the Components icon in the left sidebar
2. **Find LoginForm**:
   - Scroll to "Supabase Auth Components" section
   - Find "LoginForm" under "Authentication" group
3. **Add to page**:
   - Drag LoginForm onto your login page
4. **Configure props** (in Properties panel):
   - **Supabase URL**: `https://ahldhqthoarowgktxujs.supabase.co` (pre-filled)
   - **Supabase Anon Key**: Your key (pre-filled)
   - **Redirect URL**: Your dashboard page URL (e.g., `/dashboard` or `/page/dashboard`)
   - **Show Sign Up Option**: Toggle on/off as needed

### Dashboard Page Setup

1. **Add AuthGate component**:
   - Drag AuthGate onto your dashboard page
2. **Configure props**:
   - **Supabase URL**: `https://ahldhqthoarowgktxujs.supabase.co` (pre-filled)
   - **Supabase Anon Key**: Your key (pre-filled)
   - **Redirect URL**: Your login page URL (e.g., `/login` or `/page/login`)
   - **Show Loading Message**: Toggle on/off
3. **Add protected content**:
   - Drag all your dashboard content (divs, text, images, etc.) **into the AuthGate component**
   - This content will only be visible to authenticated users

## Step 6: Test Your Authentication Flow

1. **Publish or Preview** your site
2. Navigate to your login page
3. **Create a test account**
4. You should be redirected to dashboard
5. **Test protection**:
   - Open dashboard in incognito/private window
   - Should redirect to login
6. **Test logout** (if you have a logout button)

## Troubleshooting

### Library Not Showing in Webflow

- Make sure you've run `npx webflow library share` successfully
- Check that your workspace has the correct plan (Freelancer, Core, Growth, Agency, or Enterprise)
- Try refreshing the Libraries panel

### Components Not Appearing

- Verify the library is installed on your site
- Check the Components panel (⇧C)
- Make sure you're looking in the "Supabase Auth Components" section

### Authentication Not Working

- Double-check Supabase credentials in component props
- Verify redirect URLs match your actual page URLs
- Check browser console for errors
- Ensure Supabase project is active

### Build Errors

If you get build errors when running `npx webflow library share`:

1. Check Node.js version (needs 20+):
   ```bash
   node --version
   ```

2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

## Component Props Reference

### LoginForm

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `supabaseUrl` | Text | Pre-filled | Your Supabase project URL |
| `supabaseKey` | Text | Pre-filled | Your Supabase anon key |
| `redirectTo` | Text | `/page/dashboard` | Where to redirect after login |
| `showSignUp` | Toggle | `true` | Show sign up option |

### AuthGate

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `supabaseUrl` | Text | Pre-filled | Your Supabase project URL |
| `supabaseKey` | Text | Pre-filled | Your Supabase anon key |
| `redirectTo` | Text | `/page/login` | Where to redirect if not authenticated |
| `showLoadingMessage` | Toggle | `true` | Show loading message |
| `children` | Slot | - | Protected content (drag elements here) |

## Updating Components

After making changes to your components:

1. Edit files in `src/`
2. Run `npx webflow library share` again
3. Webflow will prompt to update the existing library
4. Components will auto-update in your Webflow sites

## Production Checklist

- [ ] Test authentication flow end-to-end
- [ ] Configure Supabase email templates (optional)
- [ ] Set up Row Level Security (RLS) policies in Supabase
- [ ] Test on multiple browsers
- [ ] Verify redirect URLs match your production site structure
- [ ] Consider disabling email verification for testing (if needed)

## Next Steps

1. ✅ Set up project structure
2. ✅ Share library to Webflow
3. ✅ Install on your site
4. ✅ Configure and test components
5. ⚠️ Set up Supabase RLS policies
6. ⚠️ Configure email settings in Supabase dashboard
7. ⚠️ Add social auth providers (optional)

## Resources

- [Webflow Code Components Docs](https://developers.webflow.com/code-components)
- [Webflow DevLink Quickstart](https://developers.webflow.com/code-components/quickstart)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/database/postgres/row-level-security)

