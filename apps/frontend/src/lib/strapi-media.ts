/**
 * Helpers for Strapi REST media fields returned on the homepage (and related populate trees).
 *
 * Strapi may return `null`, a single media object, or an array when the attribute is `multiple`.
 * Populated entries often expose a top-level `url` (absolute URL when using Cloudinary or similar).
 */

/** Minimal media shape from Strapi / upload provider JSON. */
export type StrapiMediaLike = {
  url?: string | null;
  alternativeText?: string | null;
};

/**
 * Resolves the first usable media entry (handles `null`, a single object, or a Strapi `multiple` array).
 */
export function pickStrapiMedia(entry: unknown): StrapiMediaLike | null {
  if (entry == null) return null;
  if (Array.isArray(entry)) {
    for (const item of entry) {
      const picked = pickStrapiMedia(item);
      if (picked?.url) return picked;
    }
    return null;
  }
  if (typeof entry === 'object' && 'url' in entry) {
    const url = (entry as { url?: unknown }).url;
    if (typeof url === 'string' && url.length > 0) {
      return entry as StrapiMediaLike;
    }
  }
  return null;
}

/** Returns the first usable image URL, or `undefined` for `next/image` `src` guards. */
export function strapiImageSrc(entry: unknown): string | undefined {
  return pickStrapiMedia(entry)?.url ?? undefined;
}
