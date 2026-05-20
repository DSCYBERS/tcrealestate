import plotSanand from "@/assets/plot-sanand.jpg";
import plotChangodar from "@/assets/plot-changodar.jpg";
import plotBavla from "@/assets/plot-bavla.jpg";
import plotDholera from "@/assets/plot-dholera.jpg";

export type PropertyType =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Farmhouse"
  | "Apartment";

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
    id: "plot-sanand",
    name: "Premium Plot in Sanand",
    type: "Residential",
    location: "Sanand, Ahmedabad",
    size: "1200 Sq. Yd.",
    pricePerSqYd: "18,000",
    totalPrice: "2.16 Cr",
    image: plotSanand,
    highlights: ["Clear title", "Near Tata Nano plant", "Wide road frontage", "Gated layout"],
    description:
      "Strategically located residential plot in fast-growing Sanand corridor with excellent appreciation potential and proximity to major industries.",
  },
  {
    id: "plot-changodar",
    name: "Industrial Plot near Changodar",
    type: "Industrial",
    location: "Changodar, Ahmedabad",
    size: "1500 Sq. Yd.",
    pricePerSqYd: "21,000",
    totalPrice: "3.15 Cr",
    image: plotChangodar,
    highlights: ["NA & Title clear", "On SP Ring Road", "Industrial zone", "Power & water ready"],
    description:
      "High-utility industrial plot near SP Ring Road, ideal for warehousing, manufacturing or logistics operations.",
  },
  {
    id: "plot-bavla",
    name: "Residential Plot in Bavla",
    type: "Residential",
    location: "Bavla, Ahmedabad",
    size: "1800 Sq. Yd.",
    pricePerSqYd: "17,500",
    totalPrice: "3.15 Cr",
    image: plotBavla,
    highlights: ["Highway touch", "Approved layout", "Low entry, high ROI", "Vastu compliant"],
    description:
      "Spacious residential plot in emerging Bavla market — perfect for end-users and long-term investors.",
  },
  {
    id: "plot-dholera",
    name: "Investor Plot near Dholera SIR",
    type: "Commercial",
    location: "Dholera, Ahmedabad",
    size: "2000 Sq. Yd.",
    pricePerSqYd: "19,500",
    totalPrice: "3.90 Cr",
    image: plotDholera,
    highlights: ["Inside DSIR influence zone", "Smart City corridor", "Expressway connectivity", "High future appreciation"],
    description:
      "Once-in-a-decade opportunity inside India's first greenfield smart city corridor — Dholera SIR.",
  },
  {
    id: "farmhouse-sanand",
    name: "Farmhouse Land — Sanand Outskirts",
    type: "Farmhouse",
    location: "Sanand Outskirts, Ahmedabad",
    size: "5000 Sq. Yd.",
    pricePerSqYd: "9,500",
    totalPrice: "4.75 Cr",
    image: plotSanand,
    highlights: ["Green belt", "Borewell water", "Tar road access", "Peaceful environment"],
    description:
      "Lush farmhouse plot on the outskirts of Sanand with rich soil and full development potential.",
  },
  {
    id: "apartment-sg-highway",
    name: "Luxury 3BHK Apartment",
    type: "Apartment",
    location: "SG Highway, Ahmedabad",
    size: "1850 Sq. Ft.",
    pricePerSqYd: "—",
    totalPrice: "1.85 Cr",
    image: plotChangodar,
    highlights: ["RERA approved", "Club house & pool", "24x7 security", "Premium fittings"],
    description:
      "Spacious 3BHK in a premium gated tower on SG Highway with world-class amenities.",
  },
];

export const WHATSAPP_NUMBER = "919351699808";
export const PHONE_NUMBER = "+91 93516 99808";
export const waLink = (msg = "Hi, I'm interested in TC Real Estates properties.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
