import type { Lead } from "@/lib/leads";

const TIMEOUT_MS = 5000;

/**
 * Appends a lead as a row in the client's Google Sheet via a Google Apps Script web app
 * (see scripts/leads-sheet.gs and docs/leads-setup.md). The script checks the shared secret
 * so the public web-app URL alone cannot be used to write rows.
 */
export async function appendLeadToSheet(lead: Lead) {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL;
  if (!url) throw new Error("LEADS_SHEET_WEBHOOK_URL is not set");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      // Apps Script web apps reject CORS preflights; text/plain keeps this a "simple" request.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: process.env.LEADS_SHEET_SECRET ?? "", lead }),
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });
    const text = await res.text();
    let result: { ok?: boolean; error?: string } = {};
    try {
      result = JSON.parse(text);
    } catch {
      // Apps Script returns an HTML error page when the deployment is misconfigured.
    }
    if (!res.ok || !result.ok) {
      throw new Error(`Sheet webhook rejected the lead (HTTP ${res.status}): ${result.error ?? text.slice(0, 200)}`);
    }
  } finally {
    clearTimeout(timer);
  }
}
