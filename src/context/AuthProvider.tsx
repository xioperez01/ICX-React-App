/* eslint-disable react-refresh/only-export-components */
import { User } from "@supabase/supabase-js";

import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

type AuthUser = User & { access_token: string };

export interface AuthContext {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContext["user"]>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          ...session.user,
          access_token: session.access_token,
        });
      } else {
        setUser(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          ...session.user,
          access_token: session.access_token,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
