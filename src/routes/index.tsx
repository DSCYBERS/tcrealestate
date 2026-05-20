import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin, TrendingUp, ShieldCheck, CheckCircle2, Handshake, FileText, Headphones,
  Factory, Building2, Radio, Route as RouteIcon, Leaf, User, Phone, Mail, Lock,
  ArrowRight, MessageCircle, Quote, Facebook, Instagram, Youtube, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-ahmedabad.jpg";
import plotSanand from "@/assets/plot-sanand.jpg";
import plotChangodar from "@/assets/plot-changodar.jpg";
import plotBavla from "@/assets/plot-bavla.jpg";
import plotDholera from "@/assets/plot-dholera.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TC Real Estates — Premium Plots in Ahmedabad" },
      { name: "description", content: "Invest in verified, high-ROI residential and industrial plots across Ahmedabad — Sanand, Changodar, Bavla, Dholera and more." },
      { property: "og:title", content: "TC Real Estates — Premium Plots in Ahmedabad" },
      { property: "og:description", content: "Land. Homes. Investments. Trusted plot deals across Ahmedabad." },
    ],
  }),
});

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-brand-yellow text-brand-dark font-extrabold text-lg w-11 h-11 flex items-center justify-center rounded-sm">TC</div>
      <div className="leading-tight">
        <div className={`font-extrabold tracking-tight text-lg ${light ? "text-white" : "text-foreground"}`}>
          REAL <span className="text-primary">ESTATES</span>
        </div>
        <div className={`text-[10px] tracking-[0.18em] ${light ? "text-white/60" : "text-muted-foreground"}`}>
          LAND. HOMES. INVESTMENTS.
        </div>
      </div>
    </div>
  );
}

const plots = [
  { img: plotSanand, name: "PLOT IN SANAND", loc: "Sanand, Ahmedabad", size: "1200 Sq. Yd.", price: "18,000" },
  { img: plotChangodar, name: "PLOT NEAR CHANGODAR", loc: "Changodar, Ahmedabad", size: "1500 Sq. Yd.", price: "21,000" },
  { img: plotBavla, name: "PLOT IN BAVLA", loc: "Bavla, Ahmedabad", size: "1800 Sq. Yd.", price: "17,500" },
  { img: plotDholera, name: "PLOT NEAR DHOLERA", loc: "Dholera, Ahmedabad", size: "2000 Sq. Yd.", price: "19,500" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero with header */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Ahmedabad skyline" width={1600} height={1024} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />
        </div>

        <div className="relative">
          <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Logo />
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {["Home", "About Us", "Properties", "Investors", "Why Ahmedabad", "Contact Us"].map(l => (
                <a key={l} href="#" className="text-foreground/80 hover:text-primary">{l}</a>
              ))}
            </nav>
            <a href="#" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold hover:opacity-90">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </header>

          <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 grid lg:grid-cols-2 gap-10">
            <div>
              <span className="inline-block text-[11px] tracking-widest bg-secondary text-primary font-semibold px-3 py-1.5 rounded">
                LIMITED TIME OPPORTUNITY
              </span>
              <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                PREMIUM PLOTS<br />
                IN <span className="text-primary">AHMEDABAD</span>
              </h1>
              <p className="mt-4 text-lg font-semibold text-foreground/80">
                Best Location. High Appreciation. Great Investment.
              </p>
              <ul className="mt-6 space-y-2.5 text-[15px]">
                {["High return on investment", "Developing infrastructure", "Clear titles & secure properties", "Close to industries & prime locations"].map(t => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> {t}</li>
                ))}
              </ul>

              <div className="mt-8 flex gap-8">
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

            {/* Form Card */}
            <div className="lg:justify-self-end w-full max-w-md">
              <div className="bg-card border border-border rounded-xl shadow-2xl p-7">
                <h3 className="text-center text-2xl font-extrabold">
                  GET BEST DEALS<br /><span className="text-primary">BEFORE MARKET</span>
                </h3>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Fill the form and our experts will contact you shortly.
                </p>
                <form className="mt-5 space-y-3">
                  <FormField icon={User} placeholder="Your Name" />
                  <FormField icon={Phone} placeholder="Your Phone Number" />
                  <SelectField placeholder="Requirement" options={["Residential", "Commercial", "Industrial", "Agricultural"]} />
                  <SelectField placeholder="Preferred Location" options={["Sanand", "Changodar", "Bavla", "Dholera", "Narol"]} />
                  <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-md hover:opacity-90 tracking-wide">
                    GET BEST DEALS
                  </button>
                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" /> We respect your privacy
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
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
              <div className="text-sm">
                <div className="font-bold">{t}</div>
                <div>{b}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Invest */}
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

      {/* Featured plots */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-2xl font-extrabold tracking-wide mb-8">FEATURED PLOTS IN AHMEDABAD</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plots.map(p => (
              <article key={p.name} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={p.img} alt={p.name} width={800} height={576} loading="lazy" className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-[15px]">{p.name}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {p.loc}</p>
                  <p className="mt-2 text-sm">{p.size}</p>
                  <p className="mt-1 text-primary font-bold">₹ {p.price} / Sq. Yd.</p>
                  <button className="mt-4 w-full border border-border rounded-md py-2 text-xs font-bold tracking-wide hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                    ENQUIRE NOW
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-xs font-bold tracking-widest hover:opacity-90">
              VIEW MORE PLOTS <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Who is this for */}
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

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-sm tracking-[0.25em] font-bold mb-10">WHAT OUR CLIENTS SAY</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "TC Real Estates helped me find the perfect plot in Sanand. Transparent deals and excellent support!", n: "Rakesh Patel", r: "Investor" },
              { q: "Great opportunities and genuine guidance. Highly professional team!", n: "Hardik Shah", r: "Business Owner" },
              { q: "Very good knowledge of locations and future growth. Got the best deal!", n: "Vijay Parmar", r: "Industrial Buyer" },
            ].map(t => (
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
          <div className="flex justify-center gap-1.5 mt-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-border" />
            <span className="w-2 h-2 rounded-full bg-border" />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-primary text-primary-foreground rounded-lg px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold">DON'T MISS THE BEST OPPORTUNITIES!</div>
              <div className="text-sm opacity-90">Get in touch with our experts now.</div>
            </div>
          </div>
          <a href="#" className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-md text-xs font-bold tracking-widest hover:bg-white/90">
            <MessageCircle className="w-4 h-4" /> CHAT ON WHATSAPP
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white/80">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <Logo light />
            <p className="mt-4 text-xs text-white/60 leading-relaxed">
              Your trusted partner for property and land deals in Ahmedabad and surrounding areas.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, MessageCircle, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="QUICK LINKS" items={["Home", "About Us", "Properties", "Investors", "Blog", "Contact Us"]} />
          <FooterCol title="PROPERTY TYPES" items={["Residential Plots", "Commercial Plots", "Industrial Plots", "Agricultural Land", "Farmhouse Plots"]} />
          <FooterCol title="TOP LOCATIONS" items={["Sanand", "Bavla", "Changodar", "Dholera", "Narol", "View All"]} arrows />
          <div>
            <h4 className="text-white font-bold mb-4 text-xs tracking-widest">CONTACT US</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 93516 99808</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@tcrealestates.in</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Ahmedabad, Gujarat</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-xs text-white/50 gap-2">
            <div>© 2024 TC Real Estates. All Rights Reserved.</div>
            <div className="flex gap-6"><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FormField({ icon: Icon, placeholder }: { icon: any; placeholder: string }) {
  return (
    <div className="relative">
      <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input className="w-full border border-border rounded-md pl-10 pr-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder={placeholder} />
    </div>
  );
}

function SelectField({ placeholder, options }: { placeholder: string; options: string[] }) {
  return (
    <select defaultValue="" className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function FooterCol({ title, items, arrows }: { title: string; items: string[]; arrows?: boolean }) {
  return (
    <div>
      <h4 className="text-white font-bold mb-4 text-xs tracking-widest">{title}</h4>
      <ul className="space-y-2.5 text-xs">
        {items.map(i => (
          <li key={i}>
            <a href="#" className="hover:text-primary flex items-center gap-1">
              {i} {arrows && <ChevronRight className="w-3 h-3" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
