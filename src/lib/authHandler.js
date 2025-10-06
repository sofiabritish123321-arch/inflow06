// src/lib/authHandler.js
import { supabase } from './supabaseClient'

export async function processOAuthRedirectAndSession() {
  try {
    // Handle OAuth redirect
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session error:', error);
      return;
    }
    
    if (data.session) {
      console.log('Session found:', data.session);
      // Session is automatically handled by the auth state change listener
    }
  } catch (err) {
    console.error('Auth handler error:', err);
  }

  // The auth state change listener in AuthContext will handle the rest
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth event in handler:', event, session);

    if (session?.user) {
      try {
        await supabase.from('users').upsert({
          id: session.user.id,
          email: session.user.email,
          created_at: new Date().toISOString()
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });
      } catch (e) {
        console.error('Failed to upsert user:', e);
      }
      
      // Dispatch custom event for any components that need to know
      window.dispatchEvent(new CustomEvent('inflow:auth-changed', { detail: { session } }));
    }
  });

  return supabase.auth.getSession();
}