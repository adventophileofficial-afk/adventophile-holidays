"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import clsx from "clsx";
import { Dropdown, DropdownLink } from "@/components/ui/Dropdown";
import { whyPoints } from "@/lib/data/why";

interface DestinationLink {
  slug: string;
  name: string;
}

const holidayLinks = [
  { href: "/tours?tag=Family", label: "Family & Couple Holidays" },
  { href: "/tours?tag=Group", label: "Group Tours" },
  { href: "/contact", label: "Custom Itineraries" },
];

const travelServiceLinks = [
  { href: "/services#hotel-bookings", label: "Hotel Bookings" },
  { href: "/services#transportation-private-vehicles", label: "Transportation & Vehicles" },
  { href: "/services#sightseeing-activities", label: "Sightseeing & Activities" },
  { href: "/services#corporate-mice-travel", label: "Corporate & MICE Travel" },
  { href: "/services#complete-travel-assistance", label: "Complete Travel Assistance" },
];

const whyLinks = [
  { href: "/why-adventophile", icon: Sparkles, label: "Overview" },
  ...whyPoints.map(({ slug, icon, title }) => ({ href: `/why-adventophile#${slug}`, icon, label: title })),
];

const flatLinks = [
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function HeaderNav({ destinationLinks }: { destinationLinks: Record<"domestic" | "international", DestinationLink[]> }) {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();

  const closeOnNavigate = () => {
    setOpen(false);
    setMobileSection(null);
  };

  const toggleMobileSection = (key: string) => {
    setMobileSection((current) => (current === key ? null : key));
  };

  return (
    <>
      <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
        <Dropdown label="Destinations" panelClassName="grid grid-cols-2 gap-4 p-4 min-w-[28rem]">
          <div>
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Domestic</p>
            {destinationLinks.domestic.map((d) => (
              <DropdownLink key={d.slug} href={`/destinations/${d.slug}`}>
                {d.name}
              </DropdownLink>
            ))}
          </div>
          <div>
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">International</p>
            {destinationLinks.international.map((d) => (
              <DropdownLink key={d.slug} href={`/destinations/${d.slug}`}>
                {d.name}
              </DropdownLink>
            ))}
          </div>
        </Dropdown>

        <Dropdown label="Holidays">
          {holidayLinks.map((link) => (
            <DropdownLink key={link.label} href={link.href}>
              {link.label}
            </DropdownLink>
          ))}
        </Dropdown>

        <Dropdown label="Travel Services">
          {travelServiceLinks.map((link) => (
            <DropdownLink key={link.label} href={link.href}>
              {link.label}
            </DropdownLink>
          ))}
        </Dropdown>

        <Dropdown label="Why Adventophile" panelClassName="min-w-64">
          {whyLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <Icon className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </Dropdown>

        {flatLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "bg-brand-50 text-brand-700" : "text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden lg:block">
        <Link href="/contact" className="btn-primary">
          Plan My Trip
        </Link>
      </div>

      <button
        type="button"
        className="btn-ghost relative z-50 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <motion.nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute left-0 right-0 top-full overflow-hidden border-t border-border bg-white lg:hidden"
      >
        <div className="container-page flex flex-col gap-1 py-3">
          <MobileSection
            label="Destinations"
            open={mobileSection === "destinations"}
            onToggle={() => toggleMobileSection("destinations")}
            tabIndex={open ? 0 : -1}
          >
            <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Domestic</p>
            {destinationLinks.domestic.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                tabIndex={open ? 0 : -1}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                onClick={closeOnNavigate}
              >
                {d.name}
              </Link>
            ))}
            <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">International</p>
            {destinationLinks.international.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                tabIndex={open ? 0 : -1}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                onClick={closeOnNavigate}
              >
                {d.name}
              </Link>
            ))}
          </MobileSection>

          <MobileSection
            label="Holidays"
            open={mobileSection === "holidays"}
            onToggle={() => toggleMobileSection("holidays")}
            tabIndex={open ? 0 : -1}
          >
            {holidayLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                tabIndex={open ? 0 : -1}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                onClick={closeOnNavigate}
              >
                {link.label}
              </Link>
            ))}
          </MobileSection>

          <MobileSection
            label="Travel Services"
            open={mobileSection === "services"}
            onToggle={() => toggleMobileSection("services")}
            tabIndex={open ? 0 : -1}
          >
            {travelServiceLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                tabIndex={open ? 0 : -1}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                onClick={closeOnNavigate}
              >
                {link.label}
              </Link>
            ))}
          </MobileSection>

          <MobileSection
            label="Why Adventophile"
            open={mobileSection === "why"}
            onToggle={() => toggleMobileSection("why")}
            tabIndex={open ? 0 : -1}
          >
            {whyLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                tabIndex={open ? 0 : -1}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
                onClick={closeOnNavigate}
              >
                {label}
              </Link>
            ))}
          </MobileSection>

          {flatLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              onClick={closeOnNavigate}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            className="btn-primary mt-2 justify-center"
            onClick={closeOnNavigate}
          >
            Plan My Trip
          </Link>
        </div>
      </motion.nav>
    </>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  tabIndex,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  tabIndex: number;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border py-1 last:border-b-0">
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        {label}
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
