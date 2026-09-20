/**
 * Shared SEO helpers: canonical URLs + hreflang alternates.
 *
 * `metadataBase` is set to https://likaacademy.al in the root layout, so
 * relative paths returned here resolve correctly without hardcoding the
 * domain in every page.
 */

/**
 * Build `alternates` metadata (canonical + hreflang) for a given locale and
 * a locale-less path (e.g. "" for the homepage, "/about" for /sq/about).
 */
export function buildAlternates(locale: string, path: string = "") {
  const normalizedPath = path === "/" ? "" : path;

  return {
    canonical: `/${locale}${normalizedPath}`,
    languages: {
      sq: `/sq${normalizedPath}`,
      en: `/en${normalizedPath}`,
    },
  };
}
