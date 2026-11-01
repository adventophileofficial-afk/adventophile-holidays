import clsx from "clsx";
import { Globe2, Heart, ShieldCheck, Star } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const trustPoints = [
  { icon: ShieldCheck, label: "Trusted by 2000+ Travellers" },
  { icon: Star, label: "Pan India Clients" },
  { icon: Globe2, label: "Expert Travel Planners" },
  { icon: Heart, label: "Your Happiness, Our Priority" },
];

/** Pill-shaped row of trust signals, used under the service grids. */
export function TrustBar({ className }: { className?: string }) {
  return (
    <Reveal className={clsx("flex justify-center", className)}>
      <ul className="flex flex-wrap justify-center gap-y-3 rounded-3xl bg-white/80 px-4 py-4 shadow-sm ring-1 ring-black/5 sm:rounded-full sm:px-8">
        {trustPoints.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            className={clsx(
              "flex items-center gap-2 px-4 text-sm text-foreground sm:px-6",
              i > 0 && "md:border-l md:border-accent-500/30"
            )}
          >
            <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
