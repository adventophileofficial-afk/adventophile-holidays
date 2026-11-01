import { BadgeIndianRupee, Globe2, Headphones, MapPin, type LucideIcon } from "lucide-react";

export interface WhyPoint {
  slug: string;
  title: string;
  icon: LucideIcon;
  /** One-liner for the homepage cards. */
  summary: string;
  tagline: string;
  body: string[];
  highlights: string[];
  /** Plain public paths — callers on the server wrap them in withVersion(). */
  image: string;
  cardImage: string;
  inset: { src: string; alt: string };
}

// Single source for the "Why Adventophile" points: the header dropdown, the homepage
// "Why travel with us" cards and the /why-adventophile page all read from here.
export const whyPoints: WhyPoint[] = [
  {
    slug: "based-in-jodhpur",
    title: "Based in Jodhpur",
    icon: MapPin,
    summary:
      "Rajasthan is our home ground, not a destination we resell — own vehicles, own drivers, own guides.",
    tagline: "Rajasthan is home, not a destination we resell.",
    body: [
      "Our office is in Shastri Nagar, Jodhpur, a short drive from Mehrangarh. Rajasthan trips are run by people who live here — we know which fort is crowded at noon, which desert camp is worth the drive and when the season actually turns.",
      "Because the vehicles, drivers and guides are our own, there is no middle layer between your itinerary and the people running it. If a plan needs to change on the road, it changes the same day.",
    ],
    highlights: [
      "Own vehicles and experienced drivers",
      "Local guides across Rajasthan",
      "On-ground help when plans change",
      "A real office you can walk into",
    ],
    image: "/images/why/large/based-in-jodhpur.jpg",
    cardImage: "/images/why/based-in-jodhpur.jpg",
    inset: { src: "/images/tours/jodhpur-osian-desert-safari/1.jpg", alt: "The blue city of Jodhpur" },
  },
  {
    slug: "domestic-international",
    title: "Domestic & International",
    icon: Globe2,
    summary: "Indian and international destinations, all handled by the same team from one office.",
    tagline: "From the Himalayas to the Alps — one team.",
    body: [
      "We plan holidays across 11 Indian destinations, from Kashmir and Himachal to Kerala and the Andamans, and 18 international ones — Dubai, the Maldives, Europe, Japan, the USA, Tomorrowland and more.",
      "Whether it is a weekend in Goa or three countries in Europe, you deal with the same planner from first enquiry to the flight home. No hand-offs to a different desk, no repeating yourself.",
    ],
    highlights: [
      "11 Indian destinations",
      "18 international destinations",
      "Festival and event trips",
      "Multi-country itineraries",
    ],
    image: "/images/why/large/domestic-international.jpg",
    cardImage: "/images/why/domestic-international.jpg",
    inset: { src: "/images/hero/5.jpg", alt: "Marina Bay Sands, Singapore" },
  },
  {
    slug: "built-to-your-budget",
    title: "Built to Your Budget",
    icon: BadgeIndianRupee,
    summary:
      "Every package is a starting point. Tell us the number and we will shape the itinerary around it.",
    tagline: "Tell us the number — we shape the trip.",
    body: [
      "The prices on our packages are starting points, not fixed menus. Tell us what you want to spend and we will work backwards: hotel category, pace, transport and add-ons all move to fit.",
      "You get an itemised quote in writing before you commit, so you know exactly what is included and what is not.",
    ],
    highlights: [
      "Itemised written quotes",
      "Stays from budget to luxury",
      "Flexible inclusions and add-ons",
      "Group and early-booking rates",
    ],
    image: "/images/why/large/built-to-budget.jpg",
    cardImage: "/images/why/built-to-budget.jpg",
    inset: { src: "/images/destinations/bali.jpg", alt: "Bali rice terraces" },
  },
  {
    slug: "travel-assistance",
    title: "Assistance While You Travel",
    icon: Headphones,
    summary:
      "Flights, permits, visa paperwork and a number that answers if something changes mid-trip.",
    tagline: "A real person answers — before, during and after.",
    body: [
      "Flights, visa documentation, permits and insurance guidance are handled alongside the itinerary, so the paperwork is ready before you pack.",
      "Once you are travelling, you have a number that answers. A delayed train, a missed connection or a change of plan is a phone call, not a problem you sort out alone.",
    ],
    highlights: [
      "Visa and permit paperwork",
      "Flight and train bookings",
      "A helpline while you travel",
      "Follow-up after you return",
    ],
    image: "/images/why/large/travel-assistance.jpg",
    cardImage: "/images/why/travel-assistance.jpg",
    inset: { src: "/images/services/complete-travel-assistance.jpg", alt: "Travel support team" },
  },
];

export function getWhyPoints(): WhyPoint[] {
  return whyPoints;
}
