import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({ 
  component: AdminIndex,
});

function AdminIndex() {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => typeof window !== 'undefined' && !!localStorage.getItem('tc_admin_logged_in'));

  if (!loggedIn) {
    return <Login onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <Link to="/admin/properties" className="mr-3 px-4 py-2 bg-primary text-white rounded">Properties</Link>
          <Link to="/admin/leads" className="px-4 py-2 border rounded">Leads</Link>
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
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // simple local dev auth (change later for real auth)
    if (password === 'adminpass') {
      localStorage.setItem('tc_admin_logged_in', '1');
      onSuccess();
    } else {
      alert('Invalid password (use adminpass for local dev)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Admin Login</h2>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded mb-3" />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">Sign in</button>
      </form>
    </div>
  );
}
