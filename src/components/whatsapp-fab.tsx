import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/properties";

export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 bg-[#25D366] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <MessageCircle className="w-7 h-7 relative" />
    </a>
  );
}
