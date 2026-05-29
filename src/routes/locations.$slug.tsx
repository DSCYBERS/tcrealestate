import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, CheckCircle2, Sparkles, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";
import { getLocation, locations } from "@/lib/locations";
import { waLink, PHONE_NUMBER } from "@/lib/properties";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const loc = getLocation(params.slug);
    if (!loc) throw notFound();
    return { loc };
  },
  head: ({ loaderData }) => {
    const l = loaderData?.loc;
    const title = l ? `Plots in ${l.name} — TC Real Estates` : "Location — TC Real Estates";
    const desc = l
      ? `${l.tagline}. Starting at ₹${l.startingPrice}. Verified plots in ${l.name}, Ahmedabad.`
      : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        ...(l ? [{ property: "og:image", content: l.hero }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        ...(l ? [{ name: "twitter:image", content: l.hero }] : []),
      ],
      links: l ? [{ rel: "canonical", href: `/locations/${l.slug}` }] : [],
    };
  },
  component: LocationPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-3xl font-bold">Location not found</h1>
        <Link
          to="/properties"
          className="mt-6 bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-bold"
        >
          View all properties
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

function LocationPage() {
  const { loc } = Route.useLoaderData();
  const waMsg = `Hi, I want to know about plots in ${loc.name}.`;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader transparent />
      <section className="relative h-[70vh] min-h-[480px] flex items-center">
        <img
          src={loc.hero}
          alt={loc.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <Link
            to="/properties"
            className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> All properties
          </Link>
          <div className="mt-4 inline-flex items-center gap-1.5 bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-[11px] font-bold tracking-wider">
            <Sparkles className="w-3 h-3" /> PREMIUM LOCATION
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold max-w-3xl">
            Plots in <span className="text-primary">{loc.name}</span>
          </h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl">{loc.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold"
            >
              <MessageCircle className="w-4 h-4" /> Enquire Now
            </a>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 bg-white text-brand-dark px-6 py-3 rounded-md font-bold"
            >
              <Phone className="w-4 h-4" /> Contact Expert
            </a>
          </div>
          <p className="mt-4 text-sm text-white/80">
            Starting at <span className="text-brand-yellow font-bold">₹{loc.startingPrice}</span>
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <p className="text-xs tracking-[0.25em] text-primary font-bold">
              ABOUT {loc.name.toUpperCase()}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">
              Why {loc.name} is a smart pick
            </h2>
            <p className="mt-3 text-foreground/80 leading-relaxed">{loc.intro}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Key Highlights</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2">
              {loc.highlights.map((h: string) => (
                <li key={h} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Why Invest</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-3">
              {loc.whyInvest.map((w: string) => (
                <li key={w} className="bg-card border border-border rounded-lg p-4 text-sm">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Nearby Landmarks</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {loc.nearby.map((n: string) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-1 bg-secondary text-foreground border border-border px-3 py-1.5 rounded-full text-xs"
                >
                  <MapPin className="w-3 h-3 text-primary" /> {n}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-24 h-fit">
          <LeadForm
            title={`GET ${loc.name.toUpperCase()} DEALS`}
            subtitle="BEFORE MARKET"
            defaultPropertyId={`location-${loc.slug}`}
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export const _allLocations = locations;
