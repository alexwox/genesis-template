"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const REACT_THEME_SCRIPT_WARNING =
  "Encountered a script tag while rendering React component.";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const originalConsoleError = window.console.error;

    // React 19 warns about next-themes' SSR bootstrap script even though it is expected.
    window.console.error = (...args: Parameters<typeof window.console.error>) => {
      const firstArg: unknown = args[0];

      if (
        typeof firstArg === "string" &&
        firstArg.includes(REACT_THEME_SCRIPT_WARNING)
      ) {
        return;
      }

      originalConsoleError.apply(window.console, args);
    };

    return () => {
      window.console.error = originalConsoleError;
    };
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
