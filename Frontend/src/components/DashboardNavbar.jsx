import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function DashboardNavbar({ pageTitle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const notifications = [
    { id: 1, text: 'New purchase order PO-1025 created', time: '2m ago', unread: true },
    { id: 2, text: 'Supplier ABC updated contact info', time: '1h ago', unread: true },
    { id: 3, text: 'Payment of ₹45,000 approved', time: '3h ago', unread: false },
    { id: 4, text: 'Goods receipt GR-103 completed', time: '5h ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
      padding: '0 24px',
      height: '64px',
      display: 'flex', alignItems: 'center', gap: '16px',
    }}>
      {/* Page Title */}
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{pageTitle}</h1>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '280px', flex: 1 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          placeholder="Search orders, suppliers..."
          style={{
            width: '100%', padding: '8px 12px 8px 38px',
            border: '1.5px solid #e2e8f0', borderRadius: '10px',
            fontSize: '14px', outline: 'none', background: '#f8fafc',
            color: '#0f172a', transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#6366f1'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false) }}
          style={{
            position: 'relative', background: notifOpen ? '#f1f5f9' : 'none',
            border: '1.5px solid #e2e8f0', borderRadius: '10px',
            cursor: 'pointer', padding: '8px', display: 'flex',
            color: '#64748b', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
          onMouseLeave={e => { if (!notifOpen) e.currentTarget.style.background = 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              background: '#ef4444', color: '#fff', borderRadius: '50%',
              width: '18px', height: '18px', fontSize: '11px', fontWeight: '700',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fff',
            }}>{unreadCount}</span>
          )}
        </button>

        {notifOpen && (
          <div style={{
            position: 'absolute', right: 0, top: '48px',
            background: '#fff', borderRadius: '14px', width: '320px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0',
            padding: '8px 0', zIndex: 100,
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>Notifications</span>
              <span style={{ fontSize: '12px', color: '#6366f1', cursor: 'pointer', fontWeight: '600' }}>Mark all read</span>
            </div>
            {notifications.map(n => (
              <div key={n.id} style={{
                padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
                background: n.unread ? '#fafaff' : '#fff',
                borderLeft: n.unread ? '3px solid #6366f1' : '3px solid transparent',
                cursor: 'pointer', transition: 'background 0.15s',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.unread ? '#6366f1' : '#e2e8f0', flexShrink: 0, marginTop: '5px' }} />
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '13px', color: '#0f172a', fontWeight: n.unread ? '600' : '400' }}>{n.text}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Avatar + Dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false) }}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'none', border: '1.5px solid #e2e8f0',
            borderRadius: '12px', padding: '6px 12px 6px 6px',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => { if (!dropdownOpen) e.currentTarget.style.background = 'none' }}
        >
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: '700', fontSize: '14px', flexShrink: 0,
          }}>{user?.avatar || 'U'}</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>{user?.fullName || 'User'}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{user?.role || 'Admin'}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#94a3b8"><path d="M7 10l5 5 5-5z"/></svg>
        </button>

        {dropdownOpen && (
          <div style={{
            position: 'absolute', right: 0, top: '52px',
            background: '#fff', borderRadius: '14px', width: '200px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0',
            padding: '8px', zIndex: 100,
          }}>
            {[
              { label: 'Profile', icon: '👤', path: '/settings' },
              { label: 'Settings', icon: '⚙️', path: '/settings' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => { navigate(item.path); setDropdownOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '10px 12px', borderRadius: '8px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '14px', color: '#374151', fontWeight: '500',
                  textAlign: 'left', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
            <button
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', color: '#ef4444', fontWeight: '500',
                textAlign: 'left', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
