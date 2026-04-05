"use client";

import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, organizationRoles } from "@/lib/auth/permissions";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  sessionOptions: {
    // Keep auth traffic quiet during local development and avoid noisy
    // /api/auth/get-session calls when tab focus changes.
    refetchInterval: 0,
    refetchOnWindowFocus: false,
    refetchWhenOffline: false,
  },
  plugins: [
    organizationClient({
      ac,
      roles: organizationRoles,
    }),
  ],
});
