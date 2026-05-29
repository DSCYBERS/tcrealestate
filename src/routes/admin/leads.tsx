import React, { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getLeads } from "@/lib/adminStorage";

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeads,
});

function AdminLeads() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

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
    getLeads().then(setList);
  }, []);

  const filtered = list.filter(
    (l) =>
      filter === "" ||
      filter === "All" ||
      (filter === "New" && l.status === "New") ||
      (filter === "Contacted" && l.status === "Contacted") ||
      (filter === "Interested" && l.status === "Interested") ||
      (filter === "Closed" && l.status === "Closed"),
  );

  function downloadCSV() {
    const headers = ["Date", "Name", "Phone", "Requirement", "Location", "Status", "Source"];
    const rows = list.map((l) => [
      new Date(l.createdAt).toLocaleString(),
      l.name,
      l.phone,
      l.requirement ?? "",
      l.location ?? "",
      l.status || "New",
      l.source ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tc-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <Link to="/admin" className="text-sm text-primary hover:underline">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold mt-2">Lead Management</h1>
        </div>
        <button onClick={downloadCSV} className="px-4 py-2 bg-primary text-white rounded">
          Download CSV
        </button>
      </header>

      <div className="mb-4 flex gap-2">
        {["All", "New", "Contacted", "Interested", "Closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded text-sm ${
              filter === status ? "bg-primary text-white" : "border border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Requirement</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Location</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{new Date(lead.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm">{lead.name}</td>
                <td className="px-4 py-2 text-sm">{lead.phone}</td>
                <td className="px-4 py-2 text-sm">{lead.requirement}</td>
                <td className="px-4 py-2 text-sm">{lead.location}</td>
                <td className="px-4 py-2 text-sm">
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                    {lead.status || "New"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-4 py-6 text-center text-gray-500">No leads found.</div>
        )}
      </div>
    </div>
  );
}
