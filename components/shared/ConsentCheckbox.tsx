import Link from "next/link";

/** Required consent to be contacted about an enquiry (see the privacy policy). */
export function ConsentCheckbox() {
  return (
    <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
      <input
        type="checkbox"
        name="consent"
        required
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand-600"
      />
      <span>
        I agree to be contacted by phone, WhatsApp or email about this enquiry. See our{" "}
        <Link href="/privacy" className="font-medium text-brand-600 hover:underline">
          privacy policy
        </Link>
        .
      </span>
    </label>
  );
}
