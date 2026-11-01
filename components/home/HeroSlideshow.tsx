"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Compass, Crosshair, Map, PlaneTakeoff, Users, UsersRound } from "lucide-react";
import clsx from "clsx";

const featureStrip = [
  { icon: Crosshair, label: "Domestic & International" },
  { icon: Users, label: "Family Holidays" },
  { icon: UsersRound, label: "Group Travel" },
  { icon: Map, label: "Custom Itineraries" },
];

const SLIDE_DURATION_MS = 3000;

interface Slide {
  src: string;
  alt: string;
}

export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  // Slides whose <Image> has been rendered: the current one plus the next, so each 4K file is
  // downloaded and decoded one slide ahead instead of all eight up front. Once mounted a slide
  // stays mounted, so every change is a pure CSS opacity crossfade between decoded images.
  const [mounted, setMounted] = useState(() => new Set([0, 1 % slides.length]));
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      setMounted((prev) => {
        const next = (i + 1) % slides.length;
        if (prev.has(i) && prev.has(next)) return prev;
        return new Set(prev).add(i).add(next);
      });
    },
    [slides.length]
  );

  // A timeout keyed on `index` (rather than an interval) restarts the full duration whenever a
  // dot is clicked.
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => goTo((index + 1) % slides.length), SLIDE_DURATION_MS);
    return () => clearTimeout(id);
  }, [index, paused, goTo, slides.length]);

  // Don't keep advancing in a background tab.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden text-white sm:min-h-[640px] lg:min-h-[720px]">
      <div className="absolute inset-0 bg-brand-900">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={clsx(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            {mounted.has(i) && (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                sizes="100vw"
                quality={85}
                className={clsx(
                  "object-cover",
                  // Slow zoom-out on the active slide; the crossfade alone when reduced motion is on.
                  !shouldReduceMotion && "transition-transform duration-[4000ms] ease-out",
                  !shouldReduceMotion && (i === index ? "scale-100" : "scale-110")
                )}
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="container-page relative z-10 py-16 sm:py-20">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Your Journey.
            <br />
            <span className="text-accent-500">Thoughtfully Planned.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-brand-50 sm:text-lg">
            From India to the world, we design personalised holidays around your dates, budget and
            travel style — with expert planning and support from start to finish.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              <PlaneTakeoff className="h-4 w-4" aria-hidden="true" />
              Plan My Trip
            </Link>
            <Link
              href="/destinations"
              className="btn-outline border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Explore Destinations
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-stretch">
            {featureStrip.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={clsx(
                  "flex max-w-20 flex-col items-start gap-2 px-4 text-left text-xs text-brand-50 first:pl-0",
                  i > 0 && "border-l border-white/15"
                )}
              >
                <Icon className="h-5 w-5 text-accent-500" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${i + 1}: ${slide.alt}`}
            onClick={() => goTo(i)}
            className={clsx(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-6 bg-accent-500" : "w-1.5 bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </section>
  );
}
