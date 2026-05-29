import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth, signOut } from "@/lib/use-auth";
import {
  LayoutDashboard,
  Home as HomeIcon,
  Building2,
  Users,
  MapPin,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Loader2,
  Menu,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [{ title: "Admin — TC Real Estates" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

const nav: { to: string; label: string; icon: any; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/properties", label: "Properties", icon: Building2 },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/locations", label: "Locations", icon: MapPin },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/homepage", label: "Homepage & SEO", icon: Settings },
];

function AdminLayout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      if (!auth.user) navigate({ to: "/auth" });
      else if (!auth.isAdmin) navigate({ to: "/" });
    }
  }, [auth, navigate]);

  if (auth.loading || !auth.user || !auth.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky inset-y-0 left-0 z-40 w-64 bg-brand-dark text-white flex flex-col transition-transform top-0 h-screen`}
      >
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-brand-yellow text-brand-dark font-extrabold text-lg w-10 h-10 flex items-center justify-center rounded-sm">
              TC
            </div>
            <div>
              <div className="font-extrabold tracking-tight">REAL ESTATES</div>
              <div className="text-[10px] text-white/60 tracking-widest">ADMIN PANEL</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = item.exact ? loc.pathname === item.to : loc.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to as any}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${active ? "bg-primary text-primary-foreground font-semibold" : "text-white/80 hover:bg-white/10"}`}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/10"
          >
            <HomeIcon className="w-4 h-4" /> View site
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
          <div className="text-[10px] text-white/40 px-3 pt-2 truncate">{auth.user.email}</div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <main className="flex-1 min-w-0">
        <div className="lg:hidden sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md border border-border"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold">Admin Panel</span>
          <div className="w-9" />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
