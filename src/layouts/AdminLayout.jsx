import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

const nav = ({ isActive }) =>
  `block rounded-xl px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-white/10 text-white' : 'text-teal-100/90 hover:bg-white/5 hover:text-white'
  }`

export default function AdminLayout() {
  const { logout, authed } = useAdminAuth()
  if (!authed) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="flex min-h-dvh">
        <motion.aside
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden w-56 shrink-0 border-r border-white/10 bg-gradient-to-b from-teal-950 to-slate-950 lg:block"
        >
          <div className="flex h-full flex-col p-4">
            <p className="font-display text-lg font-semibold text-white">Admin</p>
            <p className="mt-0.5 text-xs text-teal-200/80">Manage tours & media</p>
            <nav className="mt-8 flex flex-col gap-1">
              <NavLink to="/admin/tours" className={nav}>
                All tours
              </NavLink>
              <NavLink to="/admin/tours/new" className={nav}>
                New tour
              </NavLink>
            </nav>
            <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
              <NavLink
                to="/"
                className="block rounded-xl px-3 py-2 text-sm text-teal-100/80 hover:bg-white/5 hover:text-white"
              >
                ← View site
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-left text-sm font-medium text-white hover:bg-white/10"
              >
                Log out
              </button>
            </div>
          </div>
        </motion.aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur lg:hidden">
            <NavLink to="/admin/tours" className="text-sm font-semibold text-teal-300">
              All tours
            </NavLink>
            <NavLink to="/admin/tours/new" className="text-sm font-semibold text-orange-300">
              + New
            </NavLink>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
            >
              Log out
            </button>
          </header>
          <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
