import { MessageCircle } from "lucide-react";

/** Error line for the lead forms, with a WhatsApp fallback when the server could not deliver. */
export function LeadFormError({ message, whatsapp }: { message: string; whatsapp?: string }) {
  return (
    <div className="field-error space-y-2" role="alert">
      <p>{message}</p>
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Message us on WhatsApp
        </a>
      )}
    </div>
  );
}
