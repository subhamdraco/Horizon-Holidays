import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTours } from '../context/ToursContext.jsx'

export default function TourDetail() {
  const { slug } = useParams()
  const { getBySlug } = useTours()
  const tour = slug ? getBySlug(slug) : undefined

  if (!tour) return <Navigate to="/tours" replace />

  return (
    <div>
      <section className="relative h-[min(52vh,420px)] overflow-hidden">
        <img src={tour.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">{tour.destination}</p>
            <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">{tour.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-teal-50/90">{tour.tagline}</p>
            <p className="mt-4 text-2xl font-bold text-orange-300">From ₹ {tour.priceFrom.toLocaleString('en-IN')}</p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-slate-900">Day-by-day itinerary</h2>
            <ol className="mt-8 space-y-6">
              {tour.itinerary.map((d, i) => (
                <motion.li
                  key={d.day}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 pl-14 shadow-sm"
                >
                  <span className="absolute left-5 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-teal-900 text-sm font-bold text-white">
                    {d.day}
                  </span>
                  <h3 className="font-semibold text-slate-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.description}</p>
                </motion.li>
              ))}
            </ol>

            {tour.gallery?.length > 0 && (
              <div className="mt-14">
                <h2 className="font-display text-2xl font-bold text-slate-900">Gallery</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {tour.gallery.map((url) => (
                    <img key={url} src={url} alt="" className="aspect-video rounded-2xl object-cover" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-display text-lg font-bold text-slate-900">Highlights</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-teal-600">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-slate-900">Included</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {tour.included.map((x) => (
                  <li key={x}>· {x}</li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-teal-900 py-3 text-sm font-bold text-white hover:bg-teal-800"
              >
                Enquire now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
