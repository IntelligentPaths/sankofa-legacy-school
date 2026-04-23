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

export async function POST(req: NextRequest) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !notificationEmail) {
    return NextResponse.json(
      { success: false, error: "Email service not configured." },
      { status: 500 }
    );
  }

  let body: {
    parentName?: string;
    email?: string;
    childGrade?: string;
    howHeard?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parentName = (body.parentName || "").trim();
  const email = (body.email || "").trim();
  const childGrade = (body.childGrade || "").trim();
  const howHeard = (body.howHeard || "").trim();

  if (!parentName || !email || !childGrade) {
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

  sgMail.setApiKey(apiKey);

  const subject = `New Sankofa interest: ${parentName} (${childGrade})`;
  const plain = `New founding cohort interest from the Sankofa website.

Parent Name: ${parentName}
Email: ${email}
Child's Grade: ${childGrade}
How they heard: ${howHeard || "(not provided)"}
`;
  const html = `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; color:#1C1B20; background:#FAF6EE; padding:24px; border-radius:4px;">
      <h2 style="color:#B22714; margin:0 0 16px;">New Sankofa interest</h2>
      <p style="margin:0 0 8px;"><strong>Parent Name:</strong> ${escapeHtml(parentName)}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px;"><strong>Child's Grade:</strong> ${escapeHtml(childGrade)}</p>
      <p style="margin:0 0 8px;"><strong>How they heard:</strong> ${escapeHtml(howHeard || "(not provided)")}</p>
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
