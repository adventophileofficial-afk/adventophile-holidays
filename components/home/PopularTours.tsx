import Link from "next/link";
import { getFeaturedTours, getTourScope } from "@/lib/data/tours";
import { interleaveByScope } from "@/lib/interleave";
import { TourCard } from "@/components/tours/TourCard";
import { Reveal } from "@/components/shared/Reveal";

export function PopularTours() {
  // Alternate international and domestic packages; 6 fills two rows of the 3-column grid.
  const tours = interleaveByScope(getFeaturedTours(), getTourScope).slice(0, 6);

  return (
    <section className="section">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Handpicked itineraries</p>
            <h2 className="section-title">Popular Packages</h2>
          </div>
          <Link href="/tours" className="btn-outline">
            View all packages
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <Reveal key={tour.slug} delay={(i % 3) * 0.1}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
