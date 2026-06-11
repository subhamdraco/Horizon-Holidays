import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTours } from '../context/ToursContext.jsx'
import PageSeo from '../components/seo/PageSeo.jsx'
import { SITE_NAME, SITE_TITLE } from '../constants/site.js'
import { getPublicSiteUrl } from '../config/wp.js'

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
}

const services = [
  { title: 'Flight bookings', icon: '🛫', desc: 'Domestic & international fares' },
  { title: 'Hotel bookings', icon: '🏨', desc: 'Boutique to 5-star stays' },
  { title: 'Sightseeing', icon: '🗺️', desc: 'Curated local experiences' },
  { title: 'Cruise', icon: '🚢', desc: 'Ocean & river journeys' },
]

export default function Home() {
  const { tours } = useTours()
  const featured = tours.slice(0, 6)
  const weekend = tours.slice(0, 4)

  return (
    <div>
      <PageSeo
        title={SITE_TITLE}
        description={`${SITE_NAME} — international packages, flights, hotels & curated itineraries.`}
        canonicalPath="/"
        ogImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: `${getPublicSiteUrl()}/`,
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-900/70" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-300"
          >
            Explore a different way to travel
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            International holidays crafted for memories that last.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-xl text-lg text-teal-50/90"
          >
            Flights, hotels, transfers & hand-picked itineraries — one place to plan your next escape.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/tours"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-xl shadow-orange-500/30 transition hover:scale-[1.02] hover:shadow-orange-400/40"
            >
              Browse packages
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-700">International destinations</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Pick your next story</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <motion.article
              key={t.id}
              custom={i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={t.heroImage}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl font-bold text-white">{t.title}</h3>
                <p className="mt-1 text-sm text-teal-100/90">{t.destination}</p>
                <p className="mt-2 text-sm font-semibold text-orange-200">
                  From ₹ {t.priceFrom.toLocaleString('en-IN')}
                </p>
                <Link
                  to={`/tours/${t.slug}`}
                  className="mt-3 inline-flex text-sm font-semibold text-white underline decoration-orange-400 decoration-2 underline-offset-4 hover:text-orange-100"
                >
                  View itinerary →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Weekend */}
      <section className="border-y border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50/80 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-700">Free this weekend</p>
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Exclusive getaways near you</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weekend.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-orange-100 bg-white/90 p-5 shadow-md backdrop-blur"
              >
                <h3 className="font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm font-bold text-orange-600">From ₹ {t.priceFrom.toLocaleString('en-IN')}</p>
                <Link to={`/tours/${t.slug}`} className="mt-3 block text-sm font-medium text-teal-800 hover:underline">
                  Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-700">Our valuable services</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">What we do</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
            >
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
