import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SITE_NAME, SITE_TAGLINE, SITE_TITLE } from '../constants/site.js'

const link = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? 'bg-teal-900 text-white shadow-lg shadow-teal-900/25' : 'text-slate-600 hover:bg-white/80'
  }`

export default function PublicLayout() {
  useEffect(() => {
    document.title = SITE_TITLE
  }, [])

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-slate-50 via-white to-teal-50/40">
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-800 text-lg text-white shadow-lg shadow-teal-600/30">
              ✈
            </span>
            <div className="leading-tight">
              <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
                {SITE_NAME}
              </span>
              <p className="text-xs font-medium text-teal-700">{SITE_TAGLINE}</p>
            </div>
          </NavLink>
          <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            <NavLink to="/" end className={link}>
              Home
            </NavLink>
            <NavLink to="/tours" className={link}>
              Tours
            </NavLink>
            <NavLink to="/contact" className={link}>
              Contact
            </NavLink>
            <NavLink
              to="/admin/login"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-teal-300 hover:text-teal-900"
            >
              Admin
            </NavLink>
          </nav>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.35 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>

      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-lg font-semibold text-white">{SITE_NAME}</p>
            <p className="mt-1 max-w-md text-sm text-slate-400">
              Demo travel site — packages, itineraries & imagery are sample content for UI/UX showcase.
            </p>
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {SITE_NAME} (demo)</p>
        </div>
      </footer>
    </div>
  )
}
