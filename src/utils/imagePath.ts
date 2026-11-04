/**
 * Robust image path resolver for development, production builds,
 * Git repositories, and GitHub Pages (subpath-safe).
 */
export function resolveImageUrl(url?: string | null): string {
  if (!url) return '';
  
  // Data URLs, Blobs, and external absolute web links remain unchanged
  if (
    url.startsWith('data:') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  // Strip accidental or legacy "/public/" prefix since Vite serves public folder from root
  let clean = url.replace(/^\/?public\//, '');
  
  // Strip leading slash to allow relative base resolution
  clean = clean.replace(/^\//, '');

  const base = import.meta.env.BASE_URL || './';
  if (base.endsWith('/')) {
    return `${base}${clean}`;
  }
  return `${base}/${clean}`;
}
