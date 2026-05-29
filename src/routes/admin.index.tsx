import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Users, MapPin, FileText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Counts = {
  properties: number;
  leads: number;
  newLeads: number;
  locations: number;
  posts: number;
};

function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({
    properties: 0,
    leads: 0,
    newLeads: 0,
    locations: 0,
    posts: 0,
  });
  const [recent, setRecent] = useState<Record<string, never>[]>([]);

  useEffect(() => {
    (async () => {
      const [p, l, nl, loc, posts, recentLeads] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("location_pages").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setCounts({
        properties: p.count ?? 0,
        leads: l.count ?? 0,
        newLeads: nl.count ?? 0,
        locations: loc.count ?? 0,
        posts: posts.count ?? 0,
      });
      setRecent(recentLeads.data ?? []);
    })();
  }, []);

  const cards = [
    {
      label: "Properties",
      value: counts.properties,
      icon: Building2,
      to: "/admin/properties",
      color: "bg-blue-500",
    },
    {
      label: "Total Leads",
      value: counts.leads,
      icon: Users,
      to: "/admin/leads",
      color: "bg-emerald-500",
      badge: counts.newLeads > 0 ? `${counts.newLeads} new` : undefined,
    },
    {
      label: "Locations",
      value: counts.locations,
      icon: MapPin,
      to: "/admin/locations",
      color: "bg-amber-500",
    },
    {
      label: "Blog Posts",
      value: counts.posts,
      icon: FileText,
      to: "/admin/blog",
      color: "bg-fuchsia-500",
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Live overview of your website.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              to={c.to}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div className={`${c.color} text-white p-2.5 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
                {c.badge && (
                  <span className="text-xs font-bold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="mt-4 text-3xl font-extrabold">{c.value}</div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1 group-hover:text-primary">
                {c.label} <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Recent Leads</h2>
          <Link to="/admin/leads" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No leads yet — they'll appear here as soon as someone submits the form.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((l) => (
              <div key={l.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold truncate">{l.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {l.phone} · {l.requirement || "—"} · {l.location || "—"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(l.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
