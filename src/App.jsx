import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Tours from './pages/Tours.jsx'
import TourDetail from './pages/TourDetail.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/admin/Login.jsx'
import TourList from './pages/admin/TourList.jsx'
import TourForm from './pages/admin/TourForm.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tours/:slug" element={<TourDetail />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="tours" replace />} />
          <Route path="tours" element={<TourList />} />
          <Route path="tours/new" element={<TourForm />} />
          <Route path="tours/edit/:id" element={<TourForm />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
