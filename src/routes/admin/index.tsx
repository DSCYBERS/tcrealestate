import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    () => typeof window !== "undefined" && !!localStorage.getItem("tc_admin_logged_in"),
  );

  if (!loggedIn) {
    return <Login onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link to="/admin/properties" className="px-4 py-2 bg-primary text-white rounded hover:opacity-90">
            Properties
          </Link>
          <Link to="/admin/leads" className="px-4 py-2 border rounded hover:bg-gray-50">
            Leads
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("tc_admin_logged_in");
              setLoggedIn(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Quick stats</div>
        <div className="bg-white p-4 rounded shadow">Recent leads</div>
        <div className="bg-white p-4 rounded shadow">Content actions</div>
      </section>
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Admin credentials
    if (email === "admin@tcrealestate.in" && password === "7069tc06") {
      localStorage.setItem("tc_admin_logged_in", "1");
      onSuccess();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Admin Login</h2>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Email: admin@tcrealestate.in<br/>Password: 7069tc06
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-foreground">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="admin@tcrealestate.in"
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 text-sm bg-white text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-foreground">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="7069tc06"
            className="w-full border-2 border-gray-300 rounded-md px-4 py-3 text-sm bg-white text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
