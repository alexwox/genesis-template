import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultRoles,
  defaultStatements,
} from "better-auth/plugins/organization/access";

export const statements = {
  ...defaultStatements,
  dashboard: ["create", "read", "update", "delete", "share"],
  dashboardShare: ["create", "delete"],
} as const;

export const ac = createAccessControl(statements);

export const owner = ac.newRole({
  ...defaultRoles.owner.statements,
  dashboard: ["create", "read", "update", "delete", "share"],
  dashboardShare: ["create", "delete"],
});

export const admin = ac.newRole({
  ...defaultRoles.admin.statements,
  dashboard: ["create", "read", "update", "delete", "share"],
  dashboardShare: ["create", "delete"],
});

export const editor = ac.newRole({
  organization: [],
  member: [],
  invitation: [],
  team: [],
  ac: [],
  dashboard: ["create", "read", "update", "share"],
  dashboardShare: ["create", "delete"],
});

export const viewer = ac.newRole({
  organization: [],
  member: [],
  invitation: [],
  team: [],
  ac: [],
  dashboard: ["read"],
  dashboardShare: [],
});

export const member = viewer;

export const organizationRoles = {
  owner,
  admin,
  editor,
  member,
  viewer,
} as const;

export type OrganizationRoleName = keyof typeof organizationRoles;

export type PermissionInput = {
  [K in keyof typeof statements]?: Array<(typeof statements)[K][number]>;
};

export function checkPermission(
  role: string,
  permissions: PermissionInput,
): boolean {
  const roleDefinition =
    role in organizationRoles
      ? organizationRoles[role as OrganizationRoleName]
      : null;

  if (!roleDefinition) {
    return false;
  }

  return Object.entries(permissions).every(([resource, actions]) => {
    const allowedActions = roleDefinition.statements[
      resource as keyof typeof roleDefinition.statements
    ];

    return actions.every((action) =>
      (allowedActions as readonly string[] | undefined)?.includes(action) ??
      false,
    );
  });
}

export type OrganizationPermissionState = {
  canCreateDashboard: boolean;
  canInviteMembers: boolean;
  canManageDashboardShares: boolean;
  canManageMembers: boolean;
  canUpdateOrganization: boolean;
};

export function getOrganizationPermissionState(
  role: string,
): OrganizationPermissionState {
  return {
    canCreateDashboard: checkPermission(role, {
      dashboard: ["create"],
    }),
    canInviteMembers: checkPermission(role, {
      invitation: ["create"],
    }),
    canManageDashboardShares: checkPermission(role, {
      dashboardShare: ["create"],
    }),
    canManageMembers: checkPermission(role, {
      member: ["update"],
    }),
    canUpdateOrganization: checkPermission(role, {
      organization: ["update"],
    }),
  };
}
