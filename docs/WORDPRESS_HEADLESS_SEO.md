# WordPress as headless CMS + SEO (full guide)

This React app can **read tours from WordPress** over the REST API while you keep using the **built-in admin** for demos—or replace it later with WP-only editing.

---

## 1. Architecture

| Layer | Role |
|--------|------|
| **WordPress** | Source of truth for tours, pages, blog, media, SEO metadata, sitemaps, redirects. |
| **REST API** (`/wp-json/`) | JSON your React app fetches (no WP theme required for the SPA). |
| **React (Vite)** | Public UI + optional in-app admin; consumes WP JSON and sets `<title>`, meta, JSON-LD via `react-helmet-async`. |

**SEO reality check:** Google can index SPAs, but for **maximum SEO** many teams either:

- **Prerender** the Vite build (e.g. `vite-plugin-ssr`, `prerender-spa-plugin`, or a static host that runs headless Chrome), or  
- Move the public site to **Next.js** / **Remix** (server renders HTML + meta from WP on each request).

This project implements **client-side meta** (good baseline) + documents **sitemaps & canonicals in WP**. Upgrade path: same WP API + SSR framework.

---

## 2. WordPress setup (hosting)

1. Install WordPress on a host with HTTPS (Kinsta, WP Engine, Cloudways, SpinupWP on VPS, etc.).
2. **Settings → Permalinks:** choose “Post name” (pretty URLs).
3. **Settings → General:** set **Site Address (URL)** if the site is only headless (optional; API URL is what matters for the app).

---

## 3. Register the `tour` post type + public REST meta

Use the PHP in **`docs/wp-theme-functions-snippet.php`** (copy into a **child theme’s** `functions.php` or a **minimal custom plugin**).

It registers:

- Post type: `tour`, REST base: `tour` → list:  
  `GET https://YOUR-DOMAIN.com/wp-json/wp/v2/tour?per_page=100&status=publish`
- Meta fields exposed to REST (prices, hero URL, JSON itinerary, etc.).

**ACF (optional):** If you prefer Advanced Custom Fields, enable “Show in REST API” on the field group and map fields in `src/services/mapWpTourToApp.js` from `acf` instead of `meta`.

---

## 4. CORS (browser → WordPress)

Browsers block cross-origin requests unless WP sends headers.

**Option A – same subdomain (best):**  
Serve the React app from `app.yourdomain.com` and WP from `cms.yourdomain.com` and put both behind a **reverse proxy** so the browser sees **one origin** (e.g. `/wp-json` proxied to WP).

**Option B – CORS plugin / mu-plugin:**  
Allow `GET` from your SPA origin:

```php
// mu-plugin example: allow SPA origin for GET /wp-json
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    header('Access-Control-Allow-Origin: https://your-spa-origin.com');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
    return $value;
  });
}, 15);
```

**Option C – Vite dev proxy:** see `vite.config.js` comment block; proxy `/wp-json` during `npm run dev` to avoid CORS locally.

---

## 5. Connect this React app

1. Copy **`.env.example`** → **`.env`**.
2. Set:

```env
VITE_WORDPRESS_REST_URL=https://your-site.com/wp-json
VITE_PUBLIC_SITE_URL=https://your-marketing-site.com
```

3. Restart `npm run dev`.

When `VITE_WORDPRESS_REST_URL` is set, **`ToursProvider`** loads published tours from WP on startup (see `src/services/wpClient.js`). If the request fails, it falls back to **seed + localStorage** as before.

---

## 6. SEO in WordPress (content + technical)

### Plugins (pick one stack)

| Goal | Plugin |
|------|--------|
| Meta title/description, Open Graph, Twitter, schema | **Yoast SEO** or **Rank Math** |
| XML sitemap | Usually included in Yoast / Rank Math |
| Redirects | **Redirection** or Rank Math |
| Performance / caching | **WP Rocket**, host cache, or Cloudflare |

### What to do in WP

1. **Each tour:** fill SEO title + meta description in Yoast/Rank Math (focus keyword, snippet).
2. **Canonical:** set in plugin; for headless, often canonical points to the **React URL** for that tour (configure “canonical URL” per post or filter in WP—Rank Math has filters for custom canonicals).
3. **Sitemap:** submit `https://your-wp-or-proxy-domain.com/sitemap_index.xml` in **Google Search Console** and Bing Webmaster.
4. **Structured data:** Yoast outputs JSON-LD on WP pages; for SPA, mirror important types in React (`PageSeo` + `jsonLd`—see `TourDetail.jsx`).

### Yoast / Rank Math + REST (optional advanced)

Yoast can expose `yoast_head` / `yoast_head_json` for REST in some setups. If available, you can pass `yoast_head_json` into the app and map `og_title`, `og_description`, `canonical` into `PageSeo` instead of duplicating fields. If not exposed, **duplicate** title/description from WP post fields + plugin meta via custom REST field (PHP `register_rest_field`).

---

## 7. Media (images)

- Upload images in **WP Media Library**; store **full HTTPS URLs** in tour meta (hero + gallery).  
- Use **WebP** + reasonable sizes (WP can generate sizes; pass `src` with `?w=` if you use an image CDN).  
- Optional: **Jetpack Photon**, **Cloudinary**, or host CDN for `content_url`.

---

## 8. Editorial workflow

1. Editors work only in **WP Admin** (`/wp-admin`).  
2. **Publish** updates tours; SPA refetches on next deploy or on next visit (you can add SWR/React Query + `staleTime` later).  
3. **Preview:** either preview in WP theme, or build a **preview token** route (custom REST + short-lived JWT)—out of scope here but documented pattern.

---

## 9. Replacing the React admin with WP

For production:

- Remove or hide `/admin` routes.  
- Use **WP roles** (Editor, Author) + **ACF** for field validation.  
- If you need a **custom admin UI**, use WP **Application Passwords** or **OAuth** and `POST /wp/v2/tour` with `X-WP-Nonce` / JWT—never expose write credentials in the public SPA.

---

## 10. Checklist before launch

- [ ] HTTPS everywhere  
- [ ] `VITE_WORDPRESS_REST_URL` and `VITE_PUBLIC_SITE_URL` set for production build  
- [ ] CORS or reverse proxy verified  
- [ ] Sitemap submitted to Search Console  
- [ ] Canonical strategy (WP vs SPA URLs) decided and consistent  
- [ ] `robots.txt` (WP or edge) allows crawling important URLs  
- [ ] Core Web Vitals: lazy images, font subsetting, CDN  

---

## 11. Files in this repo related to WordPress

| File | Purpose |
|------|---------|
| `docs/wp-theme-functions-snippet.php` | CPT + REST meta registration |
| `src/config/wp.js` | Env flags |
| `src/services/wpClient.js` | Fetch tours from WP |
| `src/services/mapWpTourToApp.js` | WP → app tour shape |
| `src/context/ToursContext.jsx` | Optional WP hydration on load |
| `src/components/seo/PageSeo.jsx` | Title, meta, canonical, OG, JSON-LD |
| `.env.example` | Variables to copy |

For questions about **Rank Math headless** or **WPGraphQL**, extend this doc in-repo as you lock your stack.
