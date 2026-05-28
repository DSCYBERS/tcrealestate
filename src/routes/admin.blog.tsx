import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Loader2, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/blog")({
  component: BlogAdmin,
});

type Post = {
  id: string; slug: string; title: string; excerpt: string | null; content: string;
  cover_image: string | null; author: string | null; is_published: boolean;
  published_at: string | null; seo_title: string | null; seo_description: string | null; og_image: string | null;
};

const blank: Partial<Post> = { slug: "", title: "", excerpt: "", content: "", is_published: false };

function BlogAdmin() {
  const [items, setItems] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setItems((data as Post[]) ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    load();
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Blog</h1>
          <p className="text-muted-foreground mt-1">Publish articles with SEO controls.</p>
        </div>
        <button onClick={() => setEditing({ ...blank })} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-2.5 rounded-md"><Plus className="w-4 h-4" /> New Post</button>
      </div>

      {loading ? <div className="text-center py-16"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div> : items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg text-muted-foreground">No blog posts yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-3">
              {p.cover_image && <img src={p.cover_image} alt="" className="w-20 h-20 rounded object-cover" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{p.title}</h3>
                  {p.is_published ? <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Published</span> : <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">Draft</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.excerpt}</p>
                <div className="text-xs text-muted-foreground mt-1">/{p.slug}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(p)} className="p-2 hover:bg-muted rounded"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => del(p.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && <PostEditor initial={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
    </div>
  );
}

function PostEditor({ initial, onClose, onSaved }: { initial: Partial<Post>; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState<Partial<Post>>(initial);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>, field: "cover_image" | "og_image") => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const path = `blog/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, "_")}`;
    const { error } = await supabase.storage.from("property-images").upload(path, file);
    if (error) { setError(error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("property-images").getPublicUrl(path);
    setF((p) => ({ ...p, [field]: data.publicUrl }));
    setUploading(false); e.target.value = "";
  };

  const save = async () => {
    setBusy(true); setError(null);
    const slug = (f.slug || f.title || "").toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const payload = {
      slug, title: f.title ?? "", excerpt: f.excerpt || null, content: f.content ?? "",
      cover_image: f.cover_image || null, author: f.author || null,
      is_published: !!f.is_published,
      published_at: f.is_published && !f.published_at ? new Date().toISOString() : f.published_at,
      seo_title: f.seo_title || null, seo_description: f.seo_description || null, og_image: f.og_image || null,
    };
    try {
      const { error } = f.id
        ? await supabase.from("blog_posts").update(payload).eq("id", f.id)
        : await supabase.from("blog_posts").insert(payload);
      if (error) throw error;
      onSaved();
    } catch (err: any) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-xl w-full max-w-3xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card">
          <h2 className="font-bold text-lg">{f.id ? "Edit Post" : "New Post"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          {error && <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded">{error}</div>}
          <div className="grid grid-cols-2 gap-3">
            <I label="Title" v={f.title ?? ""} o={(v) => setF({ ...f, title: v })} />
            <I label="Slug (URL)" v={f.slug ?? ""} o={(v) => setF({ ...f, slug: v })} />
            <I label="Author" v={f.author ?? ""} o={(v) => setF({ ...f, author: v })} />
          </div>
          <div>
            <label className="text-sm font-semibold">Excerpt</label>
            <textarea value={f.excerpt ?? ""} onChange={(e) => setF({ ...f, excerpt: e.target.value })} rows={2} className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background" />
          </div>
          <div>
            <label className="text-sm font-semibold">Content (Markdown supported)</label>
            <textarea value={f.content ?? ""} onChange={(e) => setF({ ...f, content: e.target.value })} rows={12} className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm font-mono bg-background" />
          </div>
          <div>
            <label className="text-sm font-semibold">Cover Image</label>
            <div className="mt-1 flex items-center gap-3">
              {f.cover_image && <img src={f.cover_image} alt="" className="w-24 h-16 object-cover rounded" />}
              <label className="inline-flex items-center gap-2 border border-dashed border-border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted">{uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload<input type="file" accept="image/*" onChange={(e) => upload(e, "cover_image")} className="hidden" /></label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <I label="SEO Title" v={f.seo_title ?? ""} o={(v) => setF({ ...f, seo_title: v })} />
            <I label="SEO Description" v={f.seo_description ?? ""} o={(v) => setF({ ...f, seo_description: v })} />
          </div>
          <div>
            <label className="text-sm font-semibold">OG Image (social share)</label>
            <div className="mt-1 flex items-center gap-3">
              {f.og_image && <img src={f.og_image} alt="" className="w-24 h-16 object-cover rounded" />}
              <label className="inline-flex items-center gap-2 border border-dashed border-border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted">{uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload<input type="file" accept="image/*" onChange={(e) => upload(e, "og_image")} className="hidden" /></label>
            </div>
          </div>
          <label className="inline-flex items-center gap-2"><input type="checkbox" checked={!!f.is_published} onChange={(e) => setF({ ...f, is_published: e.target.checked })} className="w-4 h-4 accent-primary" /><span className="text-sm font-semibold">Published</span></label>
        </div>
        <div className="p-5 border-t border-border flex justify-end gap-2 sticky bottom-0 bg-card">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-border text-sm font-semibold">Cancel</button>
          <button onClick={save} disabled={busy} className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold inline-flex items-center gap-2 disabled:opacity-50">{busy && <Loader2 className="w-4 h-4 animate-spin" />} Save</button>
        </div>
      </div>
    </div>
  );
}

function I({ label, v, o }: { label: string; v: string; o: (v: string) => void }) {
  return <div><label className="text-sm font-semibold">{label}</label><input value={v} onChange={(e) => o(e.target.value)} className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background" /></div>;
}
