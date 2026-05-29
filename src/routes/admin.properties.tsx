import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  StarOff,
  X,
  Loader2,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/admin/properties")({
  component: PropertiesAdmin,
});

type Property = {
  id: string;
  slug: string;
  name: string;
  type: string;
  location: string;
  size: string;
  price_per_sqyd: string | null;
  total_price: string;
  roi: string | null;
  image_urls: string[];
  highlights: string[];
  amenities: string[];
  landmarks: string[];
  description: string;
  map_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

const blankProperty: Omit<Property, "id"> = {
  slug: "",
  name: "",
  type: "Residential",
  location: "",
  size: "",
  price_per_sqyd: "",
  total_price: "",
  roi: "",
  image_urls: [],
  highlights: [],
  amenities: [],
  landmarks: [],
  description: "",
  map_url: "",
  is_featured: false,
  is_published: true,
  sort_order: 0,
  seo_title: "",
  seo_description: "",
};

function PropertiesAdmin() {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Property> | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    setItems((data as Property[]) ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const toggleFeatured = async (p: Property) => {
    await supabase.from("properties").update({ is_featured: !p.is_featured }).eq("id", p.id);
    load();
  };

  const del = async (p: Property) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    await supabase.from("properties").delete().eq("id", p.id);
    load();
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Properties</h1>
          <p className="text-muted-foreground mt-1">
            {items.length} listings — changes go live instantly.
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...blankProperty })}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-md hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg text-muted-foreground">
          No properties yet. Click "Add Property" to create your first listing.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Image</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      {p.image_urls[0] ? (
                        <img
                          src={p.image_urls[0]}
                          alt=""
                          className="w-14 h-14 rounded object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded bg-muted flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">{p.name}</td>
                    <td className="px-4 py-3">{p.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.location}</td>
                    <td className="px-4 py-3 font-bold text-primary">₹{p.total_price}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {p.is_published ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            Live
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                            Hidden
                          </span>
                        )}
                        {p.is_featured && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => toggleFeatured(p)}
                          title={p.is_featured ? "Unfeature" : "Feature"}
                          className="p-2 hover:bg-muted rounded"
                        >
                          {p.is_featured ? (
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          ) : (
                            <StarOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditing(p)}
                          className="p-2 hover:bg-muted rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => del(p)}
                          className="p-2 hover:bg-destructive/10 text-destructive rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing && (
        <PropertyEditor
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

function PropertyEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: Partial<Property>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<Property>>(initial);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Property>(k: K, v: Property[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
        const { error } = await supabase.storage.from("property-images").upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("property-images").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
      set("image_urls", [...(form.image_urls ?? []), ...urls]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
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
      type: (form.type ?? "Residential") as any,
      location: form.location ?? "",
      size: form.size ?? "",
      price_per_sqyd: form.price_per_sqyd || null,
      total_price: form.total_price ?? "",
      roi: form.roi || null,
      image_urls: form.image_urls ?? [],
      highlights: form.highlights ?? [],
      amenities: form.amenities ?? [],
      landmarks: form.landmarks ?? [],
      description: form.description ?? "",
      map_url: form.map_url || null,
      is_featured: !!form.is_featured,
      is_published: form.is_published !== false,
      sort_order: Number(form.sort_order ?? 0),
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
    };
    try {
      if (form.id) {
        const { error } = await supabase.from("properties").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("properties").insert(payload);
        if (error) throw error;
      }
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
      <div className="bg-card border border-border rounded-xl w-full max-w-3xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card">
          <h2 className="font-bold text-lg">{form.id ? "Edit Property" : "Add Property"}</h2>
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

          <Row>
            <Field label="Name" value={form.name ?? ""} onChange={(v) => set("name", v)} />
            <Field
              label="Slug (URL)"
              value={form.slug ?? ""}
              onChange={(v) => set("slug", v)}
              placeholder="auto from name"
            />
          </Row>
          <Row>
            <SelectField
              label="Type"
              value={form.type ?? "Residential"}
              onChange={(v) => set("type", v as never)}
              options={["Residential", "Commercial", "Industrial", "Farmhouse", "Apartment"]}
            />
            <Field
              label="Location"
              value={form.location ?? ""}
              onChange={(v) => set("location", v)}
            />
          </Row>
          <Row>
            <Field
              label="Size"
              value={form.size ?? ""}
              onChange={(v) => set("size", v)}
              placeholder="1200 Sq. Yd."
            />
            <Field
              label="Price per SqYd"
              value={form.price_per_sqyd ?? ""}
              onChange={(v) => set("price_per_sqyd", v)}
              placeholder="18,000"
            />
            <Field
              label="Total Price"
              value={form.total_price ?? ""}
              onChange={(v) => set("total_price", v)}
              placeholder="2.16 Cr"
            />
          </Row>
          <Row>
            <Field
              label="ROI (optional)"
              value={form.roi ?? ""}
              onChange={(v) => set("roi", v)}
              placeholder="25% in 2 years"
            />
            <Field
              label="Google Maps URL"
              value={form.map_url ?? ""}
              onChange={(v) => set("map_url", v)}
              placeholder="https://maps.google.com/..."
            />
            <NumberField
              label="Sort Order"
              value={form.sort_order ?? 0}
              onChange={(v) => set("sort_order", v)}
            />
          </Row>

          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
            />
          </div>

          <TagField
            label="Highlights"
            value={form.highlights ?? []}
            onChange={(v) => set("highlights", v)}
            placeholder="Clear title, Near Tata plant..."
          />
          <TagField
            label="Amenities"
            value={form.amenities ?? []}
            onChange={(v) => set("amenities", v)}
            placeholder="Water, Power, Road..."
          />
          <TagField
            label="Nearby Landmarks"
            value={form.landmarks ?? []}
            onChange={(v) => set("landmarks", v)}
            placeholder="SG Highway, Airport..."
          />

          <div>
            <label className="text-sm font-semibold">Images</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {(form.image_urls ?? []).map((url, i) => (
                <div
                  key={url}
                  className="relative w-24 h-24 rounded overflow-hidden border border-border"
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() =>
                      set(
                        "image_urls",
                        (form.image_urls ?? []).filter((_, j) => j !== i),
                      )
                    }
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 rounded border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted">
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-[10px] mt-1 text-muted-foreground">Upload</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          <Row>
            <Field
              label="SEO Title"
              value={form.seo_title ?? ""}
              onChange={(v) => set("seo_title", v)}
            />
            <Field
              label="SEO Description"
              value={form.seo_description ?? ""}
              onChange={(v) => set("seo_description", v)}
            />
          </Row>

          <div className="flex items-center gap-4 pt-2">
            <Toggle
              label="Featured"
              checked={!!form.is_featured}
              onChange={(v) => set("is_featured", v)}
            />
            <Toggle
              label="Published"
              checked={form.is_published !== false}
              onChange={(v) => set("is_published", v)}
            />
          </div>
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

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>;
}
function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
      />
    </div>
  );
}
function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
      />
    </div>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
function TagField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label} <span className="text-muted-foreground font-normal">(comma-separated)</span>
      </label>
      <input
        value={value.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        placeholder={placeholder}
        className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background"
      />
    </div>
  );
}
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-primary"
      />
      <span className="text-sm font-semibold">{label}</span>
    </label>
  );
}
