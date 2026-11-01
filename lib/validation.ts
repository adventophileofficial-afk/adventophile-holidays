import { z } from "zod";
import { budgetOptions } from "@/lib/budget";

const budgetValues = budgetOptions.map((option) => option.value) as [string, ...string[]];

const name = z.string().trim().min(2, "Please enter your name.").max(120);
const email = z.string().trim().email("Please enter a valid email address.");
const phone = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s-]{7,19}$/, "Please enter a valid phone or WhatsApp number.");
const consent = z.literal(true, { message: "Please agree to be contacted about your enquiry." });
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

// Shared anti-spam fields. `company` is a honeypot (real users never fill it in; it is left
// unrestricted so a filled-in value doesn't surface a validation error to the bot), and
// `elapsedMs` is how long the visitor spent on the form (measured in the browser, so clock
// skew between client and server cannot drop real leads) — submissions faster than a human could
// type are dropped silently by the route handlers.
const antiSpam = {
  company: z.string().optional().default(""),
  elapsedMs: z.coerce.number().optional(),
};

export const contactSchema = z.object({
  name,
  email,
  phone,
  destination: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/)
    .max(60)
    .optional()
    .or(z.literal("")),
  travelMonth: z
    .string()
    .trim()
    .regex(/^(\d{4}-\d{2})?$/, "Please pick a travel month.")
    .optional(),
  travellers: z.coerce.number().int().min(1).max(50).default(2),
  budget: z.enum(budgetValues).optional().or(z.literal("")),
  message: optionalText(4000),
  page: optionalText(200),
  consent,
  ...antiSpam,
});

export const bookingSchema = z.object({
  name,
  email,
  phone,
  tourSlug: z.string().trim().min(1).max(120),
  tourTitle: z.string().trim().min(1).max(200),
  startDate: optionalText(40),
  guests: z.coerce.number().int().min(1).max(30).default(1),
  message: optionalText(4000),
  page: optionalText(200),
  consent,
  ...antiSpam,
});

export const newsletterSchema = z.object({
  email,
  page: optionalText(200),
  ...antiSpam,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
