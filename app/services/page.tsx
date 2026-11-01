import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { getAllServices } from "@/lib/data/services";
import { withVersion } from "@/lib/image-version";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { TrustBar } from "@/components/shared/TrustBar";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Customized tour packages, domestic and international holidays, hotel bookings, private vehicles, sightseeing, family and group tours, corporate & MICE travel and complete travel assistance from Adventophile Holidays, Jodhpur.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-28">
        <Image
          src={withVersion("/images/hero/5.jpg")}
          alt="Marina Bay Sands, Singapore"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        <div className="container-page relative">
          <p className="section-eyebrow text-accent-500">Travel Services</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">Our Services</h1>
          <p className="mt-5 max-w-2xl text-base text-brand-50 sm:text-lg">
            Adventophile Holidays is a full travel &amp; holiday management company. We do not just sell a
            package and step back — flights, hotels, vehicles, permits, sightseeing and the phone call at
            11pm when a train is late are all part of the same job.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            <PlaneTakeoff className="h-4 w-4" aria-hidden="true" />
            Plan My Trip
          </Link>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-ruled">What we do</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Everything your trip needs, under one roof
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Pick one service or let us handle the whole journey — the same team plans, books and looks
              after you from first enquiry to the flight home.
            </p>
          </Reveal>

          <div className="mt-16 space-y-16 lg:space-y-24">
            {services.map(({ slug, title, tagline, description, icon: Icon }, i) => (
              <Reveal key={slug}>
                <article
                  id={slug}
                  className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={clsx("group relative", i % 2 === 1 && "lg:order-2")}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_50px_-20px_rgb(0_0_0_/_0.35)]">
                      <Image
                        src={withVersion(`/images/services/${slug}.jpg`)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 600px, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span
                      className={clsx(
                        "absolute -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 font-display text-lg font-bold text-white shadow-lg",
                        i % 2 === 1 ? "-right-2 sm:-right-4" : "-left-2 sm:-left-4"
                      )}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">{title}</h3>
                    <p className="mt-2 font-display text-lg italic text-accent-600">{tagline}</p>
                    <span className="mt-5 block h-px w-12 bg-accent-500" aria-hidden="true" />
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Plan this with us
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <TrustBar className="mt-20" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-900 py-20 text-white">
        <Image
          src={withVersion("/images/why/travel-assistance.jpg")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="container-page relative flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Tell us what you need</h2>
          <p className="max-w-lg text-brand-50">
            Send us your dates, your group size and roughly what you have in mind. We will come back with
            an itinerary and a quote, usually within one working day.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Get in touch
            </Link>
            <Link
              href="/destinations"
              className="btn-outline border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Browse destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
