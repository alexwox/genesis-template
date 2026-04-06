import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import {
  sendOrganizationInvitationEmail as deliverOrganizationInvitationEmail,
  sendResetPasswordEmail as deliverResetPasswordEmail,
  sendVerificationEmail as deliverVerificationEmail,
} from "@/lib/email/resend";
import { captureServerEvent } from "@/lib/analytics/posthog-server";
import { AnalyticsEvents } from "@/lib/analytics/event-names";
import { ac, organizationRoles } from "@/lib/auth/permissions";
import { logger } from "@/lib/logger";

const authLogger = logger.child({
  scope: "auth",
});

function getRequiredEnv(name: "BETTER_AUTH_SECRET") {
  const value = process.env[name]?.trim();

  if (value) {
    return value;
  }

  throw new Error(
    `${name} is required. Generate one with \`openssl rand -base64 32\` and add it to your environment.`,
  );
}

function trackAuthEmailTask(
  task: "organization-invitation" | "password-reset" | "verification",
  promise: Promise<void>,
) {
  return promise.catch((caughtError: unknown) => {
    authLogger.error("Auth email delivery failed", {
      task,
      error:
        caughtError instanceof Error
          ? caughtError
          : new Error("Unknown auth email error"),
      rawError: caughtError instanceof Error ? undefined : caughtError,
    });

    throw caughtError;
  });
}

const betterAuthSecret = getRequiredEnv("BETTER_AUTH_SECRET");

const betterAuthUrl =
  process.env.BETTER_AUTH_URL?.trim() ??
  process.env.NEXT_PUBLIC_APP_URL?.trim() ??
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL: betterAuthUrl,
  secret: betterAuthSecret,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  advanced: {
    backgroundTasks: {
      handler: (promise) => {
        void promise;
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: ({ user, url }) => {
      return trackAuthEmailTask(
        "verification",
        deliverVerificationEmail(user.email, url),
      );
    },
    afterEmailVerification: async (user) => {
      try {
        await captureServerEvent({
          distinctId: user.id,
          event: AnalyticsEvents.signupVerified,
        });
      } catch (caughtError: unknown) {
        authLogger.warn("PostHog signup verified event failed.", {
          userId: user.id,
          error:
            caughtError instanceof Error
              ? caughtError
              : new Error("Unknown posthog error"),
        });
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: ({ user, url }) => {
      return trackAuthEmailTask(
        "password-reset",
        deliverResetPasswordEmail(user.email, url),
      );
    },
  },
  plugins: [
    organization({
      ac,
      roles: organizationRoles,
      requireEmailVerificationOnInvitation: true,
      sendInvitationEmail: (data) => {
        return trackAuthEmailTask(
          "organization-invitation",
          deliverOrganizationInvitationEmail({
            to: data.email,
            invitedByEmail: data.inviter.user.email,
            invitedByName: data.inviter.user.name,
            invitationId: data.id,
            organizationName: data.organization.name,
            role: Array.isArray(data.role) ? data.role.join(", ") : data.role,
          }),
        );
      },
    }),
    nextCookies(),
  ],
});
