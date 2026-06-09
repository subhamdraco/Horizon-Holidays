import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTours } from '../../context/ToursContext.jsx'
import { slugify } from '../../utils/slugify.js'

function linesToArray(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function defaultItineraryNew() {
  return [
    { day: 1, title: 'Arrival', description: 'Airport pickup and hotel check-in.' },
    { day: 2, title: 'Explore', description: 'Guided city highlights.' },
  ]
}

function TourFormInner() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const { getById, saveTour } = useTours()
  const existing = id ? getById(id) : undefined

  const [title, setTitle] = useState(() => existing?.title ?? '')
  const [slug, setSlug] = useState(() => existing?.slug ?? '')
  const [autoSlug, setAutoSlug] = useState(() => !existing)
  const [tagline, setTagline] = useState(() => existing?.tagline ?? '')
  const [destination, setDestination] = useState(() => existing?.destination ?? '')
  const [durationDays, setDurationDays] = useState(() => existing?.durationDays ?? 5)
  const [nights, setNights] = useState(() => existing?.nights ?? 4)
  const [priceFrom, setPriceFrom] = useState(() => existing?.priceFrom ?? 19999)
  const [currency, setCurrency] = useState(() => existing?.currency ?? 'INR')
  const [heroImage, setHeroImage] = useState(
    () =>
      existing?.heroImage ??
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80',
  )
  const [galleryText, setGalleryText] = useState(() => (existing?.gallery ?? []).join('\n'))
  const [highlightsText, setHighlightsText] = useState(() => (existing?.highlights ?? []).join('\n'))
  const [includedText, setIncludedText] = useState(() => (existing?.included ?? []).join('\n'))
  const [itinerary, setItinerary] = useState(() =>
    existing?.itinerary?.length
      ? existing.itinerary.map((d) => ({ ...d }))
      : defaultItineraryNew(),
  )

  if (!isNew && id && !existing) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
        <p>Tour not found.</p>
        <Link to="/admin/tours" className="mt-4 inline-block font-semibold text-teal-300 hover:underline">
          ← Back to list
        </Link>
      </div>
    )
  }

  function updateItin(i, field, value) {
    setItinerary((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
  }

  function addItinRow() {
    setItinerary((prev) => [...prev, { day: prev.length + 1, title: '', description: '' }])
  }

  function removeItinRow(i) {
    setItinerary((prev) => prev.filter((_, j) => j !== i).map((row, j) => ({ ...row, day: j + 1 })))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const tourId = isNew ? crypto.randomUUID() : existing.id
    const finalSlug = autoSlug ? slugify(title) : slug || slugify(title)
    const itin = itinerary.map((row, j) => ({
      day: j + 1,
      title: row.title || `Day ${j + 1}`,
      description: row.description || '',
    }))
    const tour = {
      id: tourId,
      slug: finalSlug,
      title,
      tagline,
      destination,
      durationDays: Number(durationDays) || 1,
      nights: Number(nights) || 0,
      priceFrom: Number(priceFrom) || 0,
      currency,
      heroImage: heroImage.trim(),
      gallery: linesToArray(galleryText),
      highlights: linesToArray(highlightsText),
      included: linesToArray(includedText),
      itinerary: itin,
    }
    saveTour(tour)
    navigate('/admin/tours')
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Link to="/admin/tours" className="text-sm font-semibold text-teal-300 hover:underline">
          ← Tours
        </Link>
        <h1 className="font-display text-3xl font-bold text-white">{isNew ? 'New tour' : 'Edit tour'}</h1>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
      >
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-teal-100">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">URL slug</label>
            <input
              value={autoSlug ? slugify(title) : slug}
              onChange={(e) => {
                setAutoSlug(false)
                setSlug(e.target.value)
              }}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
            <label className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <input type="checkbox" checked={autoSlug} onChange={(e) => setAutoSlug(e.target.checked)} />
              Auto-update slug from title
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">Destination</label>
            <input
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-teal-100">Tagline</label>
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">Days</label>
            <input
              type="number"
              min={1}
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">Nights</label>
            <input
              type="number"
              min={0}
              value={nights}
              onChange={(e) => setNights(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">Price from</label>
            <input
              type="number"
              min={0}
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="AED">AED</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-teal-100">Hero image URL</label>
            <input
              required
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
            {heroImage && (
              <img src={heroImage} alt="" className="mt-3 max-h-48 w-full rounded-xl object-cover" />
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-teal-100">Gallery image URLs (one per line)</label>
            <textarea
              value={galleryText}
              onChange={(e) => setGalleryText(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400/60"
              placeholder="https://…"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">Highlights (one per line)</label>
            <textarea
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              rows={5}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-teal-100">Included (one per line)</label>
            <textarea
              value={includedText}
              onChange={(e) => setIncludedText(e.target.value)}
              rows={5}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400/60"
            />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-white">Itinerary</h2>
            <button
              type="button"
              onClick={addItinRow}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
            >
              + Add day
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {itinerary.map((row, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-300">Day {i + 1}</span>
                  {itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItinRow(i)}
                      className="text-xs font-semibold text-rose-400 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  placeholder="Title"
                  value={row.title}
                  onChange={(e) => updateItin(i, 'title', e.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400/50"
                />
                <textarea
                  placeholder="Description"
                  value={row.description}
                  onChange={(e) => updateItin(i, 'description', e.target.value)}
                  rows={2}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400/50"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            className="rounded-full bg-orange-500 px-8 py-3 text-sm font-bold text-slate-900 shadow-lg hover:bg-orange-400"
          >
            Save tour
          </button>
          <Link
            to="/admin/tours"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:bg-white/5"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  )
}

/** Remount when switching new ↔ edit or between tours so form state reinitializes */
export default function TourForm() {
  const { id } = useParams()
  return <TourFormInner key={id || 'new'} />
}
