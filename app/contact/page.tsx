import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { getAllServices } from "@/lib/data/services";
import { getDestinationBySlug, getDestinationsByScope } from "@/lib/data/destinations";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Adventophile Holidays, Jodhpur — call +91 94141 36602 or email info@adventophile.com for customized domestic and international holiday packages.",
  path: "/contact",
});

const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

const toOption = ({ slug, name }: { slug: string; name: string }) => ({ slug, name });

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const services = getAllServices();
  const { destination } = await searchParams;
  const defaultDestination =
    typeof destination === "string" && getDestinationBySlug(destination) ? destination : "";

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <div className="container-page section grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="section-eyebrow">Get in touch</p>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-lede">
            Tell us where you want to go, your dates and your group size — we will come back with an
            itinerary and a quote, usually within one working day.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <address className="text-sm not-italic text-muted-foreground">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city}, {site.address.region} – {site.address.postalCode},{" "}
                {site.address.country}
              </address>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <a href={telHref} className="text-sm text-muted-foreground hover:text-brand-700">
                {site.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted-foreground hover:text-brand-700"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="card mt-8 p-5">
            <h2 className="font-semibold text-foreground">What we can help with</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              More about our services →
            </Link>
          </div>
        </div>

        <ContactForm
          domestic={getDestinationsByScope("domestic").map(toOption)}
          international={getDestinationsByScope("international").map(toOption)}
          defaultDestination={defaultDestination}
        />
      </div>
    </>
  );
}
