"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LoaderCircle,
  LogOut,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { AuthModal } from "@/components/auth-modal";
import { OrganizationSwitcher } from "@/components/organization-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { authClient } from "@/lib/auth-client";
import { tryCatch } from "@/lib/try-catch";
import posthog from "posthog-js";

function getInitials(name: string, email: string) {
  const source = name.trim() || email.trim();
  const parts = source.split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return "G";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

function UserMenu({
  activeOrganization,
  session,
}: {
  activeOrganization: { slug: string } | null;
  session: { user: { email: string; name: string } };
}) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const initials = useMemo(
    () => getInitials(session.user.name, session.user.email),
    [session.user.name, session.user.email],
  );

  async function handleSignOut() {
    setIsSigningOut(true);
    const result = await tryCatch(authClient.signOut());
    if (result.error) {
      setIsSigningOut(false);
      return;
    }
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.reset();
    }
    setIsSigningOut(false);
    router.replace("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className="h-11 rounded-full px-3">
          <Avatar className="mr-1" size="lg">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="max-w-36 truncate">{session.user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <div className="text-foreground">{session.user.name}</div>
          <div className="text-xs font-normal text-muted-foreground">
            {session.user.email}
          </div>
        </DropdownMenuLabel>
        {activeOrganization ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push(`/o/${activeOrganization.slug}`)}
              >
                <ShieldCheck className="mr-2" />
                Open workspace
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/o/${activeOrganization.slug}/settings`)}
              >
                <Settings2 className="mr-2" />
                Organization settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              void handleSignOut();
            }}
            disabled={isSigningOut}
          >
            <LogOut className="mr-2" />
            {isSigningOut ? "Signing out..." : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const [modalMode, setModalMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!activeOrganization) {
      return;
    }

    const slug = activeOrganization.slug;
    router.prefetch(`/o/${slug}`);
    router.prefetch(`/o/${slug}/settings`);
  }, [activeOrganization, router]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-muted/40 shadow-sm">
              <ShieldCheck className="size-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Genesis
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isPending ? (
              <Button variant="outline" size="icon" className="rounded-full" disabled>
                <LoaderCircle className="animate-spin" data-icon="inline-start" />
              </Button>
            ) : session?.user ? (
              <>
                <OrganizationSwitcher />
                <UserMenu
                  activeOrganization={activeOrganization ?? null}
                  session={session}
                />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => {
                    setModalMode("sign-in");
                    setIsModalOpen(true);
                  }}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  className="rounded-full"
                  onClick={() => {
                    setModalMode("sign-up");
                    setIsModalOpen(true);
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        defaultMode={modalMode}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
