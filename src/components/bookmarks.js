const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function normalizeUrl(value) {
  const input = value.trim();
  if (!input) {
    throw new Error('A URL is required.');
  }

  const candidate = /^[a-z][a-z\d+\-.]*:\/\//i.test(input) ? input : `https://${input}`;
  const parsed = new URL(candidate);
  if (!parsed.hostname) {
    throw new Error('Enter a valid URL.');
  }

  return parsed.href;
}

export function formatBookmark({ url, slug }) {
  return `${url} :: ${slug}`;
}

export function loadBookmarks(rawValue) {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (bookmark) =>
        bookmark &&
        typeof bookmark === 'object' &&
        typeof bookmark.url === 'string' &&
        bookmark.url.length > 0 &&
        typeof bookmark.slug === 'string' &&
        /^mona-[0-9a-zA-Z]+$/.test(bookmark.slug),
    );
  } catch {
    return [];
  }
}

export function generateSlug(seed = Date.now()) {
  let value = Math.max(0, Math.floor(Number(seed)) || 0);
  let encoded = '';

  do {
    encoded = BASE62[value % BASE62.length] + encoded;
    value = Math.floor(value / BASE62.length);
  } while (value > 0);

  return `mona-${encoded}`;
}
