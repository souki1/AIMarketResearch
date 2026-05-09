import { Helmet } from "react-helmet-async";
import { SITE_CANONICAL_ORIGIN } from "../constants/site";

export type SeoProps = {
  title: string;
  description: string;
  /** Path only, e.g. "/" or "/products". */
  canonicalPath: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function canonicalUrl(path: string): string {
  const normalized =
    !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CANONICAL_ORIGIN}${normalized === "/" ? "/" : normalized}`;
}

export default function Seo({
  title,
  description,
  canonicalPath,
  noIndex,
  jsonLd,
}: SeoProps) {
  const url = canonicalUrl(canonicalPath);
  const ogImage = `${SITE_CANONICAL_ORIGIN}/logo.svg`;
  const ldNodes = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Partsource" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ldNodes.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
