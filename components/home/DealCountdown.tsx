"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Set to an ISO date for a real campaign deadline. When unset (or once it has passed), the
// offer rolls over weekly so the timer never sits at 00:00:00:00.
const CAMPAIGN_END: string | null = null;

// Sunday 23:59:59 IST is Sunday 18:29:59 UTC.
const WEEKLY_END_UTC = { day: 0, hours: 18, minutes: 29, seconds: 59 };

function getDealEnd(now: number) {
  const campaignEnd = CAMPAIGN_END ? new Date(CAMPAIGN_END).getTime() : 0;
  if (campaignEnd > now) return campaignEnd;

  const end = new Date(now);
  end.setUTCHours(WEEKLY_END_UTC.hours, WEEKLY_END_UTC.minutes, WEEKLY_END_UTC.seconds, 0);
  end.setUTCDate(end.getUTCDate() + ((WEEKLY_END_UTC.day - end.getUTCDay() + 7) % 7));
  if (end.getTime() <= now) end.setUTCDate(end.getUTCDate() + 7);
  return end.getTime();
}

// Only ever called client-side (inside effects), so server and client renders still match.
function getRemaining() {
  const now = Date.now();
  const diff = Math.max(0, getDealEnd(now) - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function DealCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    const initial = setTimeout(() => setRemaining(getRemaining()), 0);
    return () => {
      clearInterval(id);
      clearTimeout(initial);
    };
  }, []);

  const units = [
    { label: "Days", value: remaining?.days },
    { label: "Hours", value: remaining?.hours },
    { label: "Minutes", value: remaining?.minutes },
    { label: "Seconds", value: remaining?.seconds },
  ];

  return (
    <section className="section bg-accent-600 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container-page flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-100">Limited-time offer</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Save ₹5,000 per couple on Kashmir &amp; Himachal
          </h2>
          <p className="mt-3 max-w-xl text-orange-50">
            Book any Kashmir or Himachal package for the coming season before the offer ends.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-3" role="timer" aria-label="Time remaining on this offer">
            {units.map((unit) => (
              <div key={unit.label} className="min-w-[72px] rounded-2xl bg-white/20 px-3 py-3 text-left">
                <span className="block text-3xl font-bold tabular-nums" aria-hidden="true">
                  {unit.value !== undefined ? String(unit.value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-wide text-orange-100">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/tours" className="btn-outline bg-white text-accent-600 hover:bg-orange-50">
              View Deals
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
