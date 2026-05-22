import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Download, Trash2, RefreshCw } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLeads, exportLeadsCSV, clearLeads, type Lead } from "@/lib/leads";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsAdmin,
  head: () => ({
    meta: [
      { title: "Leads — Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const refresh = () => setLeads(getLeads());
  useEffect(() => { refresh(); }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold">Leads ({leads.length})</h1>
            <p className="text-sm text-muted-foreground mt-1">All enquiries captured from the website forms.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={refresh} className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-md text-sm font-semibold">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={exportLeadsCSV} disabled={leads.length === 0} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-bold disabled:opacity-50">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={() => { if (confirm("Delete all leads from this device?")) { clearLeads(); refresh(); } }}
              className="inline-flex items-center gap-2 border border-destructive text-destructive px-4 py-2 rounded-md text-sm font-semibold"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="text-center text-muted-foreground py-16 border border-dashed border-border rounded-lg">
            No leads yet. Enquiries submitted on the site will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left">
                <tr>
                  <th className="px-3 py-2 font-semibold">Date</th>
                  <th className="px-3 py-2 font-semibold">Name</th>
                  <th className="px-3 py-2 font-semibold">Phone</th>
                  <th className="px-3 py-2 font-semibold">Requirement</th>
                  <th className="px-3 py-2 font-semibold">Location</th>
                  <th className="px-3 py-2 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-2 font-medium">{l.name}</td>
                    <td className="px-3 py-2"><a href={`tel:${l.phone}`} className="text-primary">{l.phone}</a></td>
                    <td className="px-3 py-2">{l.requirement || "—"}</td>
                    <td className="px-3 py-2">{l.location || "—"}</td>
                    <td className="px-3 py-2 text-xs">{l.source || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          Leads are stored locally in this browser. For server-side storage with email/WhatsApp notifications, enable Lovable Cloud.
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
