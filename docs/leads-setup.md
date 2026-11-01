# Enquiry handling — setup

Every enquiry (contact form, tour booking request, newsletter sign-up) is sent to:

1. **Email**: the team inbox, via [Resend](https://resend.com).
2. **Google Sheet**: a row in a sheet the business owns, with **Status** and **Notes** columns for follow-up.

Either one is enough for a lead to count as received. If both fail, the visitor sees an error with the
phone number and a WhatsApp link. A live site never shows "sent" for an enquiry that went nowhere.

## 1. Google Sheet (about 5 minutes)

1. Create a new Google Sheet, for example "Adventophile Enquiries", in the business Google account.
2. Open **Extensions → Apps Script**, delete the sample code, and paste in `scripts/leads-sheet.gs`.
3. Open **Project Settings** (gear icon) and add a script property:
   - name: `LEADS_SHEET_SECRET`
   - value: a long random string (for example the output of `openssl rand -hex 24`)
4. Click **Deploy → New deployment → Web app**, with:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Authorise when Google asks, then copy the **Web app URL** (it ends in `/exec`).
5. Add both values to the site's environment (`.env.local` locally, or the hosting provider's
   environment variables, e.g. Vercel → Settings → Environment Variables):

   ```
   LEADS_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
   LEADS_SHEET_SECRET=<same value as the script property>
   ```

The script creates an **Enquiries** tab and a **Newsletter** tab on the first submission. Share the sheet only
with staff who handle enquiries.

If you edit the script later, use **Deploy → Manage deployments → Edit → New version**. That keeps the
same URL.

## 2. Email (Resend)

1. Create a Resend account and verify the sending domain (`adventophile.com`). This needs DNS records.
2. Set:
   ```
   RESEND_API_KEY=re_…
   CONTACT_TO_EMAIL=info@adventophile.com
   CONTACT_FROM_EMAIL=Adventophile Holidays <enquiries@adventophile.com>
   ```

Each email's subject carries the enquiry ID (for example `[Enquiry #a1b2c3d4]`), which matches the **ID**
column in the sheet. Replying to the email goes straight to the visitor.

## Day-to-day

- Work from the sheet: set **Status** (New → Contacted → Quoted → Booked / Lost) and add **Notes**.
- Delete someone's rows if they ask for their data to be removed (see the privacy policy).
