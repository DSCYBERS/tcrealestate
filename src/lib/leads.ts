export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  requirement?: string;
  location?: string;
  source?: string;
  message?: string;
};

const KEY = "tc_leads_v1";

export function saveLead(lead: Omit<Lead, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const list = getLeads();
  const next: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  list.unshift(next);
  localStorage.setItem(KEY, JSON.stringify(list));
  return next;
}

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearLeads() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function exportLeadsCSV() {
  const leads = getLeads();
  const headers = ["ID", "Date", "Name", "Phone", "Requirement", "Location", "Source", "Message"];
  const rows = leads.map((l) => [
    l.id,
    new Date(l.createdAt).toLocaleString(),
    l.name,
    l.phone,
    l.requirement ?? "",
    l.location ?? "",
    l.source ?? "",
    (l.message ?? "").replace(/\n/g, " "),
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
