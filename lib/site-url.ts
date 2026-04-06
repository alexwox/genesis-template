/**
 * Canonical public origin for metadata (`metadataBase`), `sitemap.xml`, `robots.txt`,
 * JSON-LD, and other absolute URLs. Prefer env; align with deployment previews when unset.
 */
export function getSiteUrl(): string {
  const site = process.env.SITE_URL?.trim();
  const publicUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const fromEnv =
    site && site.length > 0 ? site : publicUrl && publicUrl.length > 0 ? publicUrl : undefined;
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, "");
  }

  return "http://localhost:3000";
}
