import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/dashboard':        'Dashboard',
  '/suppliers':        'Suppliers',
  '/products':         'Products',
  '/purchase-requests':'Purchase Requests',
  '/purchase-orders':  'Purchase Orders',
  '/goods-receipt':    'Goods Receipt',
  '/payments':         'Payments',
  '/reports':          'Reports',
  '/settings':         'Settings',
}

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || 'PSMS'
  const sidebarW = collapsed ? 72 : 256

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{
        marginLeft: `${sidebarW}px`,
        flex: 1, display: 'flex', flexDirection: 'column',
        transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
        minWidth: 0,
      }}>
        <DashboardNavbar pageTitle={title} />
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
