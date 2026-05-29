import { Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { PHONE_NUMBER, waLink } from "@/lib/properties";

function FooterCol({ title, items }: { title: string; items: { label: string; to?: string }[] }) {
  return (
    <div>
      <h4 className="text-white font-bold mb-4 text-xs tracking-widest">{title}</h4>
      <ul className="space-y-2.5 text-xs">
        {items.map((i) => (
          <li key={i.label}>
            {i.to ? (
              <Link to={i.to} className="hover:text-primary flex items-center gap-1">
                {i.label} <ChevronRight className="w-3 h-3 opacity-50" />
              </Link>
            ) : (
              <span className="text-white/70">{i.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-yellow text-brand-dark font-extrabold text-lg w-11 h-11 flex items-center justify-center rounded-sm">
              TC
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg text-white">
                REAL <span className="text-primary">ESTATES</span>
              </div>
              <div className="text-[10px] tracking-[0.18em] text-white/60">
                LAND. HOMES. INVESTMENTS.
              </div>
            </div>
          </Link>
          <p className="mt-4 text-xs text-white/60 leading-relaxed">
            Your trusted partner for verified property and land deals in Ahmedabad and surrounding
            areas.
          </p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Instagram, MessageCircle, Youtube].map((Icon, i) => (
              <a
                key={i}
                href={Icon === MessageCircle ? waLink() : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary"
                aria-label="social"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol
          title="QUICK LINKS"
          items={[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/about" },
            { label: "Properties", to: "/properties" },
            { label: "Investors", to: "/investors" },
            { label: "Contact", to: "/contact" },
          ]}
        />
        <FooterCol
          title="PROPERTY TYPES"
          items={[
            { label: "Residential Plots", to: "/properties" },
            { label: "Commercial Plots", to: "/properties" },
            { label: "Industrial Plots", to: "/properties" },
            { label: "Farmhouse Land", to: "/properties" },
            { label: "Apartments", to: "/properties" },
          ]}
        />
        <FooterCol
          title="TOP LOCATIONS"
          items={[
            { label: "Sanand", to: "/properties" },
            { label: "Bavla", to: "/properties" },
            { label: "Changodar", to: "/properties" },
            { label: "Dholera", to: "/properties" },
            { label: "Narol", to: "/properties" },
          ]}
        />
        <div>
          <h4 className="text-white font-bold mb-4 text-xs tracking-widest">CONTACT US</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>{PHONE_NUMBER}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>info@tcrealestates.in</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Ahmedabad, Gujarat</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-xs text-white/50 gap-2">
          <div>© {new Date().getFullYear()} TC Real Estates. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
