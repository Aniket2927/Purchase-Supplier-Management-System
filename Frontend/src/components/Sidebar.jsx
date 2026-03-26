import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { label: 'Dashboard',         path: '/dashboard',          icon: HomeIcon },
  { label: 'Suppliers',         path: '/suppliers',          icon: TruckIcon },
  { label: 'Products',          path: '/products',           icon: BoxIcon },
  { label: 'Purchase Requests', path: '/purchase-requests',  icon: ClipboardIcon },
  { label: 'Purchase Orders',   path: '/purchase-orders',    icon: ShoppingCartIcon },
  { label: 'Goods Receipt',     path: '/goods-receipt',      icon: PackageIcon },
  { label: 'Payments',          path: '/payments',           icon: CreditCardIcon },
  { label: 'Reports',           path: '/reports',            icon: ChartBarIcon },
  { label: 'Settings',          path: '/settings',           icon: CogIcon },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '256px',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 50,
        overflowX: 'hidden',
        boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #334155' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9', letterSpacing: '-0.3px' }}>PSMS</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Procurement Suite</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
            color: '#64748b', padding: '4px', borderRadius: '6px', display: 'flex', flexShrink: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#f1f5f9'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        >
          {collapsed
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5v14L5 12z"/></svg>
          }
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '10px', marginBottom: '4px',
              textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden',
              fontSize: '14px', fontWeight: '500',
              background: isActive ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
              color: isActive ? '#fff' : '#94a3b8',
              boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
              transition: 'all 0.2s',
            })}
            onMouseEnter={e => { if (!e.currentTarget.style.background.includes('gradient')) { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#e2e8f0'; } }}
            onMouseLeave={e => { if (!e.currentTarget.style.background.includes('gradient')) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
          >
            {({ isActive }) => (
              <>
                <span style={{ flexShrink: 0, color: isActive ? '#fff' : '#64748b' }}>
                  <Icon size={18} />
                </span>
                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid #334155' }}>
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '10px', width: '100%',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#ef4444', fontSize: '14px', fontWeight: '500',
            whiteSpace: 'nowrap', overflow: 'hidden', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <LogoutIcon size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

/* ── Simple inline SVG icon components ── */
function HomeIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
}
function TruckIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5 1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-1c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/></svg>
}
function BoxIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/></svg>
}
function ClipboardIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
}
function ShoppingCartIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h11v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
}
function PackageIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21H5.71c.49-1 1.01-2 1.74-2.86.79 1.08 1.64 2 2.55 2.86h2.31c-1.53-1.49-2.55-3.34-3.1-5.12C10.79 18.3 14 21 17 21c1.1 0 2-.9 2-2h-1c-1.65 0-3.78-.57-5.77-2.14C13.87 15.9 15.5 14 17 14c1.1 0 2-.9 2-2h-1c-.45 0-.87-.07-1.25-.18.26-.82.47-1.77.54-2.82H21V8h-4z"/></svg>
}
function CreditCardIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
}
function ChartBarIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
}
function CogIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
}
function LogoutIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
}
