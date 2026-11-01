import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, CheckCircle2, PlaneTakeoff } from "lucide-react";
import { getWhyPoints } from "@/lib/data/why";
import { withVersion } from "@/lib/image-version";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { TrustBar } from "@/components/shared/TrustBar";

export const metadata: Metadata = buildMetadata({
  title: "Why Adventophile",
  description:
    "Why travel with Adventophile Holidays: a Jodhpur-based team with its own vehicles and guides, domestic and international holidays from one office, itineraries built to your budget, and real assistance while you travel.",
  path: "/why-adventophile",
});

export default function WhyAdventophilePage() {
  const points = getWhyPoints();

  return (
    <>
      <Breadcrumbs items={[{ label: "Why Adventophile", href: "/why-adventophile" }]} />

      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-28">
        <Image
          src={withVersion("/images/hero/8.jpg")}
          alt="Table Mountain over Cape Town"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="container-page relative">
          <p className="section-eyebrow text-accent-500">Why Adventophile</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            A travel company, not a booking website
          </h1>
          <p className="mt-5 max-w-2xl text-base text-brand-50 sm:text-lg">
            Real people on the ground, one team from enquiry to homecoming, and trips shaped around
            you — here is what that means in practice.
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-3">
            {points.map(({ slug, title, icon: Icon }) => (
              <Link
                key={slug}
                href={`#${slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Icon className="h-4 w-4 text-accent-500" aria-hidden="true" />
                {title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {points.map(({ slug, title, icon: Icon, tagline, body, highlights, image, inset }, i) => {
        const flipped = i % 2 === 1;
        return (
          <section
            key={slug}
            id={slug}
            className={clsx("section scroll-mt-28 overflow-hidden", i % 2 === 0 ? "bg-cream" : "bg-white")}
          >
            <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={clsx("relative mx-auto w-full max-w-md", flipped && "lg:order-2")}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgb(0_0_0_/_0.45)]">
                  <Image
                    src={withVersion(image)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 448px, 90vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={clsx(
                    "absolute -bottom-8 w-[42%] overflow-hidden rounded-2xl border-4 border-white shadow-xl",
                    flipped ? "-left-4 -rotate-3 sm:-left-10" : "-right-4 rotate-3 sm:-right-10"
                  )}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={withVersion(inset.src)}
                      alt={inset.alt}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <span
                  className={clsx(
                    "absolute -top-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 font-display text-xl font-bold text-white shadow-lg",
                    flipped ? "-right-3 sm:-right-5" : "-left-3 sm:-left-5"
                  )}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Reveal>

              <Reveal delay={0.1} className="pt-6 lg:pt-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
                    Why Adventophile
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-2 font-display text-lg italic text-accent-600 sm:text-xl">{tagline}</p>
                <span className="mt-5 block h-px w-12 bg-accent-500" aria-hidden="true" />
                {body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    <PlaneTakeoff className="h-4 w-4" aria-hidden="true" />
                    Plan My Trip
                  </Link>
                  {slug === "based-in-jodhpur" && (
                    <Link href="/contact" className="btn-outline">
                      Visit our office
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-cream pb-16 pt-4">
        <div className="container-page">
          <TrustBar />
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-900 py-20 text-white">
        <Image
          src={withVersion("/images/hero/7.jpg")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-page relative flex flex-col items-center gap-4 text-center">
          <p className="font-script text-3xl text-accent-500">Your next adventure starts here</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">One team. Multiple destinations.</h2>
          <p className="max-w-lg text-brand-50">
            Tell us where, when and roughly what you have in mind. We will come back with an itinerary
            and a quote, usually within one working day.
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
