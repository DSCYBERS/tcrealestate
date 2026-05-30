import { useState } from "react";
import { User, Phone, Lock, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/properties";
import { saveLead } from "@/lib/leads";
import { saveLeadToSupabase } from "@/lib/supabaseApi";

export function LeadForm({
  title = "GET BEST DEALS",
  subtitle = "BEFORE MARKET",
  defaultPropertyId,
  defaultPropertyName,
}: {
  title?: string;
  subtitle?: string;
  defaultPropertyId?: string;
  defaultPropertyName?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [req, setReq] = useState("");
  const [loc, setLoc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Validate phone number (should be 10 digits for Indian numbers)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      alert("Please enter a valid phone number (at least 10 digits)");
      return;
    }
    
    setIsSubmitting(true);
    
    const leadData = {
      name: name.trim(),
      phone: phone.trim(),
      requirement: req,
      location: loc,
      source:
        defaultPropertyId || (typeof window !== "undefined" ? window.location.pathname : "site"),
    };
    
    // Save lead locally
    saveLead(leadData);
    
    // Try to save to supabase when configured
    try {
      saveLeadToSupabase(leadData).catch(() => {
        // Error saving to storage is non-critical
      });
    } catch {
      // Error is handled
    }
    
    // Build WhatsApp message with all details
    let msg = `Hi, I'm interested in TC Real Estates.\n\n`;
    if (defaultPropertyName) {
      msg += `📍 *Property:* ${defaultPropertyName}`;
      if (defaultPropertyId) msg += ` (ID: ${defaultPropertyId})`;
      msg += `\n\n`;
    }
    msg += `*Your Details:*\n`;
    msg += `• *Name:* ${name.trim()}\n`;
    msg += `• *Phone:* ${phone.trim()}\n`;
    if (req) msg += `• *Requirement:* ${req}\n`;
    if (loc) msg += `• *Preferred Location:* ${loc}\n`;
    msg += `\nPlease share details about this property and available options.`;
    
    // Open WhatsApp with the complete message
    window.open(waLink(msg), "_blank");
    
    // Reset form after submission
    setTimeout(() => {
      setName("");
      setPhone("");
      setReq("");
      setLoc("");
      setIsSubmitting(false);
    }, 500);
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
        <Field
          icon={Phone}
          placeholder="Your Phone Number"
          value={phone}
          onChange={setPhone}
          type="tel"
          required
        />
        <Select
          placeholder="Requirement"
          value={req}
          onChange={setReq}
          options={["Residential", "Commercial", "Industrial", "Farmhouse", "Apartment"]}
        />
        <Select
          placeholder="Preferred Location"
          value={loc}
          onChange={setLoc}
          options={["Zundal", "Vaishno Devi", "Chandkheda", "Jagatpur", "Motera"]}
        />
        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !phone.trim()}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-md hover:opacity-90 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <MessageCircle className="w-4 h-4" /> {isSubmitting ? "CONNECTING..." : "GET BEST DEALS"}
        </button>
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" /> 100% private — we never spam
        </p>
      </form>
    </div>
  );
}

function Field({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
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
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border border-border rounded-md px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 ${value ? "text-foreground" : "text-muted-foreground"}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
