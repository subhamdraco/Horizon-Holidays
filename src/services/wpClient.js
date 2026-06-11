import { getWpRestBase } from '../config/wp.js'
import { mapWpTourToApp } from './mapWpTourToApp.js'

/**
 * Fetch published tours from WordPress REST API.
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function fetchToursFromWordPress() {
  const base = getWpRestBase()
  if (!base) return []

  const url = `${base}/wp/v2/tour?per_page=100&status=publish&_embed=1`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    console.warn('[wp] tours fetch failed', res.status, await res.text().catch(() => ''))
    return []
  }
  /** @type {unknown[]} */
  const posts = await res.json()
  if (!Array.isArray(posts)) return []
  return posts.map((p) => mapWpTourToApp(p))
}

/**
 * Fetch single tour by slug.
 * @param {string} slug
 */
export async function fetchTourBySlugFromWordPress(slug) {
  const base = getWpRestBase()
  if (!base || !slug) return null

  const url = `${base}/wp/v2/tour?slug=${encodeURIComponent(slug)}&status=publish&_embed=1`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) return null
  /** @type {unknown[]} */
  const posts = await res.json()
  if (!Array.isArray(posts) || !posts[0]) return null
  return mapWpTourToApp(posts[0])
}
