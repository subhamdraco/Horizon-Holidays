import { Helmet } from 'react-helmet-async'
import { getPublicSiteUrl } from '../../config/wp.js'

/**
 * @param {{
 *   title: string
 *   description?: string
 *   canonicalPath?: string
 *   ogImage?: string
 *   noIndex?: boolean
 *   jsonLd?: Record<string, unknown> | Record<string, unknown>[]
 * }} props
 */
export default function PageSeo({ title, description = '', canonicalPath = '', ogImage = '', noIndex = false, jsonLd }) {
  const base = getPublicSiteUrl()
  const canonical = canonicalPath ? `${base}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}` : ''

  const jsonLdString = jsonLd
    ? Array.isArray(jsonLd)
      ? JSON.stringify(jsonLd)
      : JSON.stringify(jsonLd)
    : ''

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLdString && (
        <script type="application/ld+json">{jsonLdString}</script>
      )}
    </Helmet>
  )
}
