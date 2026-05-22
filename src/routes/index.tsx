import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin, TrendingUp, ShieldCheck, CheckCircle2, Handshake, FileText, Headphones,
  Factory, Building2, Radio, Route as RouteIcon, Leaf, User, Phone, ArrowRight, MessageCircle, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-ahmedabad.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";
import { properties, waLink } from "@/lib/properties";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TC Real Estates — Premium Plots in Ahmedabad" },
      { name: "description", content: "Invest in verified, high-ROI residential, commercial and industrial plots across Ahmedabad — Sanand, Changodar, Bavla, Dholera." },
      { property: "og:title", content: "TC Real Estates — Premium Plots in Ahmedabad" },
      { property: "og:description", content: "Land. Homes. Investments. Trusted plot deals across Ahmedabad." },
    ],
  }),
});

function Index() {
  const featured = properties.slice(0, 4);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Ahmedabad skyline" width={1600} height={1024} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />
        </div>
        <div className="relative">
          <SiteHeader transparent />
          <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 grid lg:grid-cols-2 gap-10">
            <div>
              <span className="inline-block text-[11px] tracking-widest bg-secondary text-primary font-semibold px-3 py-1.5 rounded">
                LIMITED TIME OPPORTUNITY
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                PREMIUM PLOTS<br />IN <span className="text-primary">AHMEDABAD</span>
              </h1>
              <p className="mt-4 text-lg font-semibold text-foreground/80">
                Best Location. High Appreciation. Great Investment.
              </p>
              <ul className="mt-6 space-y-2.5 text-[15px]">
                {["High return on investment", "Developing infrastructure", "Clear titles & secure properties", "Close to industries & prime locations"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> {t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/properties" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md text-sm font-bold tracking-wide hover:opacity-90">
                  ENQUIRE NOW <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-3 rounded-md text-sm font-bold tracking-wide hover:opacity-90">
                  <MessageCircle className="w-4 h-4" /> CONTACT EXPERT
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  { icon: MapPin, t: "Prime", b: "Locations" },
                  { icon: TrendingUp, t: "High ROI", b: "Potential" },
                  { icon: ShieldCheck, t: "Clear Title", b: "& Legal" },
                ].map(({ icon: Icon, t, b }) => (
                  <div key={t} className="text-center">
                    <Icon className="w-7 h-7 mx-auto text-primary" />
                    <div className="mt-2 text-sm font-semibold">{t}</div>
                    <div className="text-sm font-semibold">{b}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:justify-self-end w-full max-w-md"><LeadForm /></div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, t: "100%", b: "Verified Properties" },
            { icon: Handshake, t: "Transparent", b: "Deals" },
            { icon: FileText, t: "Clear Titles", b: "& Documentation" },
            { icon: Headphones, t: "Expert Guidance", b: "from Local Experts" },
          ].map(({ icon: Icon, t, b }) => (
            <div key={b} className="flex items-center gap-3 justify-center">
              <Icon className="w-9 h-9 text-primary" strokeWidth={1.4} />
              <div className="text-sm"><div className="font-bold">{t}</div><div>{b}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.25em] text-muted-foreground font-semibold">WHY INVEST IN AHMEDABAD?</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">A City. Unlimited Opportunities.</h2>
          <div className="mx-auto mt-3 w-14 h-0.5 bg-primary" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { icon: Factory, t: "Rapid Infrastructure", b: "Development" },
              { icon: Building2, t: "Industrial & IT", b: "Growth Hub" },
              { icon: Radio, t: "High Rental", b: "Demand" },
              { icon: RouteIcon, t: "Prime Connectivity", b: "& Road Network" },
              { icon: Leaf, t: "Safe & Secure", b: "Investments" },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="flex flex-col items-center">
                <Icon className="w-12 h-12 text-primary" strokeWidth={1.3} />
                <div className="mt-3 text-sm font-semibold">{t}</div>
                <div className="text-sm font-semibold">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-2xl font-extrabold tracking-wide mb-8">FEATURED PLOTS IN AHMEDABAD</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <article key={p.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition group">
                <Link to="/properties/$id" params={{ id: p.id }} className="block overflow-hidden">
                  <img src={p.image} alt={p.name} width={800} height={576} loading="lazy" className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="p-4">
                  <div className="text-[10px] tracking-widest text-primary font-bold">{p.type.toUpperCase()}</div>
                  <h3 className="font-bold text-[15px] mt-1">{p.name}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {p.location}</p>
                  <p className="mt-2 text-sm">{p.size}</p>
                  <p className="mt-1 text-primary font-bold">₹ {p.pricePerSqYd} / Sq. Yd.</p>
                  <Link to="/properties/$id" params={{ id: p.id }} className="mt-4 block text-center border border-border rounded-md py-2 text-xs font-bold tracking-wide hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                    ENQUIRE NOW
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/properties" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-xs font-bold tracking-widest hover:opacity-90">
              VIEW ALL PROPERTIES <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm tracking-[0.25em] font-bold mb-8">WHO IS THIS FOR?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: MapPin, l: "Investors" },
              { icon: User, l: "NRIs" },
              { icon: Building2, l: "Builders & Developers" },
              { icon: Factory, l: "Industrial Buyers" },
              { icon: User, l: "End Users" },
            ].map(({ icon: Icon, l }) => (
              <div key={l} className="flex flex-col items-center">
                <Icon className="w-10 h-10 text-primary" strokeWidth={1.3} />
                <div className="mt-2 text-sm font-semibold">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-sm tracking-[0.25em] font-bold mb-10">WHAT OUR CLIENTS SAY</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "TC Real Estates helped me find the perfect plot in Sanand. Transparent deals and excellent support!", n: "Rakesh Patel", r: "Investor" },
              { q: "Great opportunities and genuine guidance. Highly professional team!", n: "Hardik Shah", r: "Business Owner" },
              { q: "Very good knowledge of locations and future growth. Got the best deal!", n: "Vijay Parmar", r: "Industrial Buyer" },
            ].map((t) => (
              <div key={t.n} className="bg-card border border-border rounded-lg p-6">
                <Quote className="w-6 h-6 text-primary" />
                <p className="mt-3 text-sm text-foreground/80 min-h-[60px]">{t.q}</p>
                <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-primary text-primary-foreground rounded-lg px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold">DON'T MISS THE BEST OPPORTUNITIES!</div>
              <div className="text-sm opacity-90">Get in touch with our experts now.</div>
            </div>
          </div>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-md text-xs font-bold tracking-widest hover:bg-white/90">
            <MessageCircle className="w-4 h-4" /> CHAT ON WHATSAPP
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
