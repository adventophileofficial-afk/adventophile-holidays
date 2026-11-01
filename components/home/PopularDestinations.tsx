import Image from "next/image";
import Link from "next/link";
import { getAllDestinations } from "@/lib/data/destinations";
import { interleaveByScope } from "@/lib/interleave";
import { Reveal } from "@/components/shared/Reveal";

export function PopularDestinations() {
  const destinations = interleaveByScope(getAllDestinations(), (d) => d.scope);

  return (
    <section className="section bg-muted">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">Popular destinations</p>
          <h2 className="section-title">Where would you like to go?</h2>
          <p className="section-lede">Discover handpicked destinations for your next adventure.</p>
        </Reveal>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {destinations.map((destination, i) => (
            <Reveal key={destination.slug} delay={(i % 8) * 0.05} className="shrink-0 snap-start">
              <Link
                href={`/destinations/${destination.slug}`}
                className="group relative block h-72 w-52 overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-lg sm:h-80 sm:w-56"
              >
                <Image
                  src={destination.image.src}
                  alt={destination.image.alt}
                  fill
                  sizes="224px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 font-display text-lg font-semibold text-white">
                  {destination.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
