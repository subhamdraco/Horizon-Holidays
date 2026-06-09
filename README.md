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

## Project path

`Desktop/Projects/Personal/codes/holiday-tours`
