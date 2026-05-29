import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { Loader2, Lock, Mail } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin Login — TC Real Estates" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(100),
});

function AuthPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect when authenticated
  useEffect(() => {
    if (!auth.loading && auth.user) {
      navigate({ to: auth.isAdmin ? "/admin" : "/" });
    }
  }, [auth, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center mb-8">
          <span className="font-extrabold text-2xl">
            TC REAL <span className="text-primary">ESTATES</span>
          </span>
        </Link>
        <div className="bg-card border border-border rounded-xl shadow-2xl p-8">
          <h1 className="text-2xl font-extrabold text-center">
            {mode === "login" ? "Admin Login" : "Create Admin Account"}
          </h1>
          <p className="text-center text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to manage your website" : "First-time setup: create the admin@tcrealestate.in account"}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tcrealestate.in"
                className="w-full border border-border rounded-md pl-10 pr-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 chars)"
                className="w-full border border-border rounded-md pl-10 pr-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit" disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-md hover:opacity-90 disabled:opacity-50"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
          <button
            onClick={() => { setMode((m) => m === "login" ? "signup" : "login"); setError(null); }}
            className="mt-4 text-center text-sm text-muted-foreground hover:text-primary w-full"
          >
            {mode === "login" ? "First time? Create the admin account" : "Already have an account? Sign in"}
          </button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          Use <strong>admin@tcrealestate.in</strong> — the admin role is granted automatically to this email on signup.
        </p>
      </div>
    </div>
  );
}
