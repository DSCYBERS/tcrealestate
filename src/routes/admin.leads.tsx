import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Phone, MessageCircle, Download, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "@/lib/properties";

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeadsPage,
  head: () => ({ meta: [{ title: "Leads — Admin" }, { name: "robots", content: "noindex" }] }),
});

type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  requirement: string | null;
  location: string | null;
  source: string | null;
  message: string | null;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  notes: string | null;
};

const STATUSES: LeadRow["status"][] = ["new", "contacted", "qualified", "won", "lost"];

const statusColor: Record<LeadRow["status"], string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-gray-200 text-gray-700",
};

function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | LeadRow["status"]>("all");
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load leads");
    setLeads((data as LeadRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: LeadRow["status"]) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error("Update failed");
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    setLeads((ls) => ls.filter((l) => l.id !== id));
    toast.success("Lead deleted");
  };

  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (q) {
      const s = q.toLowerCase();
      return l.name.toLowerCase().includes(s) || l.phone.includes(s) || (l.location || "").toLowerCase().includes(s);
    }
    return true;
  });

  const exportCSV = () => {
    const headers = ["Date", "Name", "Phone", "Email", "Requirement", "Location", "Source", "Status", "Notes"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toLocaleString(), l.name, l.phone, l.email || "",
      l.requirement || "", l.location || "", l.source || "", l.status, (l.notes || "").replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tc-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">Leads</h1>
          <p className="text-sm text-muted-foreground">{leads.length} total · {leads.filter((l) => l.status === "new").length} new</p>
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, location"
            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md bg-background"
          />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="px-3 py-2 text-sm border border-border rounded-md bg-background">
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-lg">No leads yet.</div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Lead</th>
                <th className="px-4 py-3 font-semibold">Requirement</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.phone}</div>
                    <div className="text-[11px] text-muted-foreground">{new Date(l.created_at).toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{l.requirement || "—"}</div>
                    <div className="text-xs text-muted-foreground">{l.location || ""}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[180px] truncate">{l.source || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      onChange={(e) => updateStatus(l.id, e.target.value as LeadRow["status"])}
                      className={`text-xs font-semibold px-2 py-1 rounded ${statusColor[l.status]} border-0 cursor-pointer`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <a href={`tel:${l.phone}`} title="Call" className="p-2 rounded hover:bg-muted text-primary"><Phone className="w-4 h-4" /></a>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi ${l.name}, regarding your enquiry at TC Real Estates...`)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="p-2 rounded hover:bg-muted text-emerald-600"><MessageCircle className="w-4 h-4" /></a>
                      <button onClick={() => remove(l.id)} title="Delete" className="p-2 rounded hover:bg-muted text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
