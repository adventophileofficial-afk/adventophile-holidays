import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { getDestinationsByScope } from "@/lib/data/destinations";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { HeaderNav } from "@/components/layout/HeaderNav";

const socialLinks = [
  { href: site.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: site.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
];

export function Header() {
  // Destinations.ts pulls in image-processing code (node:fs) that can't reach the browser
  // bundle, so the dropdown's destination list is resolved here (a server component) and
  // passed down to the client-side nav as plain slug/name pairs.
  const destinationLinks = {
    domestic: getDestinationsByScope("domestic").map((d) => ({ slug: d.slug, name: d.name })),
    international: getDestinationsByScope("international").map((d) => ({ slug: d.slug, name: d.name })),
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="hidden border-b border-border bg-brand-900 text-brand-50 sm:block">
        <div className="container-page flex items-center justify-between gap-6 py-1.5 text-xs">
          <div className="flex items-center gap-6">
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {site.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-brand-100/80">Follow Us</span>
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-1 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/site/logo.jpg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold text-foreground">Adventophile</span>
            <span className="mt-1 text-[0.65rem] font-semibold tracking-[0.2em] text-accent-600">
              — HOLIDAYS —
            </span>
          </span>
        </Link>

        <HeaderNav destinationLinks={destinationLinks} />
      </div>
    </header>
  );
}
