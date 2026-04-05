import { Resend } from "resend";

import {
  renderOrganizationInvitationEmail,
  renderResetPasswordEmail,
  renderVerificationEmail,
} from "@/lib/email/templates";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

function getFromAddress() {
  const from = process.env.RESEND_FROM?.trim();

  if (!from) {
    throw new Error("RESEND_FROM is not configured");
  }

  return from;
}

type SendAuthEmailInput = {
  to: string;
  subject: string;
  html: string;
};

async function sendAuthEmail({ to, subject, html }: SendAuthEmailInput) {
  const resend = getResendClient();

  await resend.emails.send({
    from: getFromAddress(),
    to,
    subject,
    html,
  });
}

export async function sendVerificationEmail(to: string, url: string) {
  await sendAuthEmail({
    to,
    subject: "Verify your Genesis account",
    html: renderVerificationEmail(url),
  });
}

export async function sendResetPasswordEmail(to: string, url: string) {
  await sendAuthEmail({
    to,
    subject: "Reset your Genesis password",
    html: renderResetPasswordEmail(url),
  });
}

type SendOrganizationInvitationEmailInput = {
  to: string;
  invitedByEmail: string;
  invitedByName: string;
  invitationId: string;
  organizationName: string;
  role: string;
};

function getAppUrl() {
  return (
    process.env.BETTER_AUTH_URL?.trim() ??
    process.env.NEXT_PUBLIC_APP_URL?.trim() ??
    "http://localhost:3000"
  );
}

export async function sendOrganizationInvitationEmail({
  to,
  invitedByEmail,
  invitedByName,
  invitationId,
  organizationName,
  role,
}: SendOrganizationInvitationEmailInput) {
  await sendAuthEmail({
    to,
    subject: `Join ${organizationName} on Genesis`,
    html: renderOrganizationInvitationEmail({
      inviteLink: `${getAppUrl()}/accept-invitation/${invitationId}`,
      invitedByEmail,
      invitedByName,
      organizationName,
      role,
    }),
  });
}

export function verifyResendWebhookSignature(payload: string, headers: {
  id: string;
  timestamp: string;
  signature: string;
}) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();

  if (!webhookSecret) {
    throw new Error("RESEND_WEBHOOK_SECRET is not configured");
  }

  const resend = getResendClient();

  return resend.webhooks.verify({
    payload,
    headers,
    webhookSecret,
  });
}
