import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl font-bold text-slate-900">Contact</h1>
        <p className="mt-4 text-slate-600">
          This demo focuses on the public site + admin CRUD. Wire your form to email, CRM, or WhatsApp Business API.
        </p>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label className="text-sm font-semibold text-slate-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-teal-500/30 focus:ring-4"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-teal-500/30 focus:ring-4"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700" htmlFor="msg">
            Message
          </label>
          <textarea
            id="msg"
            rows={4}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-teal-500/30 focus:ring-4"
            placeholder="Tell us about your dream holiday…"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-teal-700 to-teal-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/25"
        >
          Send (demo)
        </button>
      </motion.form>
    </div>
  )
}
