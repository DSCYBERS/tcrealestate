import plotSanand from "@/assets/plot-sanand.jpg";
import plotChangodar from "@/assets/plot-changodar.jpg";
import plotBavla from "@/assets/plot-bavla.jpg";
import plotDholera from "@/assets/plot-dholera.jpg";

export type LocationPage = {
  slug: string;
  name: string;
  tagline: string;
  hero: string;
  startingPrice: string;
  intro: string;
  highlights: string[];
  whyInvest: string[];
  nearby: string[];
};

export const locations: LocationPage[] = [
  {
    slug: "zundal",
    name: "Zundal",
    tagline: "Premium residential development zone with modern amenities",
    hero: plotSanand,
    startingPrice: "18,000 / Sq.Yd",
    intro:
      "Zundal has emerged as one of the most sought-after investment destinations in Ahmedabad — with excellent connectivity and modern infrastructure development.",
    highlights: [
      "Clear title plots",
      "Modern layout",
      "Approved layouts",
      "Gated communities",
    ],
    whyInvest: [
      "Strong appreciation potential",
      "Direct connectivity to major highways",
      "Upcoming infrastructure boom",
      "High rental & resale demand",
    ],
    nearby: ["Central Hub", "Market Areas", "Educational Institutions", "Healthcare", "Transport"],
  },
  {
    slug: "vaishno-devi",
    name: "Vaishno Devi",
    tagline: "Prime commercial & residential belt with excellent connectivity",
    hero: plotChangodar,
    startingPrice: "21,000 / Sq.Yd",
    intro:
      "Vaishno Devi sits at the intersection of Ahmedabad's commercial growth — perfect for warehousing, manufacturing and high-ROI investment plots.",
    highlights: ["Title clear", "On major road", "Commercial zone", "Power & water ready"],
    whyInvest: [
      "Heart of Ahmedabad's commercial expansion",
      "Excellent road & connectivity",
      "Approved infrastructure",
      "Constant demand from businesses",
    ],
    nearby: ["Major Road", "Central Hub", "Commercial Areas", "Industrial Zone"],
  },
  {
    slug: "chandkheda",
    name: "Chandkheda",
    tagline: "Affordable residential plots with high appreciation potential",
    hero: plotBavla,
    startingPrice: "17,500 / Sq.Yd",
    intro:
      "Chandkheda offers the perfect balance of affordability and connectivity — a smart pick for both end-users and long-term investors.",
    highlights: ["Good connectivity", "Approved layout", "Vastu compliant", "Spacious plots"],
    whyInvest: [
      "Affordable entry price",
      "On main thoroughfare",
      "Growth potential nearby",
      "Strong future appreciation",
    ],
    nearby: ["Main Road", "Market Area", "Schools", "Hospitals"],
  },
  {
    slug: "jagatpur",
    name: "Jagatpur",
    tagline: "Emerging investment hub with strategic location",
    hero: plotDholera,
    startingPrice: "19,500 / Sq.Yd",
    intro:
      "Jagatpur is a strategic investment location with excellent growth prospects. Early investors stand to gain significant returns in the coming years.",
    highlights: [
      "Strategic location",
      "Modern infrastructure",
      "Excellent connectivity",
      "High appreciation potential",
    ],
    whyInvest: [
      "Backed by infrastructure development",
      "Excellent road connectivity",
      "Prime commercial zone",
      "Once-in-a-decade opportunity",
    ],
    nearby: ["Highway Access", "Commercial Hub", "Industrial Area", "City Center"],
  },
  {
    slug: "motera",
    name: "Motera",
    tagline: "Premium location with world-class infrastructure and amenities",
    hero: plotChangodar,
    startingPrice: "22,000 / Sq.Yd",
    intro:
      "Motera is Ahmedabad's most premium location — combining commercial viability with residential charm, making it a premier pick for commercial and residential investment.",
    highlights: ["Premium access", "Commercial zone", "High footfall area", "Title clear plots"],
    whyInvest: [
      "Direct highway access",
      "Booming commercial & retail demand",
      "Surrounded by development",
      "Steady year-on-year appreciation",
    ],
    nearby: ["Premium Hub", "Commercial District", "Highway Network", "City Center", "Stadium"],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
