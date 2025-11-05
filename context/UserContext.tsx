import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { supabase, saveUserProfile, saveUserGoals, UserProfile, FitnessGoals } from '@/lib/supabase';

interface UserDimensions {
  age: number;
  height: number;
  weight: number;
  gender: string;
}

interface UserGoals {
  primary: string;
  activityLevel: string;
}

interface User {
  name: string;
  email: string;
  id?: string;
  dimensions?: UserDimensions;
  goals?: UserGoals;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseUser, setSupabaseUser] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  // Listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Enhanced setUser function that also saves to Supabase
  const setUserWithSync = async (userData: User | null) => {
    setUser(userData);
    // Note: Supabase sync is now handled in the goals screen
    // to ensure proper user creation flow
  };

  // Load user data from Supabase when authenticated
  useEffect(() => {
    if (supabaseUser && !user) {
      // Here you could load existing user data from Supabase
      // For now, we'll let the onboarding flow handle initial data creation
      setUser({ 
        id: supabaseUser.id, 
        name: supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || ''
      });
    }
  }, [supabaseUser]);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      router.replace('/sign-up');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
    
    setIsLoading(false);
  }, [user, segments]);

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithSync, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}