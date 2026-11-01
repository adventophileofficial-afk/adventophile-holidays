import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/lib/data/services";
import { withVersion } from "@/lib/image-version";
import { Reveal } from "@/components/shared/Reveal";
import { TrustBar } from "@/components/shared/TrustBar";

export function Services() {
  const services = getAllServices();

  return (
    <section className="section relative overflow-hidden bg-cream">
      {/* Decorative script notes, dashed flight path and corner photos — wide screens only. */}
      <p
        aria-hidden="true"
        className="absolute left-[4%] top-14 hidden -rotate-12 font-script text-3xl leading-tight text-brand-900 lg:block"
      >
        More
        <br />
        Than Just
        <br />
        Travel <span className="text-accent-500">♡</span>
      </p>
      <p
        aria-hidden="true"
        className="absolute right-[4%] top-24 hidden -rotate-12 text-right font-script text-2xl leading-tight text-brand-900 lg:block"
      >
        Your Next
        <br />
        Adventure
        <br />
        Starts Here
      </p>
      <svg
        aria-hidden="true"
        viewBox="0 0 240 110"
        className="absolute right-[13%] top-10 hidden w-56 text-accent-500 lg:block"
        fill="none"
      >
        <path
          d="M4 96 C 40 100, 70 60, 60 44 C 50 28, 24 48, 44 64 C 70 84, 150 70, 206 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
        <path
          d="M232 10 L200 20 L188 14 L182 17 L194 26 L184 34 L176 32 L172 35 L184 41 L196 34 L206 44 L210 42 L206 30 L230 18 Z"
          fill="currentColor"
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute -left-4 bottom-10 hidden w-40 -rotate-[8deg] bg-white p-2 pb-7 shadow-xl 2xl:block"
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={withVersion("/images/destinations/europe.jpg")}
            alt=""
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 hidden h-64 w-60 2xl:block"
        style={{
          maskImage: "linear-gradient(to left, black 40%, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black 40%, transparent)",
        }}
      >
        <Image
          src={withVersion("/images/destinations/rajasthan.jpg")}
          alt=""
          fill
          sizes="240px"
          className="object-cover object-top"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-ruled">What we do</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            A Complete Travel &amp; Holiday
            <br className="hidden sm:block" /> Management Service
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Everything between your first enquiry and your journey home — planned, booked and
            looked after by the same team.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {services.map(({ slug, title, tagline, icon: Icon }, i) => (
            <Reveal
              key={slug}
              delay={(i % 5) * 0.06}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-4rem)/5)]"
            >
              <Link
                href={`/services#${slug}`}
                className="group flex h-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-12px_rgb(0_0_0_/_0.18)] transition-shadow hover:shadow-[0_14px_40px_-12px_rgb(0_0_0_/_0.28)]"
              >
                <div className="relative w-[38%] shrink-0 overflow-hidden">
                  <Image
                    src={withVersion(`/images/services/${slug}.jpg`)}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 110px, (min-width: 640px) 20vw, 38vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-h-36 flex-1 flex-col p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{tagline}</p>
                  <ArrowRight
                    className="mt-2 h-4 w-4 text-accent-500 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <TrustBar className="mt-12" />
      </div>
    </section>
  );
}
