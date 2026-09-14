/**
 * Decorative cover image for a post that has no uploaded picture.
 *
 * Posts that carry a real `pictureURL` always use it. For the rest we show a
 * stable, deterministic photo (seeded by the post id) on roughly half of them,
 * so the feed reads as a natural mix of image and text posts — like the
 * reference layout — without altering any stored data.
 */
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Pinned cover images for specific posts (matched by title). Takes priority
 * over the post's own picture. Served from public/, so add the file there.
 */
const PINNED_COVERS = {
  "welcome to pandoconnect": "/assets/hero.png",
};

export function pinnedCoverFor(link) {
  if (!link) return null;
  const title = String(link.url || "").trim().toLowerCase();
  return PINNED_COVERS[title] || null;
}

/** A stable decorative photo for a post (always returns a URL). */
export function picsumFor(link) {
  const id = String((link && (link.id || link.url)) || "pando");
  const seed = encodeURIComponent(id).slice(0, 24) || "pando";
  return `https://picsum.photos/seed/${seed}/800/450`;
}

/** Cover for a post with no uploaded picture — shown on ~half of them. */
export function coverImageFor(link) {
  if (!link) return null;
  const id = String(link.id || link.url || "");
  if (!id) return null;
  // ~half of image-less posts get a decorative cover.
  if (hash(id) % 2 === 1) return null;
  return picsumFor(link);
}
