import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/homepage")({
  component: HomepageAdmin,
});

type SiteContent = Record<string, any>;

function HomepageAdmin() {
  const [hero, setHero] = useState<SiteContent>({});
  const [contact, setContact] = useState<SiteContent>({});
  const [seo, setSeo] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("*").in("key", ["hero", "contact", "seo_home"]);
      const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
      setHero(map.hero ?? {}); setContact(map.contact ?? {}); setSeo(map.seo_home ?? {});
      setLoading(false);
    })();
  }, []);

  const saveAll = async () => {
    setBusy(true);
    await Promise.all([
      supabase.from("site_content").upsert({ key: "hero", value: hero }),
      supabase.from("site_content").upsert({ key: "contact", value: contact }),
      supabase.from("site_content").upsert({ key: "seo_home", value: seo }),
    ]);
    setBusy(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Homepage & SEO</h1>
          <p className="text-muted-foreground mt-1">Edit hero, CTAs, contact info, and homepage SEO.</p>
        </div>
        <button onClick={saveAll} disabled={busy} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-md disabled:opacity-50">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save changes"}
        </button>
      </div>

      <Section title="Hero Section">
        <K label="Top tagline" v={hero.tagline} o={(v) => setHero({ ...hero, tagline: v })} />
        <K label="Main headline" v={hero.title} o={(v) => setHero({ ...hero, title: v })} />
        <K label="Highlighted phrase" v={hero.highlight} o={(v) => setHero({ ...hero, highlight: v })} />
        <K label="Subtitle" v={hero.subtitle} o={(v) => setHero({ ...hero, subtitle: v })} textarea />
        <div className="grid sm:grid-cols-2 gap-3">
          <K label="Primary CTA text" v={hero.cta_primary} o={(v) => setHero({ ...hero, cta_primary: v })} />
          <K label="Secondary CTA text" v={hero.cta_secondary} o={(v) => setHero({ ...hero, cta_secondary: v })} />
        </div>
      </Section>

      <Section title="Contact Details">
        <div className="grid sm:grid-cols-2 gap-3">
          <K label="Phone (display)" v={contact.phone} o={(v) => setContact({ ...contact, phone: v })} />
          <K label="WhatsApp (digits only)" v={contact.whatsapp} o={(v) => setContact({ ...contact, whatsapp: v })} />
          <K label="Email" v={contact.email} o={(v) => setContact({ ...contact, email: v })} />
          <K label="Address" v={contact.address} o={(v) => setContact({ ...contact, address: v })} />
        </div>
      </Section>

      <Section title="Homepage SEO">
        <K label="Page Title (under 60 chars)" v={seo.title} o={(v) => setSeo({ ...seo, title: v })} />
        <K label="Meta Description (under 160 chars)" v={seo.description} o={(v) => setSeo({ ...seo, description: v })} textarea />
        <K label="OG Image URL" v={seo.og_image} o={(v) => setSeo({ ...seo, og_image: v })} />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-4">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function K({ label, v, o, textarea }: { label: string; v: any; o: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      {textarea
        ? <textarea value={v ?? ""} onChange={(e) => o(e.target.value)} rows={3} className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background" />
        : <input value={v ?? ""} onChange={(e) => o(e.target.value)} className="w-full mt-1 border border-border rounded-md px-3 py-2 text-sm bg-background" />}
    </div>
  );
}
