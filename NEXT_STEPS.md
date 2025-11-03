# Next Steps Guide

You've successfully set up Supabase Auth for Webflow! Here's what to do next:

## ✅ What's Done

1. ✅ Supabase project configured
2. ✅ Database migration applied (profiles table with RLS)
3. ✅ Code Components created (LoginForm & AuthGate)
4. ✅ TypeScript errors fixed
5. ✅ Component props configured with your credentials

## 🚀 Next Steps

### Step 1: Share Components to Webflow

Run the share command to upload your components:

```bash
npx webflow library share
```

**What happens:**
- Bundles your components
- Shows you the component list to confirm
- Uploads to your Webflow workspace

**If you get errors:**
- Make sure you're authenticated (it will prompt you)
- Check that all files compile without TypeScript errors

### Step 2: Install Library on Your Webflow Site

1. Open your Webflow site in the designer
2. Press `L` (or click Resources icon) to open Libraries panel
3. Find **"auth-test"** library (or whatever you named it)
4. Click **Install**

### Step 3: Add LoginForm to Login Page

1. Press `⇧C` (or click Components icon) to open Components panel
2. Find **LoginForm** under "Authentication" group
3. Drag it onto your login page
4. **Configure props** in the Properties panel:
   - Supabase URL (pre-filled)
   - Supabase Anon Key (pre-filled)
   - Redirect URL: `/dashboard` or `/page/dashboard` (your dashboard URL)
   - Show Sign Up Option: ON/OFF

### Step 4: Add AuthGate to Dashboard Page

1. Open your dashboard page
2. Find **AuthGate** component in Components panel
3. Drag it onto the page
4. **Configure props**:
   - Supabase URL (pre-filled)
   - Supabase Anon Key (pre-filled)
   - Redirect URL: `/login` or `/page/login` (your login URL)
   - Show Loading Message: ON/OFF

5. **IMPORTANT**: Drag ALL your dashboard content INTO the AuthGate component
   - This wraps your content so it's only visible when authenticated
   - You can drag divs, text, images, etc. into it

### Step 5: Test the Flow

1. **Publish or Preview** your Webflow site
2. Navigate to your login page
3. Create a test account (email/password)
4. You should be redirected to dashboard
5. **Test protection**:
   - Open dashboard in incognito/private window
   - Should redirect to login
6. **Test session persistence**:
   - Refresh dashboard page
   - Should stay logged in

### Step 6: Configure Supabase Redirect URLs

Make sure your Supabase project has the correct redirect URLs:

1. Go to [Supabase Dashboard > Auth > URL Configuration](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/url-configuration)

2. Add your Webflow site URLs to **Redirect URLs**:
   - `https://yoursite.com/dashboard`
   - `https://yoursite.com/page/dashboard`
   - `https://yoursite.webflow.io/dashboard` (if using Webflow subdomain)
   - Include both with and without `/page/` prefix

3. Set **Site URL** to your main Webflow site URL

## 🔧 Troubleshooting

### Components Not Showing in Webflow

- Make sure library is installed (Libraries panel)
- Check Components panel (⇧C)
- Refresh Webflow designer

### Authentication Not Working

- Verify Supabase credentials in component props
- Check browser console for errors
- Ensure redirect URLs match exactly (including `/page/` prefix)
- Verify Supabase redirect URLs are configured in dashboard

### TypeScript Errors

All TypeScript errors should now be fixed:
- ✅ Removed `description` from props (not supported)
- ✅ Fixed React imports
- ✅ Removed invalid props from LoginForm interface
- ✅ Removed slots definition (handled automatically via children)

### Redirect Not Working

- Check that redirect URLs in components match your actual page URLs
- Verify both are added to Supabase redirect URLs
- Test with both `/page/dashboard` and `/dashboard` variations

## 📝 Important Notes

### About Slots (AuthGate)

The AuthGate component accepts `children` as a prop (React.ReactNode), which means:
- In Webflow, you drag content INTO the component
- Webflow automatically treats it as children
- No special slot configuration needed

### Email Confirmation

For testing, you may want to disable email confirmation:
1. Supabase Dashboard > Auth > Providers > Email
2. Toggle "Enable email confirmations" OFF
3. Re-enable for production

### Production Checklist

Before going live:
- [ ] Enable email confirmation in Supabase
- [ ] Set up custom SMTP (optional, but recommended)
- [ ] Configure production redirect URLs
- [ ] Test authentication flow end-to-end
- [ ] Verify RLS policies are working
- [ ] Test on multiple browsers
- [ ] Check mobile responsiveness

## 🎉 You're Ready!

Your components are configured and ready to use. Share them to Webflow and start building!

