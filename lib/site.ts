export const site = {
  name: "Adventophile Holidays",
  tagline: "Travel & Holiday Management Company",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.adventophile.com",
  description:
    "Adventophile Holidays is a Jodhpur-based travel & holiday management company designing customized domestic and international holidays — Rajasthan, Kashmir, Kerala, the Northeast, Dubai, Maldives, Vietnam and more.",
  phone: "+91 94141 36602",
  email: "info@adventophile.com",
  address: {
    line1: "Near Petrol Pump, Opp. Medical College",
    line2: "Sindhi Colony, Sector-E, Shastri Nagar",
    city: "Jodhpur",
    region: "Rajasthan",
    postalCode: "342003",
    country: "India",
  },
  social: {
    instagram: "https://www.instagram.com/adventophile_official/",
    facebook: "https://www.facebook.com/share/1EdC8wZgnw/",
    linkedin: "https://www.linkedin.com/company/adventophile/",
  },
  defaultOgImage: "/images/site/og-default.jpg",
} as const;

/** Full street address on one line — used in schema.org PostalAddress and meta descriptions. */
export const streetAddress = `${site.address.line1}, ${site.address.line2}`;
