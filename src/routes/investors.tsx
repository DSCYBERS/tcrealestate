import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Globe2, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";

export const Route = createFileRoute("/investors")({
  component: InvestorsPage,
  head: () => ({
    meta: [
      { title: "For Investors — TC Real Estates" },
      {
        name: "description",
        content:
          "High-ROI land and plot investment opportunities in Ahmedabad for investors, NRIs and builders.",
      },
      { property: "og:title", content: "For Investors — TC Real Estates" },
      {
        property: "og:description",
        content: "Early-stage, high-appreciation plot opportunities curated for investors.",
      },
    ],
  }),
});

function InvestorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] text-brand-yellow font-bold">
              FOR INVESTORS & NRIs
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">
              Get Before-Market <span className="text-primary">Deals</span>
            </h1>
            <p className="mt-4 text-white/80 max-w-xl">
              Access early-stage plot opportunities in Ahmedabad's fastest-appreciating corridors —
              Zundal, Vaishno Devi, Chandkheda and Jagatpur. Hand-picked, verified and ready for serious
              investors.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-bold"
              >
                Browse opportunities <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-3 rounded-md text-sm font-bold hover:bg-white/20"
              >
                Talk to an expert
              </Link>
            </div>
          </div>
          <div className="lg:justify-self-end w-full max-w-md">
            <LeadForm title="JOIN OUR" subtitle="INVESTOR LIST" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl font-extrabold">Why investors choose us</h2>
        <div className="mx-auto mt-3 w-14 h-0.5 bg-primary" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: TrendingUp,
              t: "High-ROI Plots",
              d: "Locations with proven 2-3x appreciation history.",
            },
            {
              icon: Globe2,
              t: "NRI Friendly",
              d: "End-to-end remote handling — site videos, docs, registration.",
            },
            {
              icon: Building2,
              t: "Builder Network",
              d: "Bulk deals, JV plots and pre-launch inventory access.",
            },
            {
              icon: ShieldCheck,
              t: "Verified & Legal",
              d: "Title-clear, NA-approved plots only. No surprises.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-card border border-border rounded-xl p-6">
              <Icon className="w-9 h-9 text-primary" strokeWidth={1.4} />
              <h3 className="mt-3 font-bold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold">Our investor process</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Share requirement", d: "Budget, location & investment horizon." },
              { n: "02", t: "Curated shortlist", d: "We send hand-picked verified plots." },
              { n: "03", t: "Site visit / video", d: "Walkthrough on-site or via video for NRIs." },
              {
                n: "04",
                t: "Deal & registration",
                d: "End-to-end paperwork & registration support.",
              },
            ].map((s) => (
              <div key={s.n} className="bg-card border border-border rounded-xl p-6 text-left">
                <div className="text-primary text-2xl font-extrabold">{s.n}</div>
                <div className="mt-2 font-bold">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
