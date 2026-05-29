import { Link, useLocation } from "@tanstack/react-router";
import { MessageCircle, Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { waLink } from "@/lib/properties";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="bg-brand-yellow text-brand-dark font-extrabold text-lg w-11 h-11 flex items-center justify-center rounded-sm shrink-0">
        TC
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight text-lg ${light ? "text-white" : "text-foreground"}`}>
          REAL <span className="text-primary">ESTATES</span>
        </span>
        <span className={`mt-1 text-[9px] tracking-[0.18em] ${light ? "text-white/60" : "text-muted-foreground"}`}>
          LAND. HOMES. INVESTMENTS.
        </span>
      </div>
    </Link>
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/properties", label: "Properties" },
  { to: "/investors", label: "Investors" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-30"
          : "sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border"
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {nav.map((l) => {
            const active = loc.pathname === l.to || (l.to !== "/" && loc.pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="p-2 rounded-md border border-border hover:bg-secondary transition-colors"
            title="Admin Panel"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold hover:opacity-90"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md border border-border"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            {nav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="text-sm font-medium py-2 text-primary"
            >
              Admin Panel
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
