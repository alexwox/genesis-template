import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { tryCatch } from "@/lib/try-catch";

const organizationServerLogger = logger.child({
  scope: "organization.server",
});

export async function getHomeRedirectPath() {
  const requestHeaders = await headers();
  const authSession = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!authSession) {
    return null;
  }

  if (authSession.session.activeOrganizationId) {
    const { data: activeOrganization, error } = await tryCatch(
      auth.api.getFullOrganization({
        headers: requestHeaders,
      }),
    );

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

async function getPermissionState(headersList: Headers, organizationId: string) {
  const [
    canCreateDashboard,
    canInviteMembers,
    canManageDashboardShares,
    canManageMembers,
    canUpdateOrganization,
  ] = await Promise.all([
    auth.api.hasPermission({
      headers: headersList,
      body: {
        organizationId,
        permissions: {
          dashboard: ["create"],
        },
      },
    }),
    auth.api.hasPermission({
      headers: headersList,
      body: {
        organizationId,
        permissions: {
          invitation: ["create"],
        },
      },
    }),
    auth.api.hasPermission({
      headers: headersList,
      body: {
        organizationId,
        permissions: {
          dashboardShare: ["create"],
        },
      },
    }),
    auth.api.hasPermission({
      headers: headersList,
      body: {
        organizationId,
        permissions: {
          member: ["update"],
        },
      },
    }),
    auth.api.hasPermission({
      headers: headersList,
      body: {
        organizationId,
        permissions: {
          organization: ["update"],
        },
      },
    }),
  ]);

  return {
    canCreateDashboard: canCreateDashboard.success,
    canInviteMembers: canInviteMembers.success,
    canManageDashboardShares: canManageDashboardShares.success,
    canManageMembers: canManageMembers.success,
    canUpdateOrganization: canUpdateOrganization.success,
  };
}

async function getOrganizationSessionAndFullOrganization(
  organizationSlug: string,
  options?: {
    membersLimit?: number;
  },
) {
  const requestHeaders = await headers();
  const authSession = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!authSession) {
    return null;
  }

  const { data: organization, error } = await tryCatch(
    auth.api.getFullOrganization({
      headers: requestHeaders,
      query: {
        membersLimit: options?.membersLimit ?? 100,
        organizationSlug,
      },
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

  return {
    organization,
    requestHeaders,
    session: authSession,
  };
}

export async function getOrganizationPageData(organizationSlug: string) {
  const context = await getOrganizationSessionAndFullOrganization(organizationSlug, {
    membersLimit: 100,
  });

  if (!context) {
    return null;
  }

  return {
    organization: context.organization,
    permissions: await getPermissionState(context.requestHeaders, context.organization.id),
    session: context.session,
  };
}

export async function getOrganizationRouteData(organizationSlug: string) {
  const context = await getOrganizationSessionAndFullOrganization(organizationSlug, {
    membersLimit: 1,
  });

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
