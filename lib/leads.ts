import { NextResponse } from "next/server";
import type { z } from "zod";
import { site } from "@/lib/site";
import { appendLeadToSheet } from "@/lib/sheets";

export type LeadSource = "contact" | "booking" | "newsletter";

export interface Lead {
  /** Short id shown in the sheet row, handy when talking about a specific enquiry. */
  id: string;
  /** India time, e.g. "2026-11-01 14:05". */
  receivedAt: string;
  source: LeadSource;
  page: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelMonth: string;
  travellers: string;
  budget: string;
  tour: string;
  message: string;
}

export type LeadFields = Omit<Lead, "id" | "receivedAt">;

function istTimestamp(date = new Date()): string {
  // en-CA formats as YYYY-MM-DD, which sorts correctly in a spreadsheet.
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
}

/**
 * Records a lead in the Google Sheet. The sheet is the only copy, so a failed write is retried
 * once (a rare duplicate row is better than a lost enquiry); throws if both attempts fail.
 */
export async function submitLead(fields: LeadFields): Promise<Lead> {
  const lead: Lead = {
    ...fields,
    id: crypto.randomUUID().replace(/-/g, "").slice(0, 8),
    receivedAt: istTimestamp(),
  };

  if (!process.env.LEADS_SHEET_WEBHOOK_URL) {
    if (process.env.NODE_ENV === "production") {
      // Never tell a visitor "sent" when the lead went nowhere.
      throw new Error("LEADS_SHEET_WEBHOOK_URL is not set — enquiries have nowhere to go.");
    }
    console.warn("[leads] LEADS_SHEET_WEBHOOK_URL not set — logging lead instead of saving it.\n", lead);
    return lead;
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await appendLeadToSheet(lead);
      return lead;
    } catch (error) {
      console.error(`[leads] sheet delivery failed for ${lead.id} (attempt ${attempt})`, error);
    }
  }
  throw new Error(`Could not save lead ${lead.id} to the sheet`);
}

const MAX_BODY_BYTES = 10_000;
/** Anything submitted faster than this after the form was first shown is almost certainly a bot. */
const MIN_FILL_MS = 3000;

const whatsappHref = `https://wa.me/${site.phone.replace(/[^\d]/g, "")}`;

/**
 * Shared POST handler for the lead forms: size cap, JSON parsing, validation, spam traps,
 * delivery and the visitor-facing error message.
 */
export async function handleLeadRequest<S extends z.ZodType<{ company: string; elapsedMs?: number }>>(
  request: Request,
  schema: S,
  toLead: (data: z.infer<S>) => LeadFields,
  logTag: string
) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That message is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const { company, elapsedMs } = parsed.data;
  const tooFast = typeof elapsedMs === "number" && elapsedMs < MIN_FILL_MS;
  // Spam traps: pretend success so bots get no signal.
  if (company || tooFast) {
    return NextResponse.json({ ok: true });
  }

  try {
    const lead = await submitLead(toLead(parsed.data));
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error(`[${logTag}] lead delivery failed`, error);
    return NextResponse.json(
      {
        error: `We could not send this right now. Please call or WhatsApp us on ${site.phone} and we will help straight away.`,
        phone: site.phone,
        whatsapp: whatsappHref,
      },
      { status: 502 }
    );
  }
}
