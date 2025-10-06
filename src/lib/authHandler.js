// src/lib/authHandler.js
import { supabase } from './supabaseClient'

export async function processOAuthRedirectAndSession() {
  // Attempt to process OAuth redirect (SDK supports getSessionFromUrl in some versions)
  try {
    if (typeof supabase.auth.getSessionFromUrl === 'function') {
      // v2 SDK might have this
      await supabase.auth.getSessionFromUrl({ storeSession: true })
    }
  } catch (err) {
    // ignore if not supported
    console.debug('getSessionFromUrl not available or failed', err)
  }

  // Register onAuthStateChange to handle session changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.debug('Auth event', event, session)

    if (session?.user) {
      // Upsert the user in users table (non-blocking)
      try {
        await supabase.from('users').upsert({
          id: session.user.id,
          email: session.user.email,
          updated_at: new Date().toISOString()
        }, { returning: 'minimal' })
      } catch (e) {
        console.error('Failed to upsert user', e)
      }
      // Optionally redirect to dashboard or update UI via window.dispatchEvent
      window.dispatchEvent(new CustomEvent('inflow:auth-changed', { detail: { session } }))
    }
  })

  // Also expose a helper to get current session
  return supabase.auth.getSession()
}