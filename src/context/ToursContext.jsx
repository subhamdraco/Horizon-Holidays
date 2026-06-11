import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { SEED_TOURS } from '../data/seedTours.js'
import { isWpEnabled } from '../config/wp.js'
import { fetchToursFromWordPress } from '../services/wpClient.js'

const STORAGE_KEY = 'holiday-tours-db-v1'

const ToursContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(SEED_TOURS)
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return structuredClone(SEED_TOURS)
    return parsed
  } catch {
    return structuredClone(SEED_TOURS)
  }
}

function persist(tours) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tours))
}

export function ToursProvider({ children }) {
  const [tours, setTours] = useState(loadInitial)
  const wpHydrated = useRef(false)

  useEffect(() => {
    if (!isWpEnabled() || wpHydrated.current) return
    let cancelled = false
    ;(async () => {
      const fromWp = await fetchToursFromWordPress()
      if (!cancelled && fromWp.length > 0) {
        wpHydrated.current = true
        setTours(fromWp)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    persist(tours)
  }, [tours])

  const getBySlug = useCallback((slug) => tours.find((t) => t.slug === slug), [tours])
  const getById = useCallback((id) => tours.find((t) => t.id === id), [tours])

  const saveTour = useCallback((tour) => {
    setTours((prev) => {
      const i = prev.findIndex((t) => t.id === tour.id)
      if (i === -1) return [...prev, tour]
      const next = [...prev]
      next[i] = tour
      return next
    })
  }, [])

  const deleteTour = useCallback((id) => {
    setTours((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const resetToSeed = useCallback(() => {
    setTours(structuredClone(SEED_TOURS))
  }, [])

  const value = useMemo(
    () => ({ tours, getBySlug, getById, saveTour, deleteTour, resetToSeed }),
    [tours, getBySlug, getById, saveTour, deleteTour, resetToSeed],
  )

  return <ToursContext.Provider value={value}>{children}</ToursContext.Provider>
}

export function useTours() {
  const ctx = useContext(ToursContext)
  if (!ctx) throw new Error('useTours must be used within ToursProvider')
  return ctx
}
