# WordPress: complete step-by-step (for Horizon Holidays React)

Your React app reads: **`GET /wp-json/wp/v2/tour?status=publish&per_page=100&_embed=1`**  
and maps **post fields + meta keys** listed below. Follow **in order**.

---

## Part A — Install & secure WordPress

### 1. Hosting & domain
- [ ] Buy hosting that supports **PHP 8.1+**, **MySQL/MariaDB**, **HTTPS**, cron, and file manager or SSH.
- [ ] Point your **domain** (or subdomain, e.g. `cms.yoursite.com`) DNS **A/AAAA** records to the server.

### 2. Install WordPress
- [ ] Run the host’s **WordPress installer** (or upload WP + run `wp-admin/install.php`).
- [ ] Set **Site Title** (e.g. “Horizon Holidays CMS”), **admin username**, **strong password**, **admin email**.
- [ ] Complete install and **log in** to `https://YOUR-DOMAIN/wp-admin/`.

### 3. HTTPS (SSL)
- [ ] In hosting panel, enable **Let’s Encrypt** (or your SSL) so **HTTP redirects to HTTPS**.
- [ ] In WP: **Settings → General** — both **WordPress Address** and **Site Address** must start with **`https://`** (same domain you’ll use in `.env`).

### 4. Update core, language, timezone
- [ ] **Dashboard → Updates** — install all **WordPress core** updates.
- [ ] **Settings → General** — set **Timezone**, **Date Format**, **Week Starts On**.
- [ ] **Settings → General** — set **Site Language** if not English.

### 5. Permalinks (required for REST & pretty URLs)
- [ ] **Settings → Permalinks** — choose **Post name** (not “Plain”).
- [ ] Click **Save Changes** (even if unchanged) — **flushes rewrite rules**.

---

## Part B — Add the “Tour” content type (code)

The file **`docs/wp-theme-functions-snippet.php`** in this repo registers:
- Custom post type: **`tour`**
- REST collection: **`/wp-json/wp/v2/tour`**
- All **meta keys** the React mapper expects.

### 6. Choose how you load the PHP (pick one)

**Option 1 — Child theme (recommended if you use a theme)**  
- [ ] Install a parent theme (e.g. **Twenty Twenty-Five**).
- [ ] Create a **child theme** (style.css + functions.php).
- [ ] **Network activate / activate** child theme.
- [ ] Open child theme **`functions.php`** and paste **entire contents** of `docs/wp-theme-functions-snippet.php` **below** `<?php` (merge carefully if `functions.php` already has code).

**Option 2 — Must-use plugin (good for “headless only”)**  
- [ ] Via FTP/SFTP or file manager, create: **`wp-content/mu-plugins/`** (if it doesn’t exist).
- [ ] Create file **`wp-content/mu-plugins/horizon-tours-cpt.php`**.
- [ ] Paste **entire** `docs/wp-theme-functions-snippet.php` contents into that file and save.
- [ ] MU-plugins **auto-load** — no “activate” button in Plugins list.

**Option 3 — Regular plugin**  
- [ ] Create folder **`wp-content/plugins/horizon-tours-cpt/`**.
- [ ] Add **`horizon-tours-cpt.php`** with plugin header + pasted code (wrap in `<?php` …).
- [ ] **Plugins → Installed Plugins → Activate** “Horizon Tours CPT”.

### 7. Flush permalinks again
- [ ] **Settings → Permalinks → Save Changes** (again, after adding CPT).

### 8. Verify REST in browser
Open (replace domain):

`https://YOUR-DOMAIN/wp-json/wp/v2/tour`

- [ ] You should see **`[]`** or a **JSON array** — **not** a 404 HTML page.
- If **404**: permalinks not flushed, wrong server rules, or PHP not loaded — fix before continuing.

---

## Part C — How to enter tour data in WordPress (do not skip)

The snippet registers **post meta** for REST. **The block editor does not automatically show custom meta boxes** for those keys unless you add UI.

Pick **one** approach:

### Approach 1 — Advanced Custom Fields (ACF) **(easiest for editors)**

1. [ ] **Plugins → Add New** → install **Advanced Custom Fields (ACF)** → **Activate**.
2. [ ] **ACF → Field Groups → Add New** — name: “Tour fields”.
3. [ ] **Location rules:** **Post Type** **is equal to** **Tour**.
4. [ ] Add fields with these **Field Names** (must match **exactly**):

| Field type suggestion | Field Name (exact) | Notes |
|----------------------|----------------------|--------|
| Text | `tour_tagline` | Short subtitle |
| Text | `tour_destination` | e.g. Thailand |
| Number | `tour_price_from` | e.g. 26999 |
| Text | `tour_currency` | e.g. INR |
| Number | `tour_duration_days` | Integer |
| Number | `tour_nights` | Integer |
| URL or Text | `tour_hero_image` | Full `https://…` image URL |
| Textarea | `tour_gallery_json` | Valid JSON array: `["https://…","https://…"]` |
| Textarea | `tour_highlights` | One highlight **per line** |
| Textarea | `tour_included` | One bullet **per line** |
| Textarea | `tour_itinerary_json` | Valid JSON array of objects, see example below |

5. [ ] **Publish** the field group.

**`tour_itinerary_json` example** (paste as one line or pretty-printed JSON):

```json
[
  {"day":1,"title":"Arrive Bangkok","description":"Meet & greet, transfer to hotel."},
  {"day":2,"title":"Temples","description":"City tour and markets."}
]
```

6. [ ] **Tours → Add New** — fill **Title** (this becomes the tour name in React).
7. [ ] **Permalink / URL slug** — set the **slug** (must be unique). React uses: `/tours/YOUR-SLUG`.
8. [ ] Fill all **ACF fields** above.
9. [ ] **Featured Image** (optional) — if **`tour_hero_image`** is empty, React can fall back to featured image **when** you request `_embed=1` (already in app fetch).
10. [ ] **Excerpt** (optional) — not required by current mapper but good for WP archives.
11. [ ] **Publish** the tour.

Repeat for each package.

### Approach 2 — Edit meta via REST / external tool (developers only)

- [ ] Use **Application Passwords** (WP 5.6+) or JWT to `POST/PUT` `/wp-json/wp/v2/tour/{id}` with `meta: { ... }` keys matching the table in `mapWpTourToApp.js`.  
- [ ] Not covered here in UI steps — use WP REST handbook.

---

## Part D — Media (images)

- [ ] **Media → Add New** — upload hero & gallery images.
- [ ] Open each file → copy **full file URL** (`https://…`).
- [ ] Paste into **`tour_hero_image`** and into **`tour_gallery_json`** as URLs in the JSON array.
- [ ] Prefer **WebP** or optimized JPEG/PNG; keep file sizes reasonable.

---

## Part E — SEO plugins (WordPress side)

Install **one** SEO stack (not both unless you know what you’re doing):

### Option A — Yoast SEO
- [ ] **Plugins → Add New** → **Yoast SEO** → Install → Activate.
- [ ] **SEO → General** — run configuration wizard.
- [ ] For each **Tour**: set **SEO title**, **Meta description**, **Social image** (Yoast panel).
- [ ] **SEO → General → Features** — ensure **XML sitemaps** enabled.
- [ ] Submit sitemap URL in **Google Search Console** (see Part G).

### Option B — Rank Math
- [ ] Install **Rank Math SEO** → run setup wizard.
- [ ] Per **Tour**: focus keyword, title, description, schema where relevant.
- [ ] Enable **sitemap** module; submit in Search Console.

**Headless note:** Your React app sets its **own** `<title>` / meta via `PageSeo`. Yoast/Rank Math still help for **WP-native URLs** (if any), **sitemaps**, **redirects**, and **editorial discipline**. To **reuse Yoast meta in React**, you’d add a custom REST field or plugin feature — optional future work.

---

## Part F — CORS (so the browser can read WP from another domain)

If React runs on **`https://app.example.com`** and WP on **`https://cms.example.com`**, the browser blocks responses unless WP sends CORS headers.

Pick **one**:

1. **Same-origin proxy** (best): put **nginx/Cloudflare** in front so `https://app.example.com/wp-json` proxies to WP.
2. **CORS plugin** or small **mu-plugin** that sends `Access-Control-Allow-Origin: https://app.example.com` for `GET` `/wp-json/*` (see `docs/WORDPRESS_HEADLESS_SEO.md`).
3. **Local dev only:** Vite `server.proxy` in `vite.config.js` (commented example in repo).

- [ ] Test from browser **DevTools → Network** on your React site: tour API request must return **200** and JSON, not CORS error.

---

## Part G — Search engines

- [ ] **Settings → Reading** — if this is **staging**, enable **“Discourage search engines from indexing this site”** until production.
- [ ] Production: **disable** discouraging indexing.
- [ ] **Google Search Console** — add property for your **public React domain** (or WP domain if that’s canonical — pick one strategy).
- [ ] Submit **sitemap** from Yoast/Rank Math.
- [ ] Optional: **Bing Webmaster Tools** same way.

---

## Part H — Users & workflow

- [ ] **Users → Add New** — create **Editor** accounts (no Administrator for daily editors).
- [ ] **Users → Your Profile** — set display names, application passwords **only** if you use REST writes.
- [ ] **Settings → Discussion** — adjust comments/pingbacks if you use blog posts later.

---

## Part I — Connect the React app

On your **React** machine (not only WP):

- [ ] Copy **`.env.example`** → **`.env`** in the `holiday-tours` project.
- [ ] Set **`VITE_WORDPRESS_REST_URL`** to `https://YOUR-DOMAIN/wp-json` (no trailing slash).
- [ ] Set **`VITE_PUBLIC_SITE_URL`** to your **live React site** URL (for canonical tags), e.g. `https://www.yoursite.com`.
- [ ] Restart **`npm run dev`** or rebuild production.

- [ ] Open React **Tours** page — you should see **WordPress tours** if the REST request succeeds and returns posts.

---

## Part J — Troubleshooting checklist

| Problem | What to check |
|--------|----------------|
| `/wp-json/wp/v2/tour` is 404 | Permalinks saved; PHP loaded; no plugin blocking REST |
| Empty `[]` but you added tours | Posts are **Published**, not Draft |
| React still shows old seed | `.env` wrong or unset; or WP returned empty array; or browser cache |
| CORS error in console | Part F — proxy or headers |
| Meta always empty in JSON | Field names must match snippet; ACF field names must equal meta keys |
| `tour_itinerary_json` breaks site | Validate JSON (use jsonlint.com); must be array of objects |

---

## Quick reference — REST meta keys (must match)

React reads **`post.meta`** (and slug/title from the post):

- `tour_tagline` (string)  
- `tour_destination` (string)  
- `tour_price_from` (number)  
- `tour_currency` (string, e.g. `INR`)  
- `tour_duration_days` (integer)  
- `tour_nights` (integer)  
- `tour_hero_image` (string URL)  
- `tour_gallery_json` (string: JSON array of URLs)  
- `tour_highlights` (string: newline-separated)  
- `tour_included` (string: newline-separated)  
- `tour_itinerary_json` (string: JSON array of `{ day, title, description }`)

Post **slug** = React route `/tours/{slug}`.  
Post **title** = tour name in UI.

---

When all boxes are done, your CMS + REST pipeline matches what the React app expects.
