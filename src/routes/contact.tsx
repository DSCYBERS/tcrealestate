import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";
import { PHONE_NUMBER, waLink } from "@/lib/properties";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — TC Real Estates" },
      {
        name: "description",
        content:
          "Get in touch with TC Real Estates — verified property deals in Ahmedabad. Call, WhatsApp or enquire online.",
      },
      { property: "og:title", content: "Contact Us — TC Real Estates" },
      { property: "og:description", content: "Reach our property experts in Ahmedabad." },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-secondary/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-xs tracking-[0.25em] text-primary font-bold">GET IN TOUCH</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Talk to a property expert</h1>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Our team responds within minutes. Reach us via WhatsApp, call or the form below.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <ContactCard
            icon={Phone}
            title="Call us"
            lines={[PHONE_NUMBER]}
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            action="Call now"
          />
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            lines={["Chat with our team"]}
            href={waLink()}
            action="Open chat"
            external
          />
          <ContactCard
            icon={Mail}
            title="Email"
            lines={["info@tcrealestates.in"]}
            href="mailto:info@tcrealestates.in"
            action="Send email"
          />
          <ContactCard icon={MapPin} title="Office" lines={["Ahmedabad, Gujarat, India"]} />
          <ContactCard
            icon={Clock}
            title="Working hours"
            lines={["Mon - Sat: 9:00 AM - 8:00 PM"]}
          />
        </div>
        <div>
          <LeadForm title="REQUEST A" subtitle="CALLBACK" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
  action,
  external,
}: {
  icon: any;
  title: string;
  lines: string[];
  href?: string;
  action?: string;
  external?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="font-bold">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-muted-foreground">
            {l}
          </div>
        ))}
        {href && action && (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
          >
            {action} →
          </a>
        )}
      </div>
    </div>
  );
}
