import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getOrganizationPermissionState } from "@/lib/auth/permissions";
import { getFullOrganization, getSession } from "@/lib/auth-session";
import { logger } from "@/lib/logger";
import { tryCatch } from "@/lib/try-catch";

const organizationServerLogger = logger.child({
  scope: "organization.server",
});

export async function getHomeRedirectPath() {
  const requestHeaders = await headers();
  const authSession = await getSession();

  if (!authSession) {
    return null;
  }

  if (authSession.session.activeOrganizationId) {
    const { data: activeOrganization, error } = await tryCatch(getFullOrganization());

    if (activeOrganization) {
      return `/o/${activeOrganization.slug}`;
    }

    if (error) {
      // Better Auth clears invalid active orgs when membership disappears.
      organizationServerLogger.debug("Unable to load active organization.", {
        activeOrganizationId: authSession.session.activeOrganizationId,
        error,
        userId: authSession.user.id,
      });
    }
  }

  const organizations = await auth.api.listOrganizations({
    headers: requestHeaders,
  });
  const fallbackOrganization = organizations[0];

  if (!fallbackOrganization) {
    return null;
  }

  await auth.api.setActiveOrganization({
    headers: requestHeaders,
    body: {
      organizationId: fallbackOrganization.id,
    },
  });

  return `/o/${fallbackOrganization.slug}`;
}

async function getOrganizationSessionAndFullOrganization(
  organizationSlug: string,
  options?: {
    membersLimit?: number;
  },
) {
  const authSession = await getSession();

  if (!authSession) {
    return null;
  }

  const { data: organization, error } = await tryCatch(
    getFullOrganization({
      membersLimit: options?.membersLimit ?? 100,
      organizationSlug,
    }),
  );

  if (error) {
    organizationServerLogger.debug("Unable to load organization page data.", {
      organizationSlug,
      userId: authSession.user.id,
      error,
    });
    return null;
  }

  if (!organization) {
    return null;
  }

  const activeMember = organization.members.find((member) => {
    return member.user.id === authSession.user.id;
  });

  if (!activeMember) {
    organizationServerLogger.warn("Authenticated user is not part of organization member list.", {
      organizationSlug,
      userId: authSession.user.id,
    });
    return null;
  }

  return {
    activeMemberRole: activeMember.role,
    organization,
    session: authSession,
  };
}

export async function getOrganizationPageData(organizationSlug: string) {
  const context = await getOrganizationSessionAndFullOrganization(
    organizationSlug,
    {
      membersLimit: 100,
    },
  );

  if (!context) {
    return null;
  }

  return {
    organization: context.organization,
    permissions: getOrganizationPermissionState(context.activeMemberRole),
    session: context.session,
  };
}

export async function getOrganizationRouteData(organizationSlug: string) {
  const context = await getOrganizationSessionAndFullOrganization(
    organizationSlug,
    {
      membersLimit: 1,
    },
  );

  if (!context) {
    return null;
  }

  return {
    organization: context.organization,
    session: context.session,
  };
}

export type OrganizationPageData = Awaited<
  ReturnType<typeof getOrganizationPageData>
>;

export type ResolvedOrganization = NonNullable<
  NonNullable<OrganizationPageData>["organization"]
>;
