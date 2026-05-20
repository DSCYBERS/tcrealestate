import { useState } from "react";
import { User, Phone, Lock, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/properties";

export function LeadForm({
  title = "GET BEST DEALS",
  subtitle = "BEFORE MARKET",
  defaultPropertyId,
}: { title?: string; subtitle?: string; defaultPropertyId?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [req, setReq] = useState("");
  const [loc, setLoc] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'm interested in TC Real Estates.${defaultPropertyId ? `\nProperty: ${defaultPropertyId}` : ""}\nName: ${name}\nPhone: ${phone}\nRequirement: ${req}\nLocation: ${loc}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-2xl p-7">
      <h3 className="text-center text-2xl font-extrabold">
        {title}
        <br />
        <span className="text-primary">{subtitle}</span>
      </h3>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Fill the form — our expert will reach you within minutes.
      </p>
      <form className="mt-5 space-y-3" onSubmit={onSubmit}>
        <Field icon={User} placeholder="Your Name" value={name} onChange={setName} required />
        <Field icon={Phone} placeholder="Your Phone Number" value={phone} onChange={setPhone} type="tel" required />
        <Select placeholder="Requirement" value={req} onChange={setReq} options={["Residential", "Commercial", "Industrial", "Farmhouse", "Apartment"]} />
        <Select placeholder="Preferred Location" value={loc} onChange={setLoc} options={["Sanand", "Changodar", "Bavla", "Dholera", "Narol", "SG Highway"]} />
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-md hover:opacity-90 tracking-wide"
        >
          <MessageCircle className="w-4 h-4" /> GET BEST DEALS
        </button>
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" /> 100% private — we never spam
        </p>
      </form>
    </div>
  );
}

function Field({
  icon: Icon, placeholder, value, onChange, type = "text", required,
}: { icon: any; placeholder: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div className="relative">
      <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border rounded-md pl-10 pr-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
        placeholder={placeholder}
      />
    </div>
  );
}

function Select({
  placeholder, options, value, onChange,
}: { placeholder: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border border-border rounded-md px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 ${value ? "text-foreground" : "text-muted-foreground"}`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}
