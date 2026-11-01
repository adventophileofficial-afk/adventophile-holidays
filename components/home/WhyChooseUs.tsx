import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getWhyPoints } from "@/lib/data/why";
import { withVersion } from "@/lib/image-version";
import { Reveal } from "@/components/shared/Reveal";

export function WhyChooseUs() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow-ruled text-brand-700">Why travel with us</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            A travel company, not a booking website
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            With our own team on the ground and dedicated human assistance, we make your journey
            smoother, safer and more personal — wherever you go.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {getWhyPoints().map(({ slug, icon: Icon, title, summary, cardImage }, i) => (
            <Reveal key={slug} delay={i * 0.08}>
              <Link
                href={`/why-adventophile#${slug}`}
                className="group flex h-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-12px_rgb(0_0_0_/_0.18)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_14px_40px_-12px_rgb(0_0_0_/_0.28)]"
              >
                <div className="relative min-h-56 w-[42%] shrink-0 overflow-hidden">
                  <Image
                    src={withVersion(cardImage)}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 150px, (min-width: 640px) 22vw, 45vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
                    {title}
                  </h3>
                  <span className="mt-3 block h-px w-8 bg-accent-500" aria-hidden="true" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{summary}</p>
                  <ArrowRight
                    className="mt-3 h-4 w-4 text-accent-500 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex items-center justify-center gap-4">
          <span className="hidden h-px w-24 bg-accent-500/60 sm:block" aria-hidden="true" />
          <MapPin className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <p className="font-display text-base italic text-foreground sm:text-lg">
            One team. Multiple destinations. Real people on the ground.
          </p>
          <span className="hidden h-px w-24 bg-accent-500/60 sm:block" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
