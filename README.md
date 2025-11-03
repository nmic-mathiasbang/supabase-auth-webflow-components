# Supabase Auth Components for Webflow

Webflow Code Components for integrating Supabase Authentication into your Webflow sites.

## What's Included

- **LoginForm** - Login/signup form component with Supabase authentication
- **AuthGate** - Wrapper component that protects content behind authentication

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Share to Webflow

```bash
npx webflow library share
```

This will authenticate with Webflow and upload your component library to your workspace.

### 3. Install on Your Webflow Site

1. Open your Webflow site
2. Press `L` to open Libraries panel
3. Find "Supabase Auth Components"
4. Click **Install**

### 4. Use Components

1. Press `⇧C` to open Components panel
2. Find components in "Authentication" group
3. Drag onto your pages and configure

## Components

### LoginForm

Login and signup form with Supabase authentication.

**Props:**
- `supabaseUrl` - Your Supabase project URL (pre-configured)
- `supabaseKey` - Your Supabase anon key (pre-configured)
- `redirectTo` - Where to redirect after login (default: `/page/dashboard`)
- `showSignUp` - Show sign up option (default: `true`)

**Usage:** Add to your login page

### AuthGate

Protects content - only visible to authenticated users.

**Props:**
- `supabaseUrl` - Your Supabase project URL (pre-configured)
- `supabaseKey` - Your Supabase anon key (pre-configured)
- `redirectTo` - Where to redirect if not authenticated (default: `/page/login`)
- `showLoadingMessage` - Show loading message (default: `true`)

**Slot:** Drag all protected content into the component

**Usage:** Add to protected pages (dashboard, etc.) and drag content into it

## Project Structure

```
.
├── src/
│   ├── LoginForm.tsx          # Login React component
│   ├── LoginForm.webflow.tsx   # Webflow component definition
│   ├── AuthGate.tsx           # AuthGate React component
│   └── AuthGate.webflow.tsx   # Webflow component definition
├── package.json               # Dependencies
├── webflow.json               # Webflow library config
├── DEVLINK_SETUP.md          # Complete setup guide
└── README.md                  # This file
```

## Documentation

- **[DEVLINK_SETUP.md](./DEVLINK_SETUP.md)** - Complete step-by-step setup guide
- [Webflow Code Components Docs](https://developers.webflow.com/code-components)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)

## Requirements

- Node.js 20+ and npm 10+
- Webflow account with DevLink access (Workspace plan required)
- Supabase project (credentials pre-configured in components)

## Updating Components

After making changes:

```bash
npx webflow library share
```

Components will auto-update in your Webflow sites.
