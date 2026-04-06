import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

type GetFullOrganizationOptions = {
  membersLimit?: number;
  organizationSlug?: string;
};

type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>;
type FullOrganizationResult = Awaited<
  ReturnType<typeof auth.api.getFullOrganization>
>;
type ActiveMemberResult = Awaited<ReturnType<typeof auth.api.getActiveMember>>;

export const getSession = cache(async (): Promise<SessionResult> => {
  return auth.api.getSession({ headers: await headers() });
});

export const getFullOrganization = cache(
  async (
    options?: GetFullOrganizationOptions,
  ): Promise<FullOrganizationResult> => {
    return auth.api.getFullOrganization({
      headers: await headers(),
      query: options,
    });
  },
);

export const getActiveMember = cache(async (): Promise<ActiveMemberResult> => {
  return auth.api.getActiveMember({
    headers: await headers(),
  });
});
