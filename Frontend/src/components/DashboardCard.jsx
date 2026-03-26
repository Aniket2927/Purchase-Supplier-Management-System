export default function DashboardCard({ title, value, icon: Icon, color, trend, trendLabel }) {
  const colors = {
    blue:   { bg: 'linear-gradient(135deg, #3b82f6, #6366f1)', light: '#eff6ff', text: '#2563eb' },
    green:  { bg: 'linear-gradient(135deg, #10b981, #34d399)', light: '#f0fdf4', text: '#059669' },
    yellow: { bg: 'linear-gradient(135deg, #f59e0b, #fbbf24)', light: '#fffbeb', text: '#d97706' },
    purple: { bg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', light: '#faf5ff', text: '#7c3aed' },
    red:    { bg: 'linear-gradient(135deg, #ef4444, #f87171)', light: '#fef2f2', text: '#dc2626' },
  }
  const c = colors[color] || colors.blue

  return (
    <div
      style={{
        background: '#fff', borderRadius: '16px', padding: '24px',
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
        border: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', gap: '20px',
        transition: 'transform 0.25s, box-shadow 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 12px rgba(0,0,0,0.06)' }}
    >
      <div style={{
        width: '56px', height: '56px', borderRadius: '14px',
        background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, boxShadow: `0 6px 16px ${c.text}30`,
      }}>
        <Icon size={26} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#94a3b8', fontWeight: '500', letterSpacing: '0.2px' }}>{title}</p>
        <p style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{value}</p>
        {trend != null && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            background: trend >= 0 ? '#f0fdf4' : '#fef2f2',
            color: trend >= 0 ? '#16a34a' : '#dc2626',
            fontSize: '12px', fontWeight: '600', padding: '2px 8px', borderRadius: '20px',
          }}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
          </span>
        )}
      </div>
    </div>
  )
}
