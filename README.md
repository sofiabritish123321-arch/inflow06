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
   - Site URL: Add `https://inflowcore.netlify.app` and `http://localhost:5173`
   - Redirect URLs: Add `https://your-project-ref.supabase.co/auth/v1/callback`
   - Allowed Origins: Add Netlify URL and development URLs

2. **Google OAuth** (Auth → Providers → Google):
   - Enable Google provider
   - Add Client ID and Client Secret from Google Cloud Console

3. **Database Setup**:
   - Run the SQL script in `sql/001_create_users_table.sql` in Supabase SQL Editor

### Google Cloud Console
1. **OAuth 2.0 Client**:
   - Authorized JavaScript origins: Add `https://inflowcore.netlify.app` and `http://localhost:5173`
   - Authorized redirect URIs: Add `https://your-project-ref.supabase.co/auth/v1/callback`

## Testing Authentication

1. **Email Signup**: Create account, check Supabase Auth users and `users` table
2. **Email Login**: Login with created user, verify session
3. **Google OAuth**: Complete Google login flow, verify redirect and session
4. **Network Check**: Ensure no CORS errors in browser console

## Build & Deploy

```bash
npm run build
```

Build output: `dist/`
