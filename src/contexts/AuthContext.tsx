import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.user_metadata?.username,
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        
        if (event === 'SIGNED_OUT' || !session) {
          // Handle sign out - clear user state immediately
          setUser(null);
          setLoading(false);
        } else if (session?.user) {
          // Handle sign in - set user and upsert to database
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username,
          });
          
          // Upsert user to database (non-blocking for sign-out)
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
            // Don't block auth flow on database errors
          }
          
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
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
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
    return data;
  };

  const signOut = async () => {
    try {
      // 1. Trigger Supabase sign out first
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase signout error:', error);
        // Continue with cleanup even if Supabase fails
      }
      
      // 2. Clear all local storage and session storage
      localStorage.clear();
      sessionStorage.clear();
      
      // 3. Clear any cookies (if any)
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
      // 4. Set user state to null immediately
      setUser(null);
      
      // 5. Redirect to landing page (always happens)
      window.location.replace('/');
      
    } catch (error) {
      console.error('Sign out error:', error);
      
      // Ensure cleanup happens even on error
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      window.location.replace('/');
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