import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
      <div className="container-page section max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: November 2026</p>

        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">What we collect</h2>
            <p className="mt-2">
              We collect only what you give us directly: your name, phone or WhatsApp number and email
              address when you send an enquiry or booking request, the trip details you choose to share
              (destination, travel month, number of travellers, budget and your message), and just your
              email address for the newsletter. We also note which page the form was sent from. We do not use tracking cookies or third-party analytics
              on this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">How we use it</h2>
            <p className="mt-2">
              Enquiry and booking information is used only to respond to your request — to call or message
              you about your trip, prepare an itinerary and quote, confirm availability, or process a booking.
              We contact you by phone, WhatsApp or email only because you agreed to it when sending the form.
              Newsletter sign-ups are used only to send travel updates; to unsubscribe, reply to any email or
              write to us at{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">How we store it</h2>
            <p className="mt-2">
              Form submissions are emailed to our team and recorded in a private spreadsheet (Google Sheets)
              that only our staff can access, so we can follow up on your enquiry. They are never sold or
              shared with third parties for advertising. We keep enquiry records only as long as needed to
              handle your request and for basic business record-keeping, and delete them sooner if you ask.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Your rights</h2>
            <p className="mt-2">
              You can ask us at any time what information we hold about you, request a correction, or request
              deletion. Contact{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                {site.email}
              </a>{" "}
              and we&rsquo;ll respond within a reasonable time frame, consistent with applicable data
              protection law, including India&rsquo;s Digital Personal Data Protection Act, 2023 (and GDPR for
              EU/UK residents and CCPA for California residents). You can withdraw your consent to be contacted
              at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Changes to this policy</h2>
            <p className="mt-2">
              If this policy changes materially, we&rsquo;ll update the date above. Continued use of the site
              after a change constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
