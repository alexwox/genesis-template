"use client";

import { useSyncExternalStore } from "react";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        aria-label="Toggle theme"
        disabled
      >
        <SunMedium className="invisible" aria-hidden="true" data-icon="inline-start" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunMedium data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
    </Button>
  );
}
