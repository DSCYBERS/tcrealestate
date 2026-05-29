import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Loader2, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/locations")({
  component: LocationsAdmin,
});

type Loc = {
  id: string;
  slug: string;
  name: string;
  hero_image: string | null;
  starting_price: string | null;
  description: string;
  why_invest: string[];
  landmarks: string[];
  map_url: string | null;
  is_published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

const blank: Partial<Loc> = {
  slug: "",
  name: "",
  hero_image: "",
  starting_price: "",
  description: "",
  why_invest: [],
  landmarks: [],
  map_url: "",
  is_published: true,
  sort_order: 0,
};

function LocationsAdmin() {
  const [items, setItems] = useState<Loc[]>([]);
  const [editing, setEditing] = useState<Partial<Loc> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("location_pages").select("*").order("sort_order");
    setItems((data as Loc[]) ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const del = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    await supabase.from("location_pages").delete().eq("id", id);
    load();
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Locations</h1>
          <p className="text-muted-foreground mt-1">Investment zone landing pages.</p>
        </div>
        <button
          onClick={() => setEditing({ ...blank })}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-md"
        >
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((l) => (
            <div key={l.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {l.hero_image && (
                <img src={l.hero_image} alt="" className="w-full h-32 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold">{l.name}</h3>
                  {!l.is_published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{l.description}</p>
                <div className="text-sm font-bold text-primary mt-2">₹{l.starting_price}</div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setEditing(l)}
                    className="flex-1 inline-flex items-center justify-center gap-1 border border-border rounded-md text-xs font-semibold py-1.5 hover:bg-muted"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => del(l.id)}
                    className="p-1.5 border border-destructive text-destructive rounded-md hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <LocationEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function LocationEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: Partial<Loc>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<Loc>>(initial);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof Loc>(k: K, v: Loc[K]) => setForm((f) => ({ ...f, [k]: v }));

  const uploadHero = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `locations/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
    const { error } = await supabase.storage.from("property-images").upload(path, file);
    if (error) {
      setError(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("property-images").getPublicUrl(path);
    set("hero_image", data.publicUrl);
    setUploading(false);
    e.target.value = "";
  };

  const save = async () => {
    setBusy(true);
    setError(null);
    const slug = (form.slug || form.name || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const payload = {
      slug,
      name: form.name ?? "",
      hero_image: form.hero_image || null,
      starting_price: form.starting_price || null,
      description: form.description ?? "",
      why_invest: form.why_invest ?? [],
      landmarks: form.landmarks ?? [],
      map_url: form.map_url || null,
      is_published: form.is_published !== false,
      sort_order: Number(form.sort_order ?? 0),
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
    };
    try {
      const { error } = form.id
        ? await supabase.from("location_pages").update(payload).eq("id", form.id)
        : await supabase.from("location_pages").insert(payload);
      if (error) throw error;
      onSaved();
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : String(err);
      setError(error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card">
          <h2 className="font-bold text-lg">{form.id ? "Edit Location" : "Add Location"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <In label="Name" v={form.name ?? ""} o={(v) => set("name", v)} />
            <In label="Slug" v={form.slug ?? ""} o={(v) => set("slug", v)} placeholder="auto" />
            <In
              label="Starting Price"
              v={form.starting_price ?? ""}
              o={(v) => set("starting_price", v)}
              placeholder="18,000 / Sq.Yd"
            />
            <In
              label="Sort Order"
              v={String(form.sort_order ?? 0)}
              o={(v) => set("sort_order", Number(v))}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Hero Image</label>
            <div className="mt-1 flex items-center gap-3">
              {form.hero_image && (
                <img src={form.hero_image} alt="" className="w-20 h-20 object-cover rounded" />
              )}
              <label className="inline-flex items-center gap-2 border border-dashed border-border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}{" "}
                Upload
                <input type="file" accept="image/*" onChange={uploadHero} className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
            />
          </div>
          <In label="Google Maps URL" v={form.map_url ?? ""} o={(v) => set("map_url", v)} />
          <Tags label="Why Invest" v={form.why_invest ?? []} o={(v) => set("why_invest", v)} />
          <Tags label="Nearby Landmarks" v={form.landmarks ?? []} o={(v) => set("landmarks", v)} />
          <div className="grid grid-cols-2 gap-3">
            <In label="SEO Title" v={form.seo_title ?? ""} o={(v) => set("seo_title", v)} />
            <In
              label="SEO Description"
              v={form.seo_description ?? ""}
              o={(v) => set("seo_description", v)}
            />
          </div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_published !== false}
              onChange={(e) => set("is_published", e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm font-semibold">Published</span>
          </label>
        </div>
        <div className="p-5 border-t border-border flex justify-end gap-2 sticky bottom-0 bg-card">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-border text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold inline-flex items-center gap-2 disabled:opacity-50"
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />} Save
          </button>
        </div>
      </div>
    </div>
  );
}

function In({
  label,
  v,
  o,
  placeholder,
}: {
  label: string;
  v: string;
  o: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={v}
        onChange={(e) => o(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
      />
    </div>
  );
}
function Tags({ label, v, o }: { label: string; v: string[]; o: (v: string[]) => void }) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label} <span className="text-muted-foreground font-normal">(comma-separated)</span>
      </label>
      <input
        value={v.join(", ")}
        onChange={(e) =>
          o(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
      />
    </div>
  );
}
