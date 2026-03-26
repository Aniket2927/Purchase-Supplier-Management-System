/* Generic placeholder page used for routes not yet implemented */
export default function PlaceholderPage({ title, emoji = '🚧' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', gap: '16px', textAlign: 'center',
    }}>
      <div style={{ fontSize: '72px' }}>{emoji}</div>
      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>{title}</h2>
      <p style={{ margin: 0, color: '#64748b', maxWidth: '360px', fontSize: '15px' }}>
        This module is coming soon. The dashboard and core navigation are fully functional.
      </p>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: '#eef2ff', color: '#6366f1', padding: '10px 20px', borderRadius: '12px',
        fontWeight: '600', fontSize: '14px',
      }}>
        🛠️ Under Development
      </div>
    </div>
  )
}
