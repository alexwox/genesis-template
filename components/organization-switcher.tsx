"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronsUpDown,
  LoaderCircle,
  Plus,
  Settings2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { OrganizationCreateDialog } from "@/components/organization-create-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnalyticsEvents, trackClientEvent } from "@/lib/analytics";
import { authClient } from "@/lib/auth-client";
import { tryCatch } from "@/lib/try-catch";

type OrganizationRow = { id: string; name: string; slug: string };

async function switchActiveOrganization(args: {
  activeOrganization: OrganizationRow | null;
  organizationSlug: string;
  router: ReturnType<typeof useRouter>;
  safeOrganizations: OrganizationRow[];
  setIsSwitching: (value: boolean) => void;
}): Promise<void> {
  const {
    activeOrganization,
    organizationSlug,
    router,
    safeOrganizations,
    setIsSwitching,
  } = args;

  const target = safeOrganizations.find((o) => o.slug === organizationSlug);
  if (!target || activeOrganization?.id === target.id) {
    return;
  }

  const fromOrganizationId = activeOrganization?.id ?? null;

  setIsSwitching(true);

  const { data: result, error } = await tryCatch(
    authClient.organization.setActive({
      organizationSlug,
    }),
  );

  if (error) {
    setIsSwitching(false);
    return;
  }

  if (result.error) {
    setIsSwitching(false);
    return;
  }

  trackClientEvent(AnalyticsEvents.orgSwitched, {
    from_organization_id: fromOrganizationId,
    to_organization_id: target.id,
  });

  setIsSwitching(false);
  router.push(`/o/${organizationSlug}`);
  router.refresh();
}

function SwitcherDropdown({
  activeOrganization,
  isSwitching,
  onCreateNew,
  onOpenOrganizationSettings,
  onSwitch,
  organizations,
}: {
  activeOrganization: OrganizationRow | null;
  isSwitching: boolean;
  onCreateNew: () => void;
  onOpenOrganizationSettings: () => void;
  onSwitch: (slug: string) => void;
  organizations: OrganizationRow[];
}) {
  const activeLabel = activeOrganization?.name ?? organizations[0]?.name ?? "Workspace";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className="rounded-full px-3">
          <Building2 data-icon="inline-start" />
          <span className="max-w-36 truncate">{activeLabel}</span>
          <ChevronsUpDown data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Building2 />
          Active workspace
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {organizations.map((organization) => {
            const isActive = activeOrganization?.id === organization.id;

            return (
              <DropdownMenuItem
                key={organization.id}
                onClick={() => onSwitch(organization.slug)}
                disabled={isSwitching}
                className="justify-between"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-medium">{organization.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    /o/{organization.slug}
                  </span>
                </div>
                {isActive ? <Check /> : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onCreateNew} disabled={isSwitching}>
            <Plus />
            Create workspace
          </DropdownMenuItem>
          {activeOrganization ? (
            <DropdownMenuItem
              onClick={() => onOpenOrganizationSettings()}
              disabled={isSwitching}
            >
              <Settings2 />
              Organization settings
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function OrganizationSwitcher() {
  const router = useRouter();
  const { data: activeOrganization, isPending: isActiveOrgPending } =
    authClient.useActiveOrganization();
  const { data: organizations, isPending: isOrganizationsPending } =
    authClient.useListOrganizations();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const safeOrganizations = useMemo(() => organizations ?? [], [organizations]);

  if (isActiveOrgPending || isOrganizationsPending) {
    return (
      <Button variant="outline" className="rounded-full" disabled>
        <LoaderCircle className="animate-spin" data-icon="inline-start" />
        Loading workspace...
      </Button>
    );
  }

  if (safeOrganizations.length === 0) {
    return (
      <>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus data-icon="inline-start" />
          Create workspace
        </Button>
        <OrganizationCreateDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </>
    );
  }

  return (
    <>
      <SwitcherDropdown
        activeOrganization={activeOrganization ?? null}
        isSwitching={isSwitching}
        onCreateNew={() => setCreateDialogOpen(true)}
        onOpenOrganizationSettings={() => {
          if (activeOrganization) {
            router.push(`/o/${activeOrganization.slug}/settings`);
          }
        }}
        onSwitch={(slug) => {
          void switchActiveOrganization({
            activeOrganization: activeOrganization ?? null,
            organizationSlug: slug,
            router,
            safeOrganizations,
            setIsSwitching,
          });
        }}
        organizations={safeOrganizations}
      />

      <OrganizationCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}
