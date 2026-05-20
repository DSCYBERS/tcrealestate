import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Search, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { properties, type PropertyType } from "@/lib/properties";

export const Route = createFileRoute("/properties")({
  component: PropertiesPage,
  head: () => ({
    meta: [
      { title: "Properties — TC Real Estates" },
      { name: "description", content: "Browse verified residential, commercial, industrial and farmhouse plots across Ahmedabad." },
      { property: "og:title", content: "Properties — TC Real Estates" },
      { property: "og:description", content: "Verified plots & apartments across Ahmedabad." },
    ],
  }),
});

const TYPES: ("All" | PropertyType)[] = ["All", "Residential", "Commercial", "Industrial", "Farmhouse", "Apartment"];

function PropertiesPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [q, setQ] = useState("");
  const list = properties.filter(
    (p) =>
      (type === "All" || p.type === type) &&
      (q === "" || `${p.name} ${p.location}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <section className="bg-secondary/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-xs tracking-[0.25em] text-primary font-bold">OUR PROPERTIES</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Verified Plots & Properties</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Hand-picked, legally verified properties across Ahmedabad's fastest-growing locations.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 text-xs font-bold tracking-wide rounded-full border transition ${
                  type === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search location or name..."
              className="w-full border border-border rounded-md pl-9 pr-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {list.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">No properties match your filters.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <article key={p.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group">
                <Link to="/properties/$id" params={{ id: p.id }} className="block overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </Link>
                <div className="p-5">
                  <div className="text-[10px] tracking-widest text-primary font-bold">{p.type.toUpperCase()}</div>
                  <h3 className="font-bold text-base mt-1">{p.name}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {p.location}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span>{p.size}</span>
                    <span className="text-primary font-bold">
                      {p.pricePerSqYd === "—" ? `₹ ${p.totalPrice}` : `₹ ${p.pricePerSqYd}/Sq.Yd`}
                    </span>
                  </div>
                  <Link
                    to="/properties/$id"
                    params={{ id: p.id }}
                    className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-md py-2 text-xs font-bold tracking-wide hover:opacity-90"
                  >
                    VIEW DETAILS <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
