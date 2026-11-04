import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

const exploreLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "All Packages" },
  { href: "/services", label: "Our Services" },
  { href: "/why-adventophile", label: "Why Adventophile" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About Us" },
];

const supportLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: site.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: site.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-900 text-brand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-white">
            {/* The source JPEG's square white corners would show as a box against this dark
                background, so the image is scaled up slightly inside a circular clip to crop
                them out — only the printed circle badge is visible. */}
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/site/logo.jpg"
                alt=""
                fill
                sizes="40px"
                className="scale-110 object-cover"
              />
            </span>
            {site.name}
          </Link>
          <p className="mt-3 max-w-xs text-sm">{site.tagline}</p>
          <p className="mt-2 max-w-xs text-sm text-brand-100/80">
            Customized domestic &amp; international holidays, planned from Jodhpur.
          </p>
          <div className="mt-4 flex gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Support</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {site.address.line1}, {site.address.line2}, {site.address.city},{" "}
                {site.address.region} {site.address.postalCode}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Stay in the loop</h3>
          <p className="mt-4 text-sm">Trip ideas and travel tips, a couple of times a month. No spam.</p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Customized domestic &amp; international holidays.</p>
        </div>
      </div>
    </footer>
  );
}
