# Supabase Auth Configuration for Webflow

This guide outlines the authentication settings you need to configure in your Supabase dashboard for your Webflow site.

## Project Information

- **Project ID**: `ahldhqthoarowgktxujs`
- **Project URL**: `https://ahldhqthoarowgktxujs.supabase.co`
- **Project Name**: webauth

## Required Dashboard Configuration

### 1. Site URL Configuration

**Location**: [Authentication > URL Configuration](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/url-configuration)

**Set Site URL** to your Webflow site URL:
- If your site is at `https://yoursite.com`: `https://yoursite.com`
- If it's a Webflow subdomain: `https://yoursite.webflow.io`
- For testing: `http://localhost:3000` (or your local dev URL)

### 2. Redirect URLs

**Location**: [Authentication > URL Configuration](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/url-configuration)

**Add Redirect URLs** (these are URLs Supabase will redirect to after authentication):

Add all variations of your Webflow URLs:
- `https://yoursite.com/dashboard`
- `https://yoursite.com/page/dashboard`
- `https://yoursite.webflow.io/dashboard`
- `https://yoursite.webflow.io/page/dashboard`
- Your production domain if different
- Any staging/preview URLs you use

**Important**: Webflow URLs may use `/page/` prefix. Make sure to add both:
- With prefix: `/page/dashboard`, `/page/login`
- Without prefix: `/dashboard`, `/login`

### 3. Email Provider Settings

**Location**: [Authentication > Providers](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/providers)

**Email Provider** (enabled by default):
- ✅ **Enable Email signup** - Should be ON
- ⚠️ **Confirm email** - Recommended settings:
  - **For Testing**: Set to `OFF` (users can sign in immediately)
  - **For Production**: Set to `ON` (users must verify email)

**Current Recommendation**: 
For easier testing with Webflow, consider disabling email confirmation temporarily:
1. Go to Auth > Providers > Email
2. Toggle **"Enable email confirmations"** OFF
3. This allows users to sign in immediately after signup

### 4. Email Templates (Optional)

**Location**: [Authentication > Email Templates](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/templates)

You can customize email templates for:
- **Confirm signup** - Sent when user signs up
- **Magic Link** - For passwordless login
- **Reset Password** - For password recovery

**Default templates work fine** for Webflow integration, but you can customize the branding.

### 5. Password Requirements

**Location**: [Authentication > Providers > Email](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/providers)

**Password Settings**:
- Minimum password length: `6` (default, minimum allowed)
- You can increase this for better security

## Testing Configuration

### Quick Test Setup (Recommended for Development)

1. **Disable email confirmation**:
   - Auth > Providers > Email
   - Toggle "Enable email confirmations" OFF
   
2. **Add localhost redirect URLs**:
   - Auth > URL Configuration
   - Add: `http://localhost:3000/dashboard`
   - Add: `http://localhost:3000/page/dashboard`

3. **Set Site URL**:
   - Auth > URL Configuration
   - Site URL: `http://localhost:3000` (or your test URL)

### Production Setup

1. **Enable email confirmation**:
   - Auth > Providers > Email
   - Toggle "Enable email confirmations" ON

2. **Add production redirect URLs**:
   - Your actual Webflow site domain
   - All page variations (`/dashboard`, `/page/dashboard`)

3. **Configure custom SMTP** (recommended):
   - Auth > Settings
   - Set up custom SMTP provider (Supabase default has rate limits)

## Security Best Practices

1. **Row Level Security (RLS)**:
   - Enable RLS on any tables with user data
   - Create policies based on `auth.uid()`

2. **Rate Limiting**:
   - Supabase has built-in rate limiting
   - Monitor in Auth > Logs if needed

3. **Session Management**:
   - Default session lifetime: 1 hour
   - Configurable in Auth > Settings

## Current Status

✅ **Auth Schema**: Ready (users table exists)  
✅ **No Security Issues**: No security advisors found  
✅ **Project Active**: Status is ACTIVE_HEALTHY  

## Next Steps

1. ✅ Configure Site URL in dashboard
2. ✅ Add Redirect URLs for your Webflow site
3. ⚠️ Decide on email confirmation (OFF for testing, ON for production)
4. ⚠️ Test authentication flow
5. ⚠️ Set up RLS policies if storing user data in database
6. ⚠️ Configure custom SMTP for production (optional)

## Quick Links

- [URL Configuration](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/url-configuration)
- [Auth Providers](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/providers)
- [Email Templates](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/templates)
- [Auth Settings](https://supabase.com/dashboard/project/ahldhqthoarowgktxujs/auth/settings)

## Important Notes

- **Email confirmation**: Disabling makes testing easier, but enable for production
- **Redirect URLs**: Must match exactly (including `/page/` prefix if Webflow uses it)
- **Site URL**: Used as default redirect if no specific redirect URL is provided
- **Custom SMTP**: Supabase default SMTP has rate limits; consider custom SMTP for production

