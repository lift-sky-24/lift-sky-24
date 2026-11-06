import { NextResponse } from "next/server";

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
    const webhookReady = webhookUrl && webhookUrl.startsWith("https://script.google.com");

    if (!webhookReady) {
      // Webhook not configured yet — log and return success so form still works
      console.warn("[contact] GOOGLE_SHEET_WEBHOOK not set or invalid. Data:", { name, email, details });
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
