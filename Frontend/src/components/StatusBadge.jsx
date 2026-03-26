export default function StatusBadge({ status }) {
  const map = {
    Completed:  { bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e' },
    Pending:    { bg: '#fffbeb', color: '#d97706', dot: '#f59e0b' },
    Cancelled:  { bg: '#fef2f2', color: '#dc2626', dot: '#ef4444' },
    Processing: { bg: '#eff6ff', color: '#2563eb', dot: '#3b82f6' },
    Approved:   { bg: '#fdf4ff', color: '#9333ea', dot: '#a855f7' },
  }
  const s = map[status] || { bg: '#f1f5f9', color: '#64748b', dot: '#94a3b8' }

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: s.bg, color: s.color,
      padding: '4px 10px', borderRadius: '20px',
      fontSize: '12px', fontWeight: '600',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  )
}
