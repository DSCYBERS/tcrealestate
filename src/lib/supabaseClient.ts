import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase;
  const url = (import.meta.env.VITE_SUPABASE_URL as string) || (process.env.SUPABASE_URL as string);
  const key =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || (process.env.SUPABASE_ANON_KEY as string);
  if (!url || !key) return null;
  supabase = createClient(url, key, { auth: { persistSession: false } });
  return supabase;
}
