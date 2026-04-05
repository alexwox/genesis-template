"use client";

import { useEffect, useRef } from "react";

import { authClient } from "@/lib/auth-client";

type ActiveOrganizationSyncProps = {
  organizationSlug: string;
};

export function ActiveOrganizationSync({
  organizationSlug,
}: ActiveOrganizationSyncProps) {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const lastRequestedSlugRef = useRef<string | null>(null);

  useEffect(() => {
    if (activeOrganization?.slug === organizationSlug) {
      lastRequestedSlugRef.current = organizationSlug;
      return;
    }

    if (lastRequestedSlugRef.current === organizationSlug) {
      return;
    }

    lastRequestedSlugRef.current = organizationSlug;
    void authClient.organization.setActive({ organizationSlug });
  }, [activeOrganization?.slug, organizationSlug]);

  return null;
}
