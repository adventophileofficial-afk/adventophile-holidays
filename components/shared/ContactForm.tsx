"use client";

import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { ConsentCheckbox } from "@/components/shared/ConsentCheckbox";
import { LeadFormError } from "@/components/shared/LeadFormError";
import { useLeadSubmit } from "@/components/shared/useLeadSubmit";
import { budgetOptions } from "@/lib/budget";

export interface DestinationOption {
  slug: string;
  name: string;
}

interface ContactFormProps {
  domestic: DestinationOption[];
  international: DestinationOption[];
  /** Destination slug to preselect, e.g. from /contact?destination=bali. */
  defaultDestination?: string;
}

export function ContactForm({ domestic, international, defaultDestination = "" }: ContactFormProps) {
  const { status, error, handleSubmit } = useLeadSubmit("/api/contact", (form) => ({
    name: String(form.get("name") || ""),
    phone: String(form.get("phone") || ""),
    email: String(form.get("email") || ""),
    destination: String(form.get("destination") || ""),
    travelMonth: String(form.get("travelMonth") || ""),
    travellers: Number(form.get("travellers") || 2),
    budget: String(form.get("budget") || ""),
    message: String(form.get("message") || ""),
    consent: form.get("consent") === "on",
    company: String(form.get("company") || ""),
  }));

  if (status === "success") {
    return (
      <div className="card p-6" role="status">
        <h3 className="font-semibold text-foreground">Enquiry sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out — a trip planner will call or WhatsApp you, usually within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <h3 className="text-lg font-semibold text-foreground">Plan your trip</h3>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" name="name" required autoComplete="name" />
        <FormField
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 98765 43210"
        />
        <FormField label="Email" name="email" type="email" required autoComplete="email" />
        <FormField label="Destination" name="destination" as="select" defaultValue={defaultDestination}>
          <option value="">Select a destination</option>
          <option value="not-sure">Not sure yet — suggest something</option>
          <optgroup label="India">
            {domestic.map(({ slug, name }) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </optgroup>
          <optgroup label="International">
            {international.map(({ slug, name }) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </optgroup>
        </FormField>
        <FormField label="Travel month" name="travelMonth" type="month" />
        <FormField label="Travellers" name="travellers" type="number" min={1} max={50} defaultValue={2} />
      </div>

      <FormField label="Budget" name="budget" as="select" defaultValue="">
        <option value="">Prefer not to say</option>
        {budgetOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </FormField>
      <FormField
        label="Anything else?"
        name="message"
        as="textarea"
        placeholder="Hotels you like, places you want to see, special occasions…"
      />

      <ConsentCheckbox />

      {status === "error" && error && <LeadFormError message={error.message} whatsapp={error.whatsapp} />}

      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
