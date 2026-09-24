import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type LeadPayload = {
  name?: unknown;
  whatsapp?: unknown;
  email?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidWhatsApp(value: string): boolean {
  const cleaned = value.replace(/[\s()-]/g, "");
  return /^\+?[1-9]\d{7,14}$/.test(cleaned);
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "there";
}

/** Readable stamp for sheets/emails, e.g. "24 Sep 2026, 4:47 PM" */
function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  }).format(date);
}

/** Force text in Google Sheets so +92... is not treated as a formula */
function sheetSafeWhatsApp(value: string): string {
  return value.startsWith("+") ? `'${value}` : value;
}

function buildConfirmationEmailHtml({
  name,
  blueprintUrl,
}: {
  name: string;
  blueprintUrl: string;
}): string {
  const greetingName = firstName(name);

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your TriNurture Blueprint</title>
  </head>
  <body style="margin:0;padding:0;background:#FAF6F1;font-family:Georgia,'Times New Roman',serif;color:#3D3632;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6F1;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(61,54,50,0.06);">
            <tr>
              <td style="padding:36px 32px 12px;background:#E8F0E9;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B8F71;">
                  TriNurture
                </p>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.25;font-weight:700;color:#3D3632;">
                  Your blueprint is ready, ${greetingName}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#3D3632;">
                <p style="margin:0 0 16px;">
                  Thank you for caring enough to claim this guide. That already says so much about the kind of parent you are.
                </p>
                <p style="margin:0 0 16px;">
                  Your <strong>3-Pillar Research Blueprint</strong> is a warm, practical overview of how to nurture your child through:
                </p>
                <ul style="margin:0 0 16px;padding-left:20px;color:#6B635C;">
                  <li style="margin-bottom:8px;"><strong style="color:#3D3632;">Mind &amp; Curiosity</strong> — sparking wonder through play and discovery</li>
                  <li style="margin-bottom:8px;"><strong style="color:#3D3632;">Body &amp; Grit</strong> — building strength, movement, and resilience</li>
                  <li style="margin-bottom:8px;"><strong style="color:#3D3632;">Heart &amp; Social</strong> — growing empathy and connection</li>
                </ul>
                <p style="margin:0 0 28px;">
                  Your guide is <strong>attached to this email</strong> as a PDF —
                  open the attachment to download it.
                  Keep an eye on WhatsApp too — we&rsquo;ll follow up with care there as well.
                </p>
                ${
                  blueprintUrl
                    ? `<p style="margin:0 0 28px;text-align:center;">
                  <a href="${blueprintUrl}" style="display:inline-block;background:#C4785A;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 28px;border-radius:14px;">
                    Download Your Free Blueprint
                  </a>
                </p>`
                    : ""
                }
                <p style="margin:0 0 8px;color:#6B635C;font-size:15px;">
                  With warmth,<br />
                  The TriNurture team
                </p>
              </td>
            </tr>
            ${
              blueprintUrl
                ? `<tr>
              <td style="padding:8px 32px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#6B635C;">
                If the button doesn&rsquo;t work, copy and paste this link into your browser:<br />
                <a href="${blueprintUrl}" style="color:#6B8F71;word-break:break-all;">${blueprintUrl}</a>
              </td>
            </tr>`
                : ""
            }
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}

function buildOwnerNotificationHtml({
  name,
  whatsapp,
  email,
  submittedAt,
}: {
  name: string;
  whatsapp: string;
  email: string;
  submittedAt: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>New TriNurture lead</title>
  </head>
  <body style="margin:0;padding:24px;background:#FAF6F1;font-family:Arial,Helvetica,sans-serif;color:#3D3632;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px;box-shadow:0 8px 30px rgba(61,54,50,0.06);">
      <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B8F71;">
        TriNurture
      </p>
      <h1 style="margin:12px 0 20px;font-size:22px;line-height:1.3;">
        New lead just claimed the Blueprint
      </h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;line-height:1.6;">
        <tr>
          <td style="padding:8px 0;color:#6B635C;width:120px;">Name</td>
          <td style="padding:8px 0;font-weight:700;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B635C;">WhatsApp</td>
          <td style="padding:8px 0;font-weight:700;">${whatsapp}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B635C;">Email</td>
          <td style="padding:8px 0;font-weight:700;">
            <a href="mailto:${email}" style="color:#6B8F71;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B635C;">Submitted</td>
          <td style="padding:8px 0;">${submittedAt}</td>
        </tr>
      </table>
      <p style="margin:24px 0 0;font-size:14px;color:#6B635C;">
        Follow up on WhatsApp when you&rsquo;re ready — the parent also received the Blueprint email.
      </p>
    </div>
  </body>
</html>
`.trim();
}

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const whatsapp =
    typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || !whatsapp || !email) {
    return NextResponse.json(
      { error: "Name, WhatsApp number, and email are required." },
      { status: 400 },
    );
  }

  if (!isValidWhatsApp(whatsapp)) {
    return NextResponse.json(
      { error: "Please enter a valid WhatsApp number with country code." },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const sheetDbUrl = process.env.SHEETDB_API_URL?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const blueprintUrl = process.env.BLUEPRINT_PDF_URL?.trim();
  const notifyEmail = process.env.NOTIFY_EMAIL?.trim();

  const missing = [
    !resendApiKey && "RESEND_API_KEY",
    !fromEmail && "RESEND_FROM_EMAIL",
    !notifyEmail && "NOTIFY_EMAIL",
  ].filter(Boolean);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing.join(", "));
    return NextResponse.json(
      {
        error:
          "Lead capture is not configured yet. Please try again later.",
        missing,
      },
      { status: 500 },
    );
  }

  const submittedAt = formatSubmittedAt(new Date());

  try {
    if (sheetDbUrl) {
      const sheetResponse = await fetch(sheetDbUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp: sheetSafeWhatsApp(whatsapp),
          email,
          submitted_at: submittedAt,
        }),
      });

      if (!sheetResponse.ok) {
        const sheetError = await sheetResponse.text();
        console.error("SheetDB error:", sheetResponse.status, sheetError);
        return NextResponse.json(
          { error: "We couldn't save your details. Please try again." },
          { status: 502 },
        );
      }
    } else {
      console.warn(
        "SHEETDB_API_URL is not set — skipping Google Sheet save for this lead.",
      );
    }

    const resend = new Resend(resendApiKey!);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const pdfLink =
      blueprintUrl ||
      (siteUrl ? `${siteUrl}/blueprint.pdf` : undefined);

    let pdfAttachment: { filename: string; content: Buffer } | undefined;
    try {
      const pdfPath = path.join(process.cwd(), "public", "blueprint.pdf");
      const pdfContent = await readFile(pdfPath);
      pdfAttachment = {
        filename: "TriNurture-3-Pillar-Research-Blueprint.pdf",
        content: pdfContent,
      };
    } catch (error) {
      console.warn("Could not load public/blueprint.pdf for email attachment:", error);
    }

    // Owner notification first — this is the address that must work in Resend test mode.
    const { error: notifyError } = await resend.emails.send({
      from: fromEmail!,
      to: notifyEmail!,
      subject: `New TriNurture lead: ${name}`,
      html: buildOwnerNotificationHtml({
        name,
        whatsapp,
        email,
        submittedAt,
      }),
    });

    if (notifyError) {
      console.error("Resend owner notification error:", notifyError);
      return NextResponse.json(
        {
          error:
            "We couldn't send the notification email. In Resend test mode, NOTIFY_EMAIL must be your Resend account email (check the terminal error for the allowed address).",
        },
        { status: 502 },
      );
    }

    // Parent blueprint email — may fail in Resend test mode if address ≠ account email.
    const { error: confirmationError } = await resend.emails.send({
      from: fromEmail!,
      to: email,
      subject: "Your TriNurture 3-Pillar Research Blueprint 💛",
      html: buildConfirmationEmailHtml({
        name,
        blueprintUrl: pdfLink ?? "",
      }),
      attachments: pdfAttachment ? [pdfAttachment] : undefined,
    });

    if (confirmationError) {
      console.warn(
        "Parent confirmation email skipped/failed (common in Resend test mode without a verified domain):",
        confirmationError,
      );
    }

    return NextResponse.json({
      success: true,
      parentEmailSent: !confirmationError,
    });
  } catch (error) {
    console.error("Lead capture failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 },
    );
  }
}
