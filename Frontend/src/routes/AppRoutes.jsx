import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import LandingPage    from '../pages/LandingPage'
import Login          from '../pages/Login'
import Signup         from '../pages/Signup'
import Dashboard      from '../pages/Dashboard'
import PlaceholderPage from '../pages/PlaceholderPage'
import MainLayout     from '../layouts/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute'

function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  )
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public */}
      <Route path="/"       element={<LandingPage />} />
      <Route path="/login"  element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />

      {/* Protected – dashboard area */}
      <Route path="/dashboard"        element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/suppliers"        element={<DashboardLayout><PlaceholderPage title="Suppliers" emoji="🏭" /></DashboardLayout>} />
      <Route path="/products"         element={<DashboardLayout><PlaceholderPage title="Products" emoji="📦" /></DashboardLayout>} />
      <Route path="/purchase-requests"element={<DashboardLayout><PlaceholderPage title="Purchase Requests" emoji="📋" /></DashboardLayout>} />
      <Route path="/purchase-orders"  element={<DashboardLayout><PlaceholderPage title="Purchase Orders" emoji="🛒" /></DashboardLayout>} />
      <Route path="/goods-receipt"    element={<DashboardLayout><PlaceholderPage title="Goods Receipt" emoji="📬" /></DashboardLayout>} />
      <Route path="/payments"         element={<DashboardLayout><PlaceholderPage title="Payments" emoji="💳" /></DashboardLayout>} />
      <Route path="/reports"          element={<DashboardLayout><PlaceholderPage title="Reports" emoji="📊" /></DashboardLayout>} />
      <Route path="/settings"         element={<DashboardLayout><PlaceholderPage title="Settings" emoji="⚙️" /></DashboardLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
