function stripHtml(html) {
  if (!html) return ''
  return String(html).replace(/<[^>]+>/g, '').trim()
}

/**
 * Map WordPress REST tour post → app tour object used by React pages.
 * Expects meta keys from docs/wp-theme-functions-snippet.php
 *
 * @param {Record<string, unknown>} post - WP REST post object
 */
export function mapWpTourToApp(post) {
  const meta = post.meta || {}
  const titleRendered = post.title?.rendered ?? post.title ?? ''

  let gallery = []
  try {
    const raw = meta.tour_gallery_json
    if (typeof raw === 'string' && raw.trim()) gallery = JSON.parse(raw)
    else if (Array.isArray(raw)) gallery = raw
  } catch {
    gallery = []
  }

  let itinerary = []
  try {
    const raw = meta.tour_itinerary_json
    if (typeof raw === 'string' && raw.trim()) itinerary = JSON.parse(raw)
    else if (Array.isArray(raw)) itinerary = raw
  } catch {
    itinerary = []
  }

  const highlights =
    typeof meta.tour_highlights === 'string'
      ? meta.tour_highlights.split('\n').map((s) => s.trim()).filter(Boolean)
      : []

  const included =
    typeof meta.tour_included === 'string'
      ? meta.tour_included.split('\n').map((s) => s.trim()).filter(Boolean)
      : []

  const hero =
    typeof meta.tour_hero_image === 'string' && meta.tour_hero_image.trim()
      ? meta.tour_hero_image.trim()
      : post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''

  return {
    id: `wp-${post.id}`,
    slug: post.slug,
    title: stripHtml(titleRendered),
    tagline: String(meta.tour_tagline || ''),
    destination: String(meta.tour_destination || ''),
    priceFrom: Number(meta.tour_price_from) || 0,
    currency: String(meta.tour_currency || 'INR'),
    durationDays: Number(meta.tour_duration_days) || 1,
    nights: Number(meta.tour_nights) || 0,
    heroImage: hero,
    gallery: Array.isArray(gallery) ? gallery.filter(Boolean) : [],
    highlights,
    included,
    itinerary: Array.isArray(itinerary)
      ? itinerary.map((row, i) => ({
          day: Number(row.day) || i + 1,
          title: String(row.title || `Day ${i + 1}`),
          description: String(row.description || ''),
        }))
      : [],
    _wpPostId: post.id,
  }
}
