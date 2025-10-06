import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContextType, User } from '../types/auth';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Get initial session with proper error handling
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          if (mounted) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        if (session?.user && mounted) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username,
          });
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes with improved handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state change:', event, session?.user?.id || 'no user');
        
        if (!mounted) return;

        try {
          if (event === 'SIGNED_OUT' || !session) {
            // Handle sign out - immediate state update
            console.log('User signed out, clearing state');
            setUser(null);
            setIsSigningOut(false);
            setLoading(false);
            
            // Clear any remaining client-side data
            try {
              localStorage.removeItem('supabase.auth.token');
              sessionStorage.clear();
            } catch (e) {
              console.warn('Error clearing storage:', e);
            }
            
          } else if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            // Handle sign in - update user state
            const newUser = {
              id: session.user.id,
              email: session.user.email || '',
              username: session.user.user_metadata?.username,
            };
            
            setUser(newUser);
            setLoading(false);
            
            // Non-blocking database upsert (don't await)
            supabase.from('users').upsert({
              id: session.user.id,
              email: session.user.email,
              created_at: new Date().toISOString()
            }, { 
              onConflict: 'id',
              ignoreDuplicates: false 
            }).then(({ error }) => {
              if (error) {
                console.error('Error upserting user:', error);
              }
            });
          }
        } catch (error) {
          console.error('Error in auth state change handler:', error);
          if (mounted) {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) {
        console.error('Signup error:', error);
        throw new Error(error.message || 'Signup failed');
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        throw new Error(error.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (isSigningOut) {
      console.log('Sign out already in progress');
      return;
    }

    console.log('Starting sign out process');
    setIsSigningOut(true);

    try {
      // 1. Call Supabase sign out
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase signout error:', error);
        // Continue with cleanup even if Supabase fails
      } else {
        console.log('Supabase signout successful');
      }
      
    } catch (error) {
      console.error('Sign out error:', error);
      // Continue with cleanup even on error
    }

    // 2. Force clear all client-side data
    try {
      // Clear localStorage
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('supabase') || key.includes('auth'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        if (name.includes('supabase') || name.includes('auth')) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
      });
      
    } catch (error) {
      console.error('Error clearing client data:', error);
    }

    // 3. Force update state
    setUser(null);
    setIsSigningOut(false);
    setLoading(false);

    // 4. Redirect to landing page
    console.log('Redirecting to landing page');
    window.location.replace('/');
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      setLoading(false);
      
      if (error) {
        console.error('Google OAuth error:', error);
        throw new Error(error.message || 'Google sign-in failed');
      }
      
      return data;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || isSigningOut,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}