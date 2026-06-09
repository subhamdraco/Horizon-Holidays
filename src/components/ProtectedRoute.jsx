import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'

export default function ProtectedRoute() {
  const { authed } = useAdminAuth()
  if (!authed) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
