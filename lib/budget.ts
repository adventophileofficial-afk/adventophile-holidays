// Kept separate from lib/validation.ts so the client-side enquiry form can import the
// options without pulling zod into the browser bundle.

/** Per-person budget bands offered on the enquiry form. */
export const budgetOptions = [
  { value: "under-25k", label: "Under ₹25,000 per person" },
  { value: "25k-50k", label: "₹25,000 – ₹50,000 per person" },
  { value: "50k-1l", label: "₹50,000 – ₹1,00,000 per person" },
  { value: "1l-plus", label: "Above ₹1,00,000 per person" },
] as const;
