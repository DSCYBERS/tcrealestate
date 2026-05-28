import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2, Star } from "lucide-react";

export const Route = createFileRoute("/admin/testimonials")({
  component: TestimonialsAdmin,
});

type T = { id: string; name: string; role: string | null; quote: string; rating: number; is_published: boolean; sort_order: number };

function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", role: "", quote: "", rating: 5 });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems((data as T[]) ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name.trim() || !form.quote.trim()) return;
    await supabase.from("testimonials").insert({ name: form.name, role: form.role || null, quote: form.quote, rating: form.rating, sort_order: items.length + 1 });
    setForm({ name: "", role: "", quote: "", rating: 5 });
    load();
  };

  const update = async (id: string, patch: Partial<T>) => {
    await supabase.from("testimonials").update(patch).eq("id", id);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <h1 className="text-3xl font-extrabold mb-1">Testimonials</h1>
      <p className="text-muted-foreground mb-6">Customer reviews shown on your homepage.</p>

      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h2 className="font-bold mb-3">Add new</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="border border-border rounded-md px-3 py-2 text-sm bg-background" />
          <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role (e.g. Investor)" className="border border-border rounded-md px-3 py-2 text-sm bg-background" />
        </div>
        <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="Quote..." rows={3} className="w-full mt-3 border border-border rounded-md px-3 py-2 text-sm bg-background" />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rating:</span>
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="border border-border rounded-md px-2 py-1 text-sm bg-background">
              {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button onClick={add} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-md text-sm"><Plus className="w-4 h-4" /> Add</button>
        </div>
      </div>

      {loading ? <div className="text-center py-16"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div> : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input defaultValue={t.name} onBlur={(e) => update(t.id, { name: e.target.value })} className="font-bold bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none" />
                    <input defaultValue={t.role ?? ""} onBlur={(e) => update(t.id, { role: e.target.value })} className="text-sm text-muted-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none" />
                  </div>
                  <textarea defaultValue={t.quote} onBlur={(e) => update(t.id, { quote: e.target.value })} rows={2} className="w-full mt-2 text-sm bg-transparent border border-transparent hover:border-border focus:border-primary rounded p-2" />
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button key={i} onClick={() => update(t.id, { rating: i + 1 })}><Star className={`w-4 h-4 ${i < t.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`} /></button>
                      ))}
                    </div>
                    <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={t.is_published} onChange={(e) => update(t.id, { is_published: e.target.checked })} className="accent-primary" /> Published</label>
                    <input type="number" defaultValue={t.sort_order} onBlur={(e) => update(t.id, { sort_order: Number(e.target.value) })} className="w-16 border border-border rounded px-2 py-0.5 text-xs bg-background" title="Sort order" />
                  </div>
                </div>
                <button onClick={() => del(t.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
