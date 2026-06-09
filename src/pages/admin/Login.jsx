import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../../context/AdminAuthContext.jsx'
import { ADMIN_PASSWORD } from '../../constants/admin.js'

export default function Login() {
  const { authed, login } = useAdminAuth()
  const nav = useNavigate()
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  if (authed) return <Navigate to="/admin/tours" replace />

  function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    if (login(password)) nav('/admin/tours')
    else setErr('Invalid password')
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        <h1 className="font-display text-2xl font-bold text-white">Admin sign in</h1>
        <p className="mt-2 text-sm text-teal-100/80">
          Demo password: <code className="rounded bg-black/30 px-2 py-0.5 text-orange-200">{ADMIN_PASSWORD}</code>
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="pw" className="text-sm font-medium text-teal-50">
              Password
            </label>
            <input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-white outline-none ring-orange-400/30 placeholder:text-slate-400 focus:ring-4"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {err && <p className="text-sm font-medium text-rose-300">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 py-3 text-sm font-bold text-slate-900 shadow-lg"
          >
            Enter admin
          </button>
        </form>
      </motion.div>
    </div>
  )
}
