import { Resend } from "resend";
import { site } from "@/lib/site";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendLeadEmailInput {
  subject: string;
  replyTo: string;
  /** Label/value pairs from leadToRows(); empty values are skipped. */
  rows: [label: string, value: string][];
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderLeadEmail(rows: SendLeadEmailInput["rows"]) {
  const filled = rows.filter(([, value]) => value);
  const text = filled.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${filled
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="color:#555;padding-right:16px">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("")}</table>`;
  return { text, html };
}

/** Sends a lead-notification email to the team via Resend. Throws if Resend is not configured. */
export async function sendLeadEmail({ subject, replyTo, rows }: SendLeadEmailInput) {
  if (!resend) throw new Error("RESEND_API_KEY is not set");

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;
  const { text, html } = renderLeadEmail(rows);

  const { data, error } = await resend.emails.send({ from, to, replyTo, subject, html, text });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
