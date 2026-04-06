import { getSiteUrl } from "@/lib/site-url";

/** Minimal WebSite + Organization JSON-LD for the public landing page. */
export function getHomePageJsonLd(): Record<string, unknown> {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: "Genesis",
        url,
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: "Genesis",
        url,
        publisher: { "@id": `${url}/#organization` },
      },
    ],
  };
}
