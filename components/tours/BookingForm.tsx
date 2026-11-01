"use client";

import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { ConsentCheckbox } from "@/components/shared/ConsentCheckbox";
import { LeadFormError } from "@/components/shared/LeadFormError";
import { useLeadSubmit } from "@/components/shared/useLeadSubmit";

export function BookingForm({ tourSlug, tourTitle }: { tourSlug: string; tourTitle: string }) {
  const { status, error, handleSubmit } = useLeadSubmit("/api/book", (form) => ({
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    phone: String(form.get("phone") || ""),
    tourSlug,
    tourTitle,
    startDate: String(form.get("startDate") || ""),
    guests: Number(form.get("guests") || 1),
    message: String(form.get("message") || ""),
    consent: form.get("consent") === "on",
    company: String(form.get("company") || ""),
  }));

  if (status === "success") {
    return (
      <div className="card p-5" role="status">
        <h3 className="font-semibold text-foreground">Request sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — a trip coordinator will reply within one business day to confirm availability for{" "}
          <strong>{tourTitle}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5">
      <h3 className="font-semibold text-foreground">Book This Tour</h3>
      <p className="text-sm text-muted-foreground">
        This sends a booking inquiry — a real person confirms availability and payment details by phone or email.
      </p>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`booking-company-${tourSlug}`}>Company</label>
        <input id={`booking-company-${tourSlug}`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <FormField label="Full name" name="name" required autoComplete="name" />
      <FormField label="Email" name="email" type="email" required autoComplete="email" />
      <FormField label="Phone / WhatsApp" name="phone" type="tel" required autoComplete="tel" />
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Preferred start date" name="startDate" type="date" />
        <FormField label="Guests" name="guests" type="number" min={1} max={30} defaultValue={2} />
      </div>
      <FormField label="Anything we should know?" name="message" as="textarea" placeholder="Optional" />

      <ConsentCheckbox />

      {status === "error" && error && <LeadFormError message={error.message} whatsapp={error.whatsapp} />}

      <Button type="submit" variant="accent" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Sending…" : "Request to Book"}
      </Button>
    </form>
  );
}
