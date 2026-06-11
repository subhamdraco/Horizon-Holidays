# Horizon Holidays (React demo)

Public name is set in **`src/constants/site.js`** (`SITE_NAME`, `SITE_TAGLINE`, `SITE_TITLE`) so you can rebrand in one place.

Inspired by [bookmyholiday.in](https://bookmyholiday.in/) — modern marketing UI with **Framer Motion** animations, **Tailwind CSS v4**, and a simple **admin panel** for tours.

## Run locally

```bash
cd holiday-tours
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Admin panel

1. Go to **`/admin/login`**
2. Password: **`holiday2026`** (demo only — replace with real auth for production)
3. Manage tours: **list**, **create**, **edit**, **delete**
4. Itinerary: add/remove days, title + description per day
5. Images: paste **hero** and optional **gallery** URLs (Unsplash works). Seed data includes curated images.

Tour data is stored in **`localStorage`** under `holiday-tours-db-v1` (per browser).

## Stack

- React 19 + Vite 8  
- React Router 7  
- Framer Motion  
- Tailwind CSS v4 (`@tailwindcss/vite`)

## WordPress (headless CMS) + SEO

Full WordPress checklist (nothing skipped): **`docs/WORDPRESS_SETUP_STEP_BY_STEP.md`**

Full guide: **`docs/WORDPRESS_HEADLESS_SEO.md`** — REST API, CORS, sitemaps, Yoast/Rank Math, canonical strategy, and production SEO.

| Artifact | Purpose |
|----------|---------|
| `docs/wp-theme-functions-snippet.php` | Register `tour` CPT + REST meta for the React mapper |
| `.env.example` | `VITE_WORDPRESS_REST_URL`, `VITE_PUBLIC_SITE_URL` |
| `src/services/wpClient.js` | Fetch tours from WP |
| `src/components/seo/PageSeo.jsx` | `<title>`, meta, canonical, OG, JSON-LD |

When `VITE_WORDPRESS_REST_URL` is set, **`ToursProvider`** loads published tours from WordPress on startup (falls back to seed/localStorage if the request fails or returns nothing).

## Project path

`Desktop/Projects/Personal/codes/holiday-tours`
