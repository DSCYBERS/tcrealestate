import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Target, Users, Award, TrendingUp, Handshake } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroImg from "@/assets/hero-ahmedabad.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — TC Real Estates" },
      {
        name: "description",
        content:
          "TC Real Estates — Ahmedabad's trusted real-estate partner for verified plots, transparent deals and expert guidance.",
      },
      { property: "og:title", content: "About Us — TC Real Estates" },
      {
        property: "og:description",
        content: "Local experts. Verified properties. Transparent deals.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative h-72">
        <img
          src={heroImg}
          alt="Ahmedabad"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-brand-dark/40" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-white">
          <p className="text-xs tracking-[0.25em] text-brand-yellow font-bold">ABOUT US</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">
            We don't just sell land. We build trust.
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Ahmedabad's trusted real-estate partner.
          </h2>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            TC Real Estates was founded with a clear mission — to make property investment in
            Ahmedabad simple, transparent and rewarding. From residential plots in Zundal to
            commercial land in Vaishno Devi and premium opportunities in Motera, we
            hand-pick every listing.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Our team brings deep local market knowledge, verified legal documentation and a
            relentless focus on long-term value for investors, NRIs, builders and end-users.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { n: "500+", l: "Properties Listed" },
            { n: "1200+", l: "Happy Clients" },
            { n: "10+", l: "Years Experience" },
            { n: "100%", l: "Verified Deals" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-secondary/50 border border-border rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-extrabold text-primary">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-extrabold">Why choose TC Real Estates</h2>
          <div className="mx-auto mt-3 w-14 h-0.5 bg-primary" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                t: "Verified Properties",
                d: "Every listing comes with clear title and verified legal documentation.",
              },
              {
                icon: Target,
                t: "Local Expertise",
                d: "10+ years of on-ground knowledge of Ahmedabad's micro-markets.",
              },
              {
                icon: Handshake,
                t: "Transparent Deals",
                d: "No hidden charges. Straightforward pricing and process.",
              },
              {
                icon: TrendingUp,
                t: "High-ROI Focus",
                d: "We list only locations with strong appreciation potential.",
              },
              {
                icon: Users,
                t: "Investor Network",
                d: "Trusted by NRIs, builders, industrial buyers and end-users.",
              },
              {
                icon: Award,
                t: "End-to-End Support",
                d: "From site visit to registration, we handle everything.",
              },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-card border border-border rounded-xl p-6">
                <Icon className="w-9 h-9 text-primary" strokeWidth={1.4} />
                <h3 className="mt-3 font-bold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
