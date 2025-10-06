Inflow4

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_APP_ORIGIN=https://inflowcore.netlify.app
```

## Deployment Checklist

### Netlify Environment Variables
Ensure these environment variables are set in Netlify:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_ORIGIN` (optional)

### Supabase Configuration
1. **Auth Settings** (Settings → Auth → URL Configuration):
   - Site URL: `https://inflowcore.netlify.app` (production) and `http://localhost:5173` (development)
   - Redirect URLs: 
     - `https://inflowcore.netlify.app/`
     - `http://localhost:5173/`
   - Allowed Origins: Add Netlify URL and development URLs

2. **Google OAuth** (Auth → Providers → Google):
   - Enable Google provider
   - Add Client ID and Client Secret from Google Cloud Console
   - Additional settings:
     - Skip nonce check: Enabled
     - Request additional scopes: `profile email`

3. **Database Setup**:
   - Run the SQL script in `sql/001_create_users_table.sql` in Supabase SQL Editor

### Google Cloud Console
1. **OAuth 2.0 Client**:
   - Authorized JavaScript origins: 
     - `https://inflowcore.netlify.app`
     - `http://localhost:5173`
   - Authorized redirect URIs: 
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - `http://localhost:54321/auth/v1/callback` (for local development)

## Testing Authentication

1. **Email Signup**: 
   - Create account → redirected to login page
   - Must log in manually with credentials
   - Check Supabase Auth users and `users` table

2. **Email Login**: 
   - Login with created user → redirected to home page
   - Verify session persistence

3. **Google OAuth**: 
   - Shows account selector (prompt=select_account)
   - First-time signup → direct redirect to home page
   - Existing user login → direct redirect to home page
   - Verify redirect and session

4. **Sign Out**:
   - Clears session completely
   - Redirects to home page
   - Browser back button doesn't restore session

5. **Network Check**: 
   - Ensure no CORS errors in browser console
   - Verify proper redirect URLs

## Build & Deploy

```bash
npm run build
```

Build output: `dist/`
