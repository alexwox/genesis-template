# SEO and GEO (Playbook)

## Goals and vocabulary

- **SEO (classic)**: Help search engines discover and rank **public** pages: correct metadata, `sitemap.xml`, crawl hints, fast usable HTML.
- **GEO (Generative Engine Optimization)**: Academic term for improving **visibility when an AI system synthesizes answers from web sources (see [GEO paper](https://arxiv.org/abs/2311.09735)). In practice: make pages **easy to retrieve and cite**—clear structure, factual copy, authorship/trust, no thin auto-generated spam. **Not** a guarantee any specific chat product will cite you.

GEO complements SEO: both favor **people-first**, substantial content ([Google: helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

## Environment

Set **`SITE_URL`** and **`NEXT_PUBLIC_APP_URL`** to your **production canonical origin** (e.g. `https://app.example.com`), **no trailing slash**, **same value for both** so:

- Open Graph and canonical URLs resolve correctly (`metadataBase` in `app/layout.tsx`).
- `sitemap.xml` and `robots.txt` use the right host.
- Client code that uses `NEXT_PUBLIC_APP_URL` (e.g. billing client) stays aligned.

For local dev, leave empty; `getSiteUrl()` in [`lib/site-url.ts`](../../lib/site-url.ts) falls back to `http://localhost:3000` (and `VERCEL_URL` on Vercel previews when env is unset).

## File map (where to edit)

| Concern | File(s) |
| -------- | -------- |
| Default title template, `metadataBase`, OG/Twitter defaults | [`app/layout.tsx`](../../app/layout.tsx) |
| Public URL list for discovery | [`app/sitemap.ts`](../../app/sitemap.ts) |
| Crawl rules + sitemap URL | [`app/robots.ts`](../../app/robots.ts) |
| Canonical site origin helper | [`lib/site-url.ts`](../../lib/site-url.ts) |
| Landing JSON-LD (WebSite / Organization) | [`lib/seo/home-json-ld.ts`](../../lib/seo/home-json-ld.ts), inlined in [`app/page.tsx`](../../app/page.tsx) |
| Workspace routes not indexed | [`app/o/[orgSlug]/layout.tsx`](../../app/o/[orgSlug]/layout.tsx) (`robots: noindex, nofollow`) |
| Optional curated summary for LLM crawlers | [`app/llms.txt/route.ts`](../../app/llms.txt/route.ts) |

## Adding a new **public** marketing page

1. Add the route under `app/` (e.g. `app/pricing/page.tsx`).
2. Export **`metadata`** or **`generateMetadata`** with a unique `title` and `description`.
3. Set **`alternates.canonical`** to the canonical URL (or use `"./"` relative to `metadataBase` in that segment).
4. Append the page URL to the array in **`app/sitemap.ts`** (and adjust `changeFrequency` / `priority` if useful).
5. Do **not** add authenticated-only URLs to the sitemap unless you intend them to be discoverable.

## Adding a new **private** or authenticated area

1. Add **`export const metadata`** on that segment’s **`layout.tsx`** with `robots: { index: false, follow: false }` (same pattern as [`app/o/[orgSlug]/layout.tsx`](../../app/o/[orgSlug]/layout.tsx)).
2. Omit those URLs from **`app/sitemap.ts`**.

## GEO-oriented content habits

- Use **answer-shaped** headings (questions users ask), short **self-contained** sections a retriever can quote.
- Add **original** value (data, steps, tradeoffs)—not only summaries of others ([helpful content self-assessment](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).
- Keep **structured data** honest; extend JSON-LD only when it matches visible content ([structured data intro](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).

## When you add a blog or CMS

- Prefer **`generateMetadata`** per slug for title/description/OG.
- Consider dynamic **`opengraph-image`** in that route segment ([Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)).
- If URL count grows large, consider **`generateSitemaps`** ([Next.js sitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)).

## Validation

1. `bun run build` — ensure route compiles.
2. Open **`/sitemap.xml`**, **`/robots.txt`**, optional **`/llms.txt`** — sanity-check URLs and host.
3. View **page source** on `/` — `metadataBase`, JSON-LD script.
4. After deploy: [Rich Results Test](https://search.google.com/test/rich-results) on public URLs; **Google Search Console** for indexing.

## Update protocol

When you change **indexing policy**, **canonical host**, or **major public routes**:

- Update this doc if behavior or file map changes.
- Update **`app/sitemap.ts`** / per-route **metadata** as needed.
- Mention in PRs: what changed, why, impact, entry points (see root `architecture.md`).
