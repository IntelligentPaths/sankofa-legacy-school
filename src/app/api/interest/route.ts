import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isValidPhone(s: string): boolean {
  // Same lenient pattern as the client
  return /^\+?\d[\d\s().\-]{8,17}\d$/.test(s);
}

type InterestPayload = {
  parentName?: string;
  childName?: string;
  email?: string;
  phone?: string;
  childGrade?: string;
  howHeard?: string;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !notificationEmail) {
    return NextResponse.json(
      { success: false, error: "Email service not configured." },
      { status: 500 }
    );
  }

  let body: InterestPayload;
  try {
    body = (await req.json()) as InterestPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parentName = (body.parentName ?? "").trim();
  const childName = (body.childName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const childGrade = (body.childGrade ?? "").trim();
  const howHeard = (body.howHeard ?? "").trim();

  if (
    !parentName ||
    !childName ||
    !email ||
    !phone ||
    !childGrade ||
    !howHeard
  ) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address." },
      { status: 400 }
    );
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { success: false, error: "Invalid phone number." },
      { status: 400 }
    );
  }

  sgMail.setApiKey(apiKey);

  const subject = `New Sankofa interest: ${parentName} (${childGrade})`;

  const plain = `New founding cohort interest from the Sankofa Legacy School website.

Parent Name: ${parentName}
Child's Name: ${childName}
Email: ${email}
Phone: ${phone}
Child's Grade: ${childGrade}
How they heard: ${howHeard}
`;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;color:#1C1B20;background:#FAF6EE;padding:24px;border-radius:4px;max-width:560px;">
      <div style="border-bottom:2px solid #FBCD32;padding-bottom:12px;margin-bottom:18px;">
        <h2 style="color:#B22714;margin:0;font-family:Georgia,serif;font-size:22px;">New Sankofa interest</h2>
        <p style="color:#381F00;margin:6px 0 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Founding Cohort · August 2026</p>
      </div>
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;font-size:14px;line-height:1.55;">
        <tr><td style="padding:6px 12px 6px 0;color:#E38C07;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;width:140px;vertical-align:top;">Parent Name</td><td style="padding:6px 0;"><strong>${escapeHtml(parentName)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#E38C07;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;vertical-align:top;">Child&#39;s Name</td><td style="padding:6px 0;"><strong>${escapeHtml(childName)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#E38C07;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;vertical-align:top;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#1C1B20;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#E38C07;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;vertical-align:top;">Phone</td><td style="padding:6px 0;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#E38C07;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;vertical-align:top;">Child&#39;s Grade</td><td style="padding:6px 0;">${escapeHtml(childGrade)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#E38C07;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;vertical-align:top;">How they heard</td><td style="padding:6px 0;">${escapeHtml(howHeard)}</td></tr>
      </table>
    </div>
  `;

  try {
    await sgMail.send({
      to: notificationEmail,
      from: notificationEmail,
      replyTo: email,
      subject,
      text: plain,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SendGrid error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send notification." },
      { status: 500 }
    );
  }
}
