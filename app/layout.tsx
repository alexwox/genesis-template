import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";

import "./globals.css";

import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import { PostHogIdentify } from "@/components/analytics/posthog-identify";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getSiteUrl } from "@/lib/site-url";
import { TRPCReactProvider } from "@/trpc/client";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Genesis",
    template: "%s | Genesis",
  },
  description:
    "Multi-tenant SaaS template: auth, organizations, billing hooks, and typed APIs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en",
    siteName: "Genesis",
    title: "Genesis",
    description:
      "Multi-tenant SaaS template: auth, organizations, billing hooks, and typed APIs.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Genesis",
    description:
      "Multi-tenant SaaS template: auth, organizations, billing hooks, and typed APIs.",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  // i18n: use generateMetadata + alternates.languages on localized route segments
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <ThemeProvider>
          <TRPCReactProvider>
            <PostHogIdentify />
            {children}
            <CookieConsentBanner />
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
