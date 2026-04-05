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
