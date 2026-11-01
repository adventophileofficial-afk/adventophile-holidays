import { NextResponse } from "next/server";
import type { z } from "zod";
import { site } from "@/lib/site";
import { sendLeadEmail } from "@/lib/email";
import { appendLeadToSheet } from "@/lib/sheets";

export type LeadSource = "contact" | "booking" | "newsletter";

export interface Lead {
  /** Short id shown in the email subject and the sheet row, so the two can be matched up. */
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

/** Human-readable label/value pairs, shared by the email body and the sheet columns. */
export function leadToRows(lead: Lead): [label: string, value: string][] {
  return [
    ["Enquiry ID", lead.id],
    ["Received", lead.receivedAt],
    ["Source", lead.source],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Destination", lead.destination],
    ["Travel month", lead.travelMonth],
    ["Travellers", lead.travellers],
    ["Budget", lead.budget],
    ["Tour", lead.tour],
    ["Message", lead.message],
    ["Page", lead.page],
  ];
}

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

function subjectFor(lead: Lead): string {
  const tag = `[${lead.source === "booking" ? "Booking" : lead.source === "newsletter" ? "Newsletter" : "Enquiry"} #${lead.id}]`;
  if (lead.source === "newsletter") return `${tag} New subscriber: ${lead.email}`;
  const what = lead.tour || lead.destination || "Trip enquiry";
  const who = lead.travellers ? `${lead.name}, ${lead.travellers} travellers` : lead.name;
  return `${tag} ${what} — ${who}`;
}

/**
 * Delivers a lead to every configured sink (email + Google Sheet) in parallel. The lead is
 * considered safe if at least one sink accepted it; throws only when all of them failed.
 */
export async function submitLead(fields: LeadFields): Promise<Lead> {
  const lead: Lead = {
    ...fields,
    id: crypto.randomUUID().replace(/-/g, "").slice(0, 8),
    receivedAt: istTimestamp(),
  };

  const hasEmail = Boolean(process.env.RESEND_API_KEY);
  const hasSheet = Boolean(process.env.LEADS_SHEET_WEBHOOK_URL);

  if (!hasEmail && !hasSheet) {
    if (process.env.NODE_ENV === "production") {
      // Never tell a visitor "sent" when the lead went nowhere.
      throw new Error("No lead destination configured (set RESEND_API_KEY and/or LEADS_SHEET_WEBHOOK_URL).");
    }
    console.warn("[leads] No email or sheet configured — logging lead instead of delivering it.\n", lead);
    return lead;
  }

  const tasks: Promise<unknown>[] = [];
  const names: string[] = [];
  if (hasEmail) {
    tasks.push(sendLeadEmail({ subject: subjectFor(lead), replyTo: lead.email, rows: leadToRows(lead) }));
    names.push("email");
  }
  if (hasSheet) {
    tasks.push(appendLeadToSheet(lead));
    names.push("sheet");
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[leads] ${names[i]} delivery failed for ${lead.id}`, result.reason);
    }
  });

  if (results.every((result) => result.status === "rejected")) {
    throw new Error(`All lead destinations failed for ${lead.id}`);
  }
  return lead;
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
