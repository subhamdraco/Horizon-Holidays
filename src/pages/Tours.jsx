import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTours } from '../context/ToursContext.jsx'
import PageSeo from '../components/seo/PageSeo.jsx'
import { SITE_NAME } from '../constants/site.js'

export default function Tours() {
  const { tours } = useTours()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageSeo
        title={`Holiday packages | ${SITE_NAME}`}
        description="Browse international and weekend holiday packages with day-by-day itineraries and transparent pricing."
        canonicalPath="/tours"
      />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-slate-900">All holiday packages</h1>
        <p className="mt-3 text-slate-600">
          Curated itineraries with transparent pricing. Tap a card to explore day-by-day plans.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((t, i) => (
          <motion.article
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.35) }}
            className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5"
          >
            <Link to={`/tours/${t.slug}`} className="relative aspect-[16/10] overflow-hidden">
              <img src={t.heroImage} alt="" className="h-full w-full object-cover transition hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {t.durationDays} days · {t.nights} nights
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-display text-xl font-bold text-slate-900">
                <Link to={`/tours/${t.slug}`} className="hover:text-teal-800">
                  {t.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-600">{t.tagline}</p>
              <p className="mt-4 text-lg font-bold text-orange-600">From ₹ {t.priceFrom.toLocaleString('en-IN')}</p>
              <Link
                to={`/tours/${t.slug}`}
                className="mt-auto inline-flex pt-6 text-sm font-bold text-teal-800 hover:underline"
              >
                Full itinerary →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
