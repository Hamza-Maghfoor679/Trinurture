import { NextResponse } from "next/server";
import { Resend } from "resend";

type OrderPayload = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidWhatsApp(value: string): boolean {
  const cleaned = value.replace(/[\s()-]/g, "");
  return /^\+?[1-9]\d{7,14}$/.test(cleaned);
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "there";
}

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

function sheetSafeWhatsApp(value: string): string {
  return value.startsWith("+") ? `'${value}` : value;
}

/** Turn plain-text env blocks into safe HTML paragraphs/line breaks. */
function formatDetailsBlock(text: string): string {
  return text
    .trim()
    .split(/\n+/)
    .map(
      (line) =>
        `<p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#3D3632;">${escapeHtml(line)}</p>`,
    )
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCustomerOrderEmailHtml({
  name,
  bankDetails,
  walletDetails,
  businessWhatsApp,
}: {
  name: string;
  bankDetails: string;
  walletDetails: string;
  businessWhatsApp: string;
}): string {
  const greetingName = firstName(name);
  const whatsappDigits = businessWhatsApp.replace(/[^\d+]/g, "");
  const whatsappHref = `https://wa.me/${whatsappDigits.replace(/^\+/, "")}`;

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TriNurture Activity Pack — Payment Details</title>
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
                <h1 style="margin:12px 0 0;font-size:26px;line-height:1.25;font-weight:700;color:#3D3632;">
                  Your Activity Pack is reserved, ${greetingName}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#3D3632;">
                <p style="margin:0 0 16px;">
                  Thank you for choosing the <strong>TriNurture Activity Pack</strong>
                  (90 activities + bonus Growth Tracker Journal) for <strong>PKR 999</strong>.
                </p>
                <p style="margin:0 0 16px;">
                  Payment is simple — choose whichever feels easiest for you:
                </p>

                <h2 style="margin:24px 0 10px;font-size:17px;color:#3D3632;">Bank transfer</h2>
                <div style="background:#FAF6F1;border-radius:14px;padding:16px 18px;margin-bottom:20px;">
                  ${formatDetailsBlock(bankDetails)}
                </div>

                <h2 style="margin:8px 0 10px;font-size:17px;color:#3D3632;">JazzCash / Easypaisa</h2>
                <div style="background:#FAF6F1;border-radius:14px;padding:16px 18px;margin-bottom:24px;">
                  ${formatDetailsBlock(walletDetails)}
                </div>

                <p style="margin:0 0 16px;">
                  After you pay, please <strong>reply to this email</strong> with your
                  transaction ID or screenshot — or send it on WhatsApp to
                  <a href="${whatsappHref}" style="color:#6B8F71;font-weight:700;">${escapeHtml(businessWhatsApp)}</a>.
                </p>
                <p style="margin:0 0 16px;">
                  Once we confirm payment, we&rsquo;ll send your Activity Pack and
                  Growth Tracker Journal within <strong>24 hours</strong>.
                </p>
                <p style="margin:0 0 8px;color:#6B635C;font-size:15px;">
                  With warmth,<br />
                  The TriNurture team
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}

function buildOwnerOrderNotificationHtml({
  name,
  email,
  whatsapp,
  submittedAt,
}: {
  name: string;
  email: string;
  whatsapp: string;
  submittedAt: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>New Activity Pack order</title>
  </head>
  <body style="margin:0;padding:24px;background:#FAF6F1;font-family:Arial,Helvetica,sans-serif;color:#3D3632;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px;box-shadow:0 8px 30px rgba(61,54,50,0.06);">
      <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B8F71;">
        TriNurture
      </p>
      <h1 style="margin:12px 0 8px;font-size:22px;line-height:1.3;">
        New Activity Pack order (pending payment)
      </h1>
      <p style="margin:0 0 20px;color:#6B635C;font-size:14px;">
        Expect a payment confirmation from this parent soon.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;line-height:1.6;">
        <tr>
          <td style="padding:8px 0;color:#6B635C;width:120px;">Name</td>
          <td style="padding:8px 0;font-weight:700;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B635C;">Email</td>
          <td style="padding:8px 0;font-weight:700;">
            <a href="mailto:${escapeHtml(email)}" style="color:#6B8F71;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B635C;">WhatsApp</td>
          <td style="padding:8px 0;font-weight:700;">${escapeHtml(whatsapp)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B635C;">Status</td>
          <td style="padding:8px 0;">pending_payment</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6B635C;">Submitted</td>
          <td style="padding:8px 0;">${escapeHtml(submittedAt)}</td>
        </tr>
      </table>
    </div>
  </body>
</html>
`.trim();
}

export async function POST(request: Request) {
  let body: OrderPayload;

  try {
    body = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const whatsapp =
    typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";

  if (!name || !email || !whatsapp) {
    return NextResponse.json(
      { error: "Name, email, and WhatsApp number are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!isValidWhatsApp(whatsapp)) {
    return NextResponse.json(
      { error: "Please enter a valid WhatsApp number with country code." },
      { status: 400 },
    );
  }

  const ordersSheetUrl = process.env.ORDERS_SHEETDB_API_URL?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "TriNurture <info@trinurture.com>";
  const notifyEmail = process.env.NOTIFY_EMAIL?.trim();
  const bankDetails = process.env.PAYMENT_BANK_DETAILS?.trim();
  const walletDetails = process.env.PAYMENT_MOBILE_WALLET_DETAILS?.trim();
  const businessWhatsApp = process.env.BUSINESS_WHATSAPP_NUMBER?.trim();

  const missing = [
    !ordersSheetUrl && "ORDERS_SHEETDB_API_URL",
    !resendApiKey && "RESEND_API_KEY",
    !notifyEmail && "NOTIFY_EMAIL",
    !bankDetails && "PAYMENT_BANK_DETAILS",
    !walletDetails && "PAYMENT_MOBILE_WALLET_DETAILS",
    !businessWhatsApp && "BUSINESS_WHATSAPP_NUMBER",
  ].filter(Boolean);

  if (missing.length > 0) {
    console.error("Missing order env vars:", missing.join(", "));
    return NextResponse.json(
      {
        error: "Orders are not configured yet. Please try again later.",
        missing,
      },
      { status: 500 },
    );
  }

  const submittedAt = formatSubmittedAt(new Date());

  try {
    const sheetResponse = await fetch(ordersSheetUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        whatsapp: sheetSafeWhatsApp(whatsapp),
        submitted_at: submittedAt,
        status: "pending_payment",
      }),
    });

    if (!sheetResponse.ok) {
      const sheetError = await sheetResponse.text();
      console.error("Orders SheetDB error:", sheetResponse.status, sheetError);
      return NextResponse.json(
        { error: "We couldn't save your order. Please try again." },
        { status: 502 },
      );
    }

    const resend = new Resend(resendApiKey!);

    const { error: customerEmailError } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Your TriNurture Activity Pack — Payment Details Inside",
      html: buildCustomerOrderEmailHtml({
        name,
        bankDetails: bankDetails!,
        walletDetails: walletDetails!,
        businessWhatsApp: businessWhatsApp!,
      }),
    });

    if (customerEmailError) {
      console.error("Resend order customer email error:", customerEmailError);
      const resendMessage =
        typeof customerEmailError === "object" &&
        customerEmailError &&
        "message" in customerEmailError &&
        typeof customerEmailError.message === "string"
          ? customerEmailError.message
          : null;
      return NextResponse.json(
        {
          error:
            resendMessage ??
            "We saved your order, but couldn't send the payment email. Please try again.",
        },
        { status: 502 },
      );
    }

    const { error: notifyError } = await resend.emails.send({
      from: fromEmail,
      to: notifyEmail!,
      subject: `New Activity Pack order: ${name}`,
      html: buildOwnerOrderNotificationHtml({
        name,
        email,
        whatsapp,
        submittedAt,
      }),
    });

    if (notifyError) {
      console.error("Resend order owner notification error:", notifyError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order capture failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 },
    );
  }
}
