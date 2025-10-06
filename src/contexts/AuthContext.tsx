import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Boot validation: Get initial session and validate it
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session validation error:', error);
          setUser(null);
          setLoading(false);
          return;
        }
        
        // Validate session is still valid
      if (session?.user) {
          // Double-check session validity by making an authenticated request
          const { error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            console.error('Session invalid:', userError);
            setUser(null);
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              username: session.user.user_metadata?.username,
            });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Auth state sync: Global auth-state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        
        if (event === 'SIGNED_OUT' || !session?.user) {
          // Ensure auth state is reset on sign out
          setUser(null);
        } else if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username,
          });
          
          // Upsert user to database (only for successful sign-ins)
          try {
            await supabase.from('users').upsert({
              id: session.user.id,
              email: session.user.email,
              created_at: new Date().toISOString()
            }, { 
              onConflict: 'id',
              ignoreDuplicates: false 
            });
          } catch (error) {
            console.error('Error upserting user:', error);
          }
        }
        
        // Only set loading to false after initial load
        if (loading) {
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [loading]);

  // Front-end sign-up handler
  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      
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
        
        // Handle specific error cases
        if (error.message.includes('already registered')) {
          throw new Error('An account with this email already exists. Please sign in instead.');
        } else if (error.message.includes('Invalid email')) {
          throw new Error('Please enter a valid email address.');
        } else if (error.message.includes('Password')) {
          throw new Error('Password must be at least 6 characters long.');
        } else {
          throw new Error(error.message || 'Account creation failed. Please try again.');
        }
      }
      
      // For email signup, user needs to verify email before they can sign in
      // Don't update auth state here - let them sign in manually after verification
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Front-end sign-in handler
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please check your email and click the verification link before signing in.');
        } else if (error.message.includes('Too many requests')) {
          throw new Error('Too many login attempts. Please wait a moment and try again.');
        } else {
          throw new Error(error.message || 'Sign in failed. Please try again.');
        }
      }
      
      // Auth state will be updated by the onAuthStateChange listener
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign-out handler
  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear client-side session tokens/localStorage/cookies first
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear any auth-related cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Sign out from Supabase and await completion
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Signout error:', error);
        // Don't throw here - still want to clear local state and redirect
      }
      
      // Ensure auth state is reset (redundant but safe)
      setUser(null);
      
      // Wait a moment to ensure all cleanup is complete, then redirect
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Redirect to landing page and replace history to prevent back button issues
      window.location.replace('/');
    } catch (error) {
      console.error('Signout error:', error);
      // Even if there's an error, ensure cleanup and redirect
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace('/');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
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
    if (error) {
      console.error('Google OAuth error:', error);
      throw new Error(error.message || 'Google sign-in failed');
    }
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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