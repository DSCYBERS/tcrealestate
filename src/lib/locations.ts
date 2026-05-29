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
    slug: "sanand",
    name: "Sanand",
    tagline: "Ahmedabad's fastest-growing industrial & residential corridor",
    hero: plotSanand,
    startingPrice: "18,000 / Sq.Yd",
    intro:
      "Sanand has emerged as one of the most sought-after investment destinations in Ahmedabad — powered by Tata Nano, MG Motors, and large-scale industrial expansion.",
    highlights: [
      "Clear title plots",
      "Near Tata Nano plant",
      "Approved layouts",
      "Gated communities",
    ],
    whyInvest: [
      "30%+ appreciation in last 3 years",
      "Direct connectivity to SG Highway & Ring Road",
      "Upcoming metro & infrastructure boom",
      "High rental & resale demand",
    ],
    nearby: ["Tata Nano Plant", "Nano Cars Factory", "Sanand GIDC", "Bopal", "SG Highway"],
  },
  {
    slug: "changodar",
    name: "Changodar",
    tagline: "Prime industrial belt on SP Ring Road",
    hero: plotChangodar,
    startingPrice: "21,000 / Sq.Yd",
    intro:
      "Changodar sits at the intersection of Ahmedabad's industrial growth — perfect for warehousing, manufacturing and high-ROI investment plots.",
    highlights: ["NA & title clear", "On SP Ring Road", "Industrial zone", "Power & water ready"],
    whyInvest: [
      "Heart of Ahmedabad's industrial expansion",
      "Excellent road & rail connectivity",
      "Approved by GIDC",
      "Constant demand from manufacturers",
    ],
    nearby: ["SP Ring Road", "Sarkhej", "Bavla", "Vatva GIDC"],
  },
  {
    slug: "bavla",
    name: "Bavla",
    tagline: "Low entry, high appreciation residential plots",
    hero: plotBavla,
    startingPrice: "17,500 / Sq.Yd",
    intro:
      "Bavla offers the perfect balance of affordability and connectivity — a smart pick for both end-users and long-term investors.",
    highlights: ["Highway touch", "Approved layout", "Vastu compliant", "Big plot sizes"],
    whyInvest: [
      "Affordable entry price",
      "On Ahmedabad-Rajkot highway",
      "Industrial growth nearby",
      "Strong future appreciation potential",
    ],
    nearby: ["Ahmedabad-Rajkot Highway", "Bavla GIDC", "Sanand", "Viramgam"],
  },
  {
    slug: "dholera",
    name: "Dholera SIR",
    tagline: "India's first greenfield smart city — invest before the boom",
    hero: plotDholera,
    startingPrice: "19,500 / Sq.Yd",
    intro:
      "Dholera Special Investment Region (DSIR) is India's most ambitious smart city project. Early investors stand to gain 3-5x in the coming decade.",
    highlights: [
      "Inside DSIR influence zone",
      "Smart City corridor",
      "Expressway connectivity",
      "High future appreciation",
    ],
    whyInvest: [
      "Backed by Government of India & Gujarat",
      "Dholera Expressway & International Airport",
      "Solar park & metro planned",
      "Once-in-a-decade investment opportunity",
    ],
    nearby: ["Dholera Expressway", "Upcoming Intl. Airport", "Bhavnagar", "Ahmedabad (~90km)"],
  },
  {
    slug: "narol",
    name: "Narol",
    tagline: "Strategic South Ahmedabad commercial & residential hub",
    hero: plotChangodar,
    startingPrice: "22,000 / Sq.Yd",
    intro:
      "Narol is South Ahmedabad's most active commercial corridor — connecting the city to Vatva GIDC, Naroda and the Ahmedabad-Vadodara Expressway, making it a premium pick for commercial and residential investment.",
    highlights: ["Expressway access", "Commercial zone", "High footfall area", "Title clear plots"],
    whyInvest: [
      "Direct Ahmedabad-Vadodara Expressway access",
      "Booming commercial & retail demand",
      "Surrounded by industrial belts",
      "Steady year-on-year appreciation",
    ],
    nearby: ["Narol Circle", "Vatva GIDC", "Ahmedabad-Vadodara Expressway", "Isanpur", "Lambha"],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
