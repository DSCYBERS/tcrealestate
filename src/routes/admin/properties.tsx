import React, { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getProperties, upsertProperty, deleteProperty, markFeatured } from "@/lib/adminStorage";

export const Route = createFileRoute("/admin/properties")({
  component: AdminProperties,
});

function AdminProperties() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    const loggedIn = typeof window !== "undefined" && !!localStorage.getItem("tc_admin_logged_in");
    if (!loggedIn) {
      navigate({ to: "/admin" });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    getProperties().then(setList);
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    const f = e.target as HTMLFormElement;
    const fd = new FormData(f);
    const payload: any = {
      id: fd.get("id") || undefined,
      name: String(fd.get("name") || ""),
      location: String(fd.get("location") || ""),
      totalPrice: String(fd.get("totalPrice") || ""),
    };
    await upsertProperty(payload);
    const refreshed = await getProperties();
    setList(refreshed);
    setEditing(null);
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this property?")) return;
    await deleteProperty(id);
    setList(await getProperties());
  }

  async function toggleFeatured(id: string, v: boolean) {
    await markFeatured(id, v);
    setList(await getProperties());
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <Link to="/admin" className="text-sm text-primary hover:underline">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold mt-2">Property Management</h1>
        </div>
        <button onClick={() => setEditing({})} className="px-4 py-2 bg-primary text-white rounded">
          Add Property
        </button>
      </header>

      <div className="grid gap-4">
        {list.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div>
              <div className="font-bold">{p.name}</div>
              <div className="text-sm text-muted">
                {p.location} — {p.totalPrice}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!p.featured}
                  onChange={(e) => toggleFeatured(p.id, e.target.checked)}
                />
                <span className="text-sm">Featured</span>
              </label>
              <button onClick={() => setEditing(p)} className="px-3 py-1 border rounded">
                Edit
              </button>
              <button onClick={() => onDelete(p.id)} className="px-3 py-1 border rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <form onSubmit={onSave} className="mt-6 bg-white p-4 rounded shadow">
          <input name="id" type="hidden" defaultValue={editing.id || ""} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              name="name"
              defaultValue={editing.name || ""}
              placeholder="Name"
              className="border px-3 py-2 rounded"
            />
            <input
              name="location"
              defaultValue={editing.location || ""}
              placeholder="Location"
              className="border px-3 py-2 rounded"
            />
            <input
              name="totalPrice"
              defaultValue={editing.totalPrice || ""}
              placeholder="Total Price"
              className="border px-3 py-2 rounded"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
