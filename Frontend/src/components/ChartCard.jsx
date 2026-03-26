export default function ChartCard({ title, subtitle, children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', padding: '24px',
      boxShadow: '0 1px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{title}</h3>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
