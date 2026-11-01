/**
 * Adventophile Holidays — enquiry log.
 *
 * Paste into the Google Sheet's Extensions → Apps Script editor and deploy as a web app
 * (Execute as: Me, Who has access: Anyone). Full steps: docs/leads-setup.md.
 *
 * The website (lib/sheets.ts) POSTs { secret, lead } here. Enquiries and bookings go to the
 * "Enquiries" tab, newsletter sign-ups to "Newsletter". Status and Notes are left blank for
 * the team to fill in while following up.
 *
 * Set the secret in Project Settings → Script properties as LEADS_SHEET_SECRET (same value as
 * the website's LEADS_SHEET_SECRET env var) — it is not stored in this code.
 */

var ENQUIRY_HEADERS = [
  "Received", "ID", "Source", "Name", "Phone", "Email", "Destination", "Travel month",
  "Travellers", "Budget", "Tour", "Message", "Page", "Status", "Notes",
];
var NEWSLETTER_HEADERS = ["Received", "ID", "Email", "Page"];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty("LEADS_SHEET_SECRET");
    if (!secret || body.secret !== secret) return reply({ ok: false, error: "Unauthorized" });

    var lead = body.lead || {};
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (lead.source === "newsletter") {
        sheet("Newsletter", NEWSLETTER_HEADERS).appendRow(
          clean([lead.receivedAt, lead.id, lead.email, lead.page])
        );
      } else {
        sheet("Enquiries", ENQUIRY_HEADERS).appendRow(
          clean([
            lead.receivedAt, lead.id, lead.source, lead.name, lead.phone, lead.email,
            lead.destination, lead.travelMonth, lead.travellers, lead.budget, lead.tour,
            lead.message, lead.page, "New", "",
          ])
        );
      }
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Returns the named tab, creating it with a frozen bold header row the first time. */
function sheet(name, headers) {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var tab = book.getSheetByName(name);
  if (!tab) {
    tab = book.insertSheet(name);
    tab.appendRow(headers);
    tab.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    tab.setFrozenRows(1);
  }
  return tab;
}

/**
 * Stores every value as plain text. A leading ' stops values such as "=HYPERLINK(...)" typed
 * into the form from being run as spreadsheet formulas, and keeps "+91…" phone numbers intact.
 */
function clean(values) {
  return values.map(function (value) {
    var text = value === undefined || value === null ? "" : String(value);
    return /^[=+\-@]/.test(text) ? "'" + text : text;
  });
}

function reply(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
