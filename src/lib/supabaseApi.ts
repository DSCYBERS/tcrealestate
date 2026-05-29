import { getSupabaseClient } from "./supabaseClient";
import type { Property } from "./properties";

function hasClient() {
  return !!getSupabaseClient();
}

export async function fetchProperties(): Promise<Property[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from<Property>("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Property[]) || [];
}

export async function saveLeadToSupabase(lead: {
  name: string;
  phone: string;
  requirement?: string;
  location?: string;
  source?: string;
  message?: string;
}) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("leads")
    .insert([{ ...lead, created_at: new Date().toISOString() }]);
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function upsertPropertySupabase(p: Partial<Property> & { id?: string }) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("No supabase client");
  if (p.id) {
    const { data, error } = await supabase
      .from("properties")
      .upsert(p as never, { returning: "representation" });
    if (error) throw error;
    return data?.[0] ?? null;
  }
  const { data, error } = await supabase
    .from("properties")
    .insert([{ ...p, created_at: new Date().toISOString() }]);
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function deletePropertySupabase(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("No supabase client");
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
}
