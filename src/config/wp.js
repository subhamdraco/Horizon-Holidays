/**
 * WordPress / headless configuration (Vite env).
 * @see docs/WORDPRESS_HEADLESS_SEO.md
 */

export function getWpRestBase() {
  const url = import.meta.env.VITE_WORDPRESS_REST_URL
  return typeof url === 'string' && url.trim() ? url.replace(/\/$/, '') : ''
}

export function isWpEnabled() {
  return Boolean(getWpRestBase())
}

/** Canonical base for the public React site (no trailing slash). */
export function getPublicSiteUrl() {
  const url = import.meta.env.VITE_PUBLIC_SITE_URL
  if (typeof url === 'string' && url.trim()) return url.replace(/\/$/, '')
  if (typeof window !== 'undefined') return `${window.location.protocol}//${window.location.host}`
  return ''
}
