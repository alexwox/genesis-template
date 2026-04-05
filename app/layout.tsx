import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Genesis",
  description: "Infrastructure scaffold for the Genesis platform.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <ThemeProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
