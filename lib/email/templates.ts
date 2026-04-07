/**
 * Transactional HTML email templates. Colors and layout use inline `style` attributes
 * because many clients ignore linked stylesheets and external CSS. These values are
 * intentionally **not** wired to `app/globals.css` theme tokens; when refreshing
 * brand colors, update this file alongside the web app for visual parity.
 */
type AuthEmailTemplateInput = {
  actionLabel: string;
  actionUrl: string;
  heading: string;
  previewText: string;
  supportingText: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderShell({
  actionLabel,
  actionUrl,
  heading,
  previewText,
  supportingText,
}: AuthEmailTemplateInput) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(heading)}</title>
      </head>
      <body style="margin:0;background:#0f1115;padding:32px 16px;color:#f7f8fa;font-family:Georgia,'Times New Roman',serif;">
        <div style="margin:0 auto;max-width:560px;border:1px solid rgba(255,255,255,0.12);border-radius:24px;background:linear-gradient(180deg,rgba(22,26,34,0.98),rgba(12,14,20,0.98));padding:32px;box-shadow:0 18px 50px rgba(0,0,0,0.35);">
          <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#9aa3b2;">
            Genesis
          </p>
          <h1 style="margin:0 0 14px;font-size:32px;line-height:1.15;font-weight:600;color:#ffffff;">
            ${escapeHtml(heading)}
          </h1>
          <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#c8d0db;">
            ${escapeHtml(supportingText)}
          </p>
          <a
            href="${escapeHtml(actionUrl)}"
            style="display:inline-block;border-radius:999px;background:#f7f8fa;padding:14px 20px;color:#0f1115;font-size:14px;font-weight:700;letter-spacing:0.04em;text-decoration:none;"
          >
            ${escapeHtml(actionLabel)}
          </a>
          <p style="margin:28px 0 12px;font-size:13px;line-height:1.7;color:#9aa3b2;">
            ${escapeHtml(previewText)}
          </p>
          <p style="margin:0;font-size:12px;line-height:1.6;color:#7f8794;word-break:break-all;">
            ${escapeHtml(actionUrl)}
          </p>
        </div>
      </body>
    </html>
  `;
}

export function renderVerificationEmail(url: string) {
  return renderShell({
    actionLabel: "Verify email",
    actionUrl: url,
    heading: "Confirm your email address",
    previewText: "If the button does not work, open the link below in your browser.",
    supportingText:
      "Verify your email to activate your Genesis account and continue into your workspace.",
  });
}

export function renderResetPasswordEmail(url: string) {
  return renderShell({
    actionLabel: "Reset password",
    actionUrl: url,
    heading: "Reset your password",
    previewText: "If you did not request this, you can safely ignore this email.",
    supportingText:
      "Use the secure link below to choose a new password for your Genesis account.",
  });
}

type OrganizationInvitationEmailInput = {
  inviteLink: string;
  invitedByEmail: string;
  invitedByName: string;
  organizationName: string;
  role: string;
};

export function renderOrganizationInvitationEmail({
  inviteLink,
  invitedByEmail,
  invitedByName,
  organizationName,
  role,
}: OrganizationInvitationEmailInput) {
  return renderShell({
    actionLabel: "Accept invitation",
    actionUrl: inviteLink,
    heading: `Join ${organizationName}`,
    previewText:
      "Sign in with the invited email address before accepting your organization invitation.",
    supportingText: `${invitedByName} (${invitedByEmail}) invited you to join ${organizationName} as ${role}.`,
  });
}
