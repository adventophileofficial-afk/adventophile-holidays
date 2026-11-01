import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Check, MapPin } from "lucide-react";
import { getAllDestinationSlugs, getDestinationBySlug } from "@/lib/data/destinations";
import { getToursByDestination } from "@/lib/data/tours";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TourCard } from "@/components/tours/TourCard";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/shared/Reveal";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};

  const scopeLabel = destination.scope === "domestic" ? "Domestic" : "International";

  return buildMetadata({
    title: `${destination.name} Tour Packages`,
    description: `${scopeLabel} holiday packages to ${destination.name} from Adventophile Holidays, Jodhpur. ${destination.blurb}`,
    path: `/destinations/${destination.slug}`,
    image: destination.image.src,
  });
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const tours = getToursByDestination(destination.slug);
  const scopeLabel = destination.scope === "domestic" ? "India — Domestic" : "International";

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Destinations", href: "/destinations" },
          { label: destination.name, href: `/destinations/${destination.slug}` },
        ]}
      />

      <section className="relative overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <Image
          src={destination.image.src}
          alt={destination.image.alt}
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="container-page relative">
          <Badge className="bg-white/90 text-brand-700">{scopeLabel}</Badge>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{destination.name}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-brand-50">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {destination.country}
          </p>
          <p className="mt-4 max-w-2xl text-lg text-brand-50">{destination.blurb}</p>
        </div>
      </section>

      <div className="container-page section">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-bold text-foreground">What {destination.name} is known for</h2>
              <ul className="mt-5 space-y-3">
                {destination.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside>
            <div className="card sticky top-24 p-5">
              <h2 className="font-semibold text-foreground">Best time to visit</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                {destination.bestTime}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                Every package here is customizable — dates, hotel category, pace and add-ons. Tell us what
                you need and we will quote it.
              </p>
              <Link href={`/contact?destination=${destination.slug}`} className="btn-primary mt-4 w-full justify-center">
                Enquire about {destination.name}
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">
            {tours.length > 0
              ? `${destination.name} packages`
              : `Custom ${destination.name} packages`}
          </h2>
          {tours.length > 0 ? (
            <>
              <p className="mt-1 text-sm text-muted-foreground">
                {tours.length} {tours.length === 1 ? "package" : "packages"} — all of them adjustable to
                your dates and budget.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {tours.map((tour, i) => (
                  <Reveal key={tour.slug} delay={(i % 6) * 0.06}>
                    <TourCard tour={tour} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="card mt-6 flex flex-col items-start gap-3 p-8">
              <p className="text-sm text-muted-foreground">
                We do not have a fixed {destination.name} itinerary listed right now — we build these to
                order. Send us your dates and group size and we will put together a quote, usually within
                one working day.
              </p>
              <Link href={`/contact?destination=${destination.slug}`} className="btn-primary">
                Request a quote
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
