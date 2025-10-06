// src/lib/authHandler.js
import { supabase } from './supabaseClient'

// Simplified auth handler - main auth logic is now in AuthContext
export async function processOAuthRedirectAndSession() {
  try {
    // Handle OAuth redirect (for Google OAuth only)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session error:', error);
      return;
    }
    
    if (data.session) {
      console.log('Session found:', data.session);
      // Session is automatically handled by the auth state change listener in AuthContext
    }
  } catch (err) {
    console.error('Auth handler error:', err);
  }

  // Return session for any components that need it
  return supabase.auth.getSession();
}