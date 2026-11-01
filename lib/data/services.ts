import {
  BedDouble,
  Briefcase,
  Bus,
  Camera,
  Globe2,
  Headphones,
  Map,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  /** Short line shown on the homepage service cards. */
  tagline: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    slug: "customized-tour-packages",
    title: "Customized Tour Packages",
    description:
      "Every itinerary is built around your dates, budget and pace — not pulled off a shelf.",
    tagline: "Tailor-made itineraries for your dream trips.",
    icon: Map,
  },
  {
    slug: "domestic-international-holidays",
    title: "Domestic & International Holidays",
    description:
      "Indian states from Rajasthan to the Andamans and international holidays from Europe to Japan, planned by the same team end to end.",
    tagline: "Explore India and the world with ease.",
    icon: Globe2,
  },
  {
    slug: "hotel-bookings",
    title: "Hotel Bookings",
    description:
      "Budget guesthouses to heritage palaces and resorts, booked at negotiated operator rates.",
    tagline: "Handpicked stays for every budget & style.",
    icon: BedDouble,
  },
  {
    slug: "transportation-private-vehicles",
    title: "Transportation & Private Vehicle Services",
    description:
      "Air-conditioned cars, tempo travellers and coaches with experienced drivers, plus airport and station transfers.",
    tagline: "Comfortable, safe and reliable travel.",
    icon: Bus,
  },
  {
    slug: "sightseeing-activities",
    title: "Sightseeing & Activities",
    description:
      "Guided sightseeing, entry tickets, desert safaris, houseboats, cruises and adventure add-ons.",
    tagline: "Iconic spots, hidden gems and unforgettable experiences.",
    icon: Camera,
  },
  {
    slug: "family-couple-holidays",
    title: "Family & Couple Holidays",
    description:
      "Paced for children and grandparents, or built around two people and a long lunch. Your call.",
    tagline: "Create memories that last a lifetime.",
    icon: Users,
  },
  {
    slug: "group-tours",
    title: "Group Tours",
    description:
      "Departures for extended families, friend circles, schools and pilgrimage groups of any size.",
    tagline: "Travel better together with like-minded explorers.",
    icon: UsersRound,
  },
  {
    slug: "corporate-mice-travel",
    title: "Corporate & MICE Travel",
    description:
      "Offsites, conferences, incentive trips and dealer tours, with billing and documentation to match.",
    tagline: "Business travel, meetings and events made simple.",
    icon: Briefcase,
  },
  {
    slug: "complete-travel-assistance",
    title: "Complete Travel Assistance",
    description:
      "Flights, permits, visa documentation, insurance guidance and a number that answers while you are travelling.",
    tagline: "From visa to support, we're with you always.",
    icon: Headphones,
  },
];

export function getAllServices(): Service[] {
  return services;
}
