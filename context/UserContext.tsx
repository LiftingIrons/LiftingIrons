import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface UserProfile {
  user_id: string;
  name?: string;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  gender?: string | null;
  activity_level?: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profile?: UserProfile | null;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const supabaseUser = sessionData.session?.user;
      if (supabaseUser) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', supabaseUser.id)
          .maybeSingle();

        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email ?? '',
          name: profile?.name || supabaseUser.email?.split('@')[0] || 'Athlete',
          profile: profile ?? null,
        });
      }
      setIsLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const supabaseUser = session.user;
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', supabaseUser.id)
          .maybeSingle();

        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email ?? '',
          name: profile?.name || supabaseUser.email?.split('@')[0] || 'Athlete',
          profile: profile ?? null,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
