import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Receives form data and appends a row to Google Sheets via
 * a Google Apps Script Web App URL (stored in env var).
 *
 * Setup steps (do this once):
 * 1. Open a new Google Sheet.
 * 2. Extensions → Apps Script → paste the script from /docs/google-apps-script.js
 * 3. Deploy → New deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL and add it to .env.local:
 *    GOOGLE_SHEET_WEBHOOK=https://script.google.com/macros/s/YOUR_ID/exec
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, details } = body;

    // Basic server-side validation
    if (!name || name.trim().length < 2)
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    if (!details || details.trim().length < 10)
      return NextResponse.json({ error: "Message too short." }, { status: 400 });

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

    if (!webhookUrl) {
      // Dev mode — log and return success so form still works locally
      console.warn("[contact] GOOGLE_SHEET_WEBHOOK not set. Data:", { name, email, details });
      return NextResponse.json({ success: true, dev: true });
    }

    const payload = {
      name:      name.trim(),
      email:     email.trim().toLowerCase(),
      details:   details.trim(),
      timestamp: new Date().toISOString(),
      source:    "liftsky24.com contact form",
    };

    const res = await fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("[contact] Sheets webhook error:", res.status, await res.text());
      return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
