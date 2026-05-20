import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, CheckCircle2, ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";
import { properties, waLink, PHONE_NUMBER } from "@/lib/properties";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    const title = p ? `${p.name} — TC Real Estates` : "Property — TC Real Estates";
    const desc = p ? `${p.name} in ${p.location} — ${p.size}. ${p.description}` : "Property details";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-3xl font-bold">Property not found</h1>
        <p className="mt-2 text-muted-foreground">The listing you're looking for may have been removed.</p>
        <Link to="/properties" className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-bold">
          View all properties
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/properties" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to properties
        </Link>

        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={p.image} alt={p.name} className="w-full h-72 md:h-96 object-cover rounded-xl" />
            <div className="mt-6">
              <div className="text-[11px] tracking-widest text-primary font-bold">{p.type.toUpperCase()}</div>
              <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">{p.name}</h1>
              <p className="mt-2 text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> {p.location}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat label="Size" value={p.size} />
                <Stat label="Type" value={p.type} />
                <Stat label="Rate" value={p.pricePerSqYd === "—" ? "—" : `₹ ${p.pricePerSqYd}`} />
                <Stat label="Total" value={`₹ ${p.totalPrice}`} />
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold">Overview</h2>
                <p className="mt-2 text-foreground/80 leading-relaxed">{p.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold">Key Highlights</h2>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={waLink(`Hi, I'm interested in ${p.name} (${p.location}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-bold">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
                </a>
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-3 rounded-md text-sm font-bold">
                  <Phone className="w-4 h-4" /> Call Expert
                </a>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <LeadForm title="ENQUIRE ABOUT" subtitle="THIS PROPERTY" defaultPropertyId={p.id} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="text-[10px] tracking-widest text-muted-foreground font-semibold">{label.toUpperCase()}</div>
      <div className="mt-1 font-bold">{value}</div>
    </div>
  );
}
