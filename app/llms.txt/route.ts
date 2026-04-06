import { NextResponse } from "next/server";

import { getSiteUrl } from "@/lib/site-url";

/**
 * Emerging convention: curated site summary for LLM crawlers. Not standardized; not all systems honor it.
 * @see docs/architecture/seo-and-geo.md
 */
export function GET() {
  const origin = getSiteUrl();

  const body = `# Genesis

> Multi-tenant SaaS template (Next.js, Better Auth, Drizzle, tRPC). Fork and replace this copy with your product.

## Entry points

- [Home](${origin}/) — Public landing (signed-in users redirect to their workspace)

## Docs

- Repository README and \`architecture.md\` describe stack, env, and subsystems.
- \`docs/architecture/\` — Deeper notes (auth, data model, payments, SEO, etc.).

## API surface (for integrators)

- REST-style JSON under \`/api/*\` (Better Auth, billing, webhooks).
- tRPC under \`/api/trpc\` for typed app RPC.

`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
