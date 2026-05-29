import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { properties, type PropertyType } from "@/lib/properties";

export const Route = createFileRoute("/properties")({
  component: PropertiesPage,
  head: () => ({
    meta: [
      { title: "Properties — TC Real Estates" },
      {
        name: "description",
        content:
          "Browse verified residential, commercial, industrial and farmhouse plots across Ahmedabad with advanced filters.",
      },
      { property: "og:title", content: "Properties — TC Real Estates" },
      { property: "og:description", content: "Verified plots & apartments across Ahmedabad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: properties.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `/properties/${p.id}`,
            name: p.name,
          })),
        }),
      },
    ],
  }),
});

const TYPES: ("All" | PropertyType)[] = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
  "Farmhouse",
  "Apartment",
];
const LOCATIONS = ["All", ...Array.from(new Set(properties.map((p) => p.location)))];
type SortKey = "newest" | "price_asc" | "price_desc" | "size_desc";

const parseCr = (v: string) => parseFloat(v.replace(/[^\d.]/g, "")) || 0;
const parseSize = (v: string) => parseFloat(v.replace(/[^\d.]/g, "")) || 0;

function PropertiesPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [q, setQ] = useState("");
  const [location, setLocation] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(500); // in lakhs * x; we'll use Cr
  const [minSize, setMinSize] = useState<number>(0);
  const [sort, setSort] = useState<SortKey>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const list = useMemo(() => {
    let r = properties.filter(
      (p) =>
        (type === "All" || p.type === type) &&
        (location === "All" || p.location === location) &&
        (q === "" || `${p.name} ${p.location}`.toLowerCase().includes(q.toLowerCase())) &&
        parseCr(p.totalPrice) <= maxPrice &&
        parseSize(p.size) >= minSize,
    );
    if (sort === "price_asc")
      r = [...r].sort((a, b) => parseCr(a.totalPrice) - parseCr(b.totalPrice));
    if (sort === "price_desc")
      r = [...r].sort((a, b) => parseCr(b.totalPrice) - parseCr(a.totalPrice));
    if (sort === "size_desc") r = [...r].sort((a, b) => parseSize(b.size) - parseSize(a.size));
    return r;
  }, [type, location, q, maxPrice, minSize, sort]);

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
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
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
          <div className="flex items-center gap-2">
            <div className="relative md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search location or name..."
                className="w-full border border-border rounded-md pl-9 pr-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 border border-border rounded-md px-3 py-2.5 text-xs font-bold"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-card border border-border rounded-lg p-5 mb-6 grid md:grid-cols-4 gap-5">
            <div>
              <label className="text-[11px] font-bold tracking-wider text-muted-foreground">
                LOCATION
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-muted-foreground">
                MAX PRICE: ₹{maxPrice} Cr
              </label>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-muted-foreground">
                MIN SIZE: {minSize} Sq.Yd
              </label>
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={minSize}
                onChange={(e) => setMinSize(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-wider text-muted-foreground">
                SORT BY
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="mt-1 w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="size_desc">Size: Largest First</option>
              </select>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4">
          Showing {list.length} of {properties.length} properties
        </p>

        {list.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            No properties match your filters.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <article
                key={p.id}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group"
              >
                <Link to="/properties/$id" params={{ id: p.id }} className="block overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>
                <div className="p-5">
                  <div className="text-[10px] tracking-widest text-primary font-bold">
                    {p.type.toUpperCase()}
                  </div>
                  <h3 className="font-bold text-base mt-1">{p.name}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {p.location}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span>{p.size}</span>
                    <span className="text-primary font-bold">₹ {p.totalPrice}</span>
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
