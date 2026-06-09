import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { ADMIN_PASSWORD } from '../constants/admin.js'

const SESSION_KEY = 'holiday-tours-admin'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }, [])

  const value = useMemo(() => ({ authed, login, logout }), [authed, login, logout])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
