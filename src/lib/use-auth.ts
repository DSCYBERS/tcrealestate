import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AuthState = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    const loadRole = async (userId: string | undefined) => {
      if (!userId) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    };

    // Subscribe FIRST, then check existing session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setState((s) => ({ ...s, session, user: session?.user ?? null }));
      // Defer role lookup so we don't block the auth callback
      if (session?.user) {
        setTimeout(async () => {
          const isAdmin = await loadRole(session.user.id);
          if (mounted) setState((s) => ({ ...s, isAdmin, loading: false }));
        }, 0);
      } else {
        setState((s) => ({ ...s, isAdmin: false, loading: false }));
      }
    });

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const session = data.session;
      const isAdmin = await loadRole(session?.user.id);
      if (mounted) {
        setState({
          user: session?.user ?? null,
          session,
          isAdmin,
          loading: false,
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}

export const signOut = () => supabase.auth.signOut();
