import plotSanand from "@/assets/plot-sanand.jpg";
import plotChangodar from "@/assets/plot-changodar.jpg";
import plotBavla from "@/assets/plot-bavla.jpg";
import plotDholera from "@/assets/plot-dholera.jpg";

export type PropertyType = "Residential" | "Commercial" | "Industrial" | "Farmhouse" | "Apartment";

export type Property = {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  size: string;
  pricePerSqYd: string;
  totalPrice: string;
  image: string;
  highlights: string[];
  description: string;
};

export const properties: Property[] = [
  {
    id: "plot-zundal",
    name: "Premium Plot in Zundal",
    type: "Residential",
    location: "Zundal, Ahmedabad",
    size: "1200 Sq. Yd.",
    pricePerSqYd: "18,000",
    totalPrice: "2.16 Cr",
    image: plotSanand,
    highlights: ["Clear title", "Modern layout", "Wide road frontage", "Gated community"],
    description:
      "Strategically located residential plot in fast-growing Zundal with excellent appreciation potential and proximity to major hubs.",
  },
  {
    id: "plot-vaishno-devi",
    name: "Commercial Plot near Vaishno Devi",
    type: "Commercial",
    location: "Vaishno Devi, Ahmedabad",
    size: "1500 Sq. Yd.",
    pricePerSqYd: "21,000",
    totalPrice: "3.15 Cr",
    image: plotChangodar,
    highlights: ["Title clear", "On main road", "Commercial zone", "Power & water ready"],
    description:
      "High-utility commercial plot in prime Vaishno Devi, ideal for retail, warehousing or business operations.",
  },
  {
    id: "plot-chandkheda",
    name: "Residential Plot in Chandkheda",
    type: "Residential",
    location: "Chandkheda, Ahmedabad",
    size: "1800 Sq. Yd.",
    pricePerSqYd: "17,500",
    totalPrice: "3.15 Cr",
    image: plotBavla,
    highlights: ["Good connectivity", "Approved layout", "Affordable entry", "Vastu compliant"],
    description:
      "Spacious residential plot in emerging Chandkheda market — perfect for end-users and long-term investors.",
  },
  {
    id: "plot-jagatpur",
    name: "Investment Plot near Jagatpur",
    type: "Commercial",
    location: "Jagatpur, Ahmedabad",
    size: "2000 Sq. Yd.",
    pricePerSqYd: "19,500",
    totalPrice: "3.90 Cr",
    image: plotDholera,
    highlights: [
      "Strategic location",
      "Commercial corridor",
      "Excellent connectivity",
      "High appreciation potential",
    ],
    description:
      "Prime investment opportunity in Jagatpur with excellent growth prospects and strong market fundamentals.",
  },
  {
    id: "residential-motera",
    name: "Premium Residential Plot — Motera",
    type: "Residential",
    location: "Motera, Ahmedabad",
    size: "5000 Sq. Yd.",
    pricePerSqYd: "9,500",
    totalPrice: "4.75 Cr",
    image: plotSanand,
    highlights: ["Premium location", "Best connectivity", "Tar road access", "Peaceful environment"],
    description:
      "Premium residential plot in the heart of Motera with excellent connectivity and modern amenities.",
  },
  {
    id: "commercial-motera",
    name: "Commercial Complex at Motera",
    type: "Commercial",
    location: "Motera, Ahmedabad",
    size: "1850 Sq. Ft.",
    pricePerSqYd: "—",
    totalPrice: "1.85 Cr",
    image: plotChangodar,
    highlights: ["RERA approved", "Commercial zone", "24x7 access", "Premium location"],
    description: "Commercial plot in prime Motera location with world-class infrastructure and high ROI potential.",
  },
];

export const WHATSAPP_NUMBER = "919313787896";
export const PHONE_NUMBER = "+91 93137 87896";
export const waLink = (msg = "Hi, I'm interested in TC Real Estates properties.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
