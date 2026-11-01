"use client";

import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { useLeadSubmit } from "@/components/shared/useLeadSubmit";

export function NewsletterForm() {
  const { status, error, handleSubmit } = useLeadSubmit("/api/newsletter", (form) => ({
    email: String(form.get("email") || ""),
    company: String(form.get("company") || ""),
  }));

  if (status === "success") {
    return <p className="text-sm text-brand-100">You&rsquo;re subscribed — thanks for joining us.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="newsletter-company">Company</label>
        <input id="newsletter-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex-1">
        <FormField
          label="Email address"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          error={status === "error" ? error?.message : undefined}
          className="[&_.field-label]:text-brand-100 [&_.field-error]:text-accent-500"
        />
      </div>
      <Button type="submit" variant="accent" disabled={status === "loading"} className="sm:mt-7">
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
