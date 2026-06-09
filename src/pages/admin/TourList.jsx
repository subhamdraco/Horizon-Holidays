import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTours } from '../../context/ToursContext.jsx'

export default function TourList() {
  const { tours, deleteTour } = useTours()

  function handleDelete(id, title) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return
    deleteTour(id)
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Tours</h1>
          <p className="mt-1 text-sm text-slate-400">Add, edit, or remove packages. Data is stored in this browser (localStorage).</p>
        </div>
        <Link
          to="/admin/tours/new"
          className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-lg hover:bg-orange-400"
        >
          + New tour
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 bg-black/20 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Tour</th>
              <th className="px-4 py-3 font-semibold">Destination</th>
              <th className="px-4 py-3 font-semibold">From</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((t, i) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-white/5 last:border-0 hover:bg-white/5"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img src={t.heroImage} alt="" className="h-12 w-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-white">{t.title}</p>
                      <p className="text-xs text-slate-500">{t.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-300">{t.destination}</td>
                <td className="px-4 py-4 font-semibold text-orange-300">₹ {t.priceFrom.toLocaleString('en-IN')}</td>
                <td className="px-4 py-4 text-right">
                  <Link
                    to={`/admin/tours/edit/${t.id}`}
                    className="mr-3 font-semibold text-teal-300 hover:text-teal-200"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id, t.title)}
                    className="font-semibold text-rose-400 hover:text-rose-300"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
