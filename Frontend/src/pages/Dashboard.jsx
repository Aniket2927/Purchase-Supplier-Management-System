import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import DashboardCard from '../components/DashboardCard'
import ChartCard from '../components/ChartCard'
import StatusBadge from '../components/StatusBadge'

/* ─── Mock data ─── */
const STATS = [
  { title: 'Total Suppliers',   value: '120', color: 'blue',   trend: 12, trendLabel: 'vs last month', icon: UsersIcon },
  { title: 'Total Products',    value: '540', color: 'green',  trend: 8,  trendLabel: 'vs last month', icon: BoxIcon },
  { title: 'Pending Requests',  value: '32',  color: 'yellow', trend: -5, trendLabel: 'vs last month', icon: ClockIcon },
  { title: 'Completed Orders',  value: '215', color: 'purple', trend: 18, trendLabel: 'vs last month', icon: CheckIcon },
]

const BAR_DATA = [
  { month: 'Jan', orders: 42 }, { month: 'Feb', orders: 58 },
  { month: 'Mar', orders: 71 }, { month: 'Apr', orders: 53 },
  { month: 'May', orders: 88 }, { month: 'Jun', orders: 95 },
  { month: 'Jul', orders: 67 }, { month: 'Aug', orders: 110 },
  { month: 'Sep', orders: 82 }, { month: 'Oct', orders: 74 },
  { month: 'Nov', orders: 91 }, { month: 'Dec', orders: 120 },
]

const PIE_DATA = [
  { name: 'Completed', value: 215, color: '#10b981' },
  { name: 'Pending',   value: 32,  color: '#f59e0b' },
  { name: 'Cancelled', value: 14,  color: '#ef4444' },
  { name: 'Processing',value: 28,  color: '#6366f1' },
]

const ORDERS = [
  { id: 'PO-1001', supplier: 'ABC Suppliers',    date: '01 Jan 2025', amount: '₹25,000', status: 'Completed' },
  { id: 'PO-1002', supplier: 'GlobalTech Pvt.',  date: '05 Jan 2025', amount: '₹12,500', status: 'Pending' },
  { id: 'PO-1003', supplier: 'Rajesh Traders',   date: '08 Jan 2025', amount: '₹45,000', status: 'Processing' },
  { id: 'PO-1004', supplier: 'Sun Electronics',  date: '10 Jan 2025', amount: '₹8,750',  status: 'Completed' },
  { id: 'PO-1005', supplier: 'Prime Materials',  date: '12 Jan 2025', amount: '₹33,200', status: 'Cancelled' },
  { id: 'PO-1006', supplier: 'Delta Components', date: '15 Jan 2025', amount: '₹19,800', status: 'Pending' },
  { id: 'PO-1007', supplier: 'Vertex Supplies',  date: '18 Jan 2025', amount: '₹56,400', status: 'Completed' },
  { id: 'PO-1008', supplier: 'KM Enterprises',   date: '20 Jan 2025', amount: '₹7,600',  status: 'Processing' },
]

const QUICK_ACTIONS = [
  { label: 'Create Supplier',         icon: '🏭', color: '#6366f1', bg: '#eef2ff' },
  { label: 'Create Product',          icon: '📦', color: '#10b981', bg: '#ecfdf5' },
  { label: 'Create Purchase Request', icon: '📋', color: '#f59e0b', bg: '#fffbeb' },
  { label: 'Create Purchase Order',   icon: '🛒', color: '#8b5cf6', bg: '#faf5ff' },
]

const ITEMS_PER_PAGE = 5

export default function Dashboard() {
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)

  const filtered = ORDERS.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.supplier.toLowerCase().includes(search.toLowerCase()) ||
    o.status.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* ─── Summary Cards ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {STATS.map(s => (
          <DashboardCard key={s.title} {...s} />
        ))}
      </div>

      {/* ─── Charts row ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        <ChartCard title="Monthly Purchase Orders" subtitle="Full year overview">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={BAR_DATA} margin={{ top: 4, right: 16, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                cursor={{ fill: '#f8faff' }}
              />
              <Bar dataKey="orders" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Status" subtitle="Current distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={PIE_DATA} cx="50%" cy="45%" innerRadius={55} outerRadius={90}
                paddingAngle={3} dataKey="value"
              >
                {PIE_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                iconType="circle" iconSize={10}
                formatter={(v) => <span style={{ fontSize: '13px', color: '#374151' }}>{v}</span>}
              />
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ─── Orders Table + Quick Actions ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Recent Purchase Orders</h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>{filtered.length} orders found</p>
            </div>
            <div style={{ position: 'relative' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                placeholder="Search orders..."
                style={{
                  padding: '8px 12px 8px 34px', border: '1.5px solid #e2e8f0',
                  borderRadius: '10px', fontSize: '13px', outline: 'none',
                  background: '#f8fafc', width: '220px',
                }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {['Order ID', 'Supplier', 'Order Date', 'Amount', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📭</div>
                    <div style={{ fontWeight: '600' }}>No orders found</div>
                  </td></tr>
                ) : paginated.map((order, i) => (
                  <tr
                    key={order.id}
                    style={{ background: i % 2 === 0 ? '#fff' : '#fafbfc', borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafbfc'}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#6366f1' }}>{order.id}</td>
                    <td style={{ padding: '14px 16px', color: '#374151', fontWeight: '500' }}>{order.supplier}</td>
                    <td style={{ padding: '14px 16px', color: '#64748b' }}>{order.date}</td>
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0f172a' }}>{order.amount}</td>
                    <td style={{ padding: '14px 16px' }}><StatusBadge status={order.status} /></td>
                    <td style={{ padding: '14px 16px' }}>
                      <button style={{
                        padding: '6px 14px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff', border: 'none', cursor: 'pointer',
                        fontSize: '12px', fontWeight: '600', transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Showing {Math.min((page-1)*ITEMS_PER_PAGE+1, filtered.length)}–{Math.min(page*ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, fontSize: '13px', fontWeight: '600', color: '#374151' }}
              >← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    border: p === page ? 'none' : '1.5px solid #e2e8f0',
                    background: p === page ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : '#fff',
                    color: p === page ? '#fff' : '#374151',
                    cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                  }}
                >{p}</button>
              ))}
              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(p => p + 1)}
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1, fontSize: '13px', fontWeight: '600', color: '#374151' }}
              >Next →</button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {QUICK_ACTIONS.map(a => (
              <button
                key={a.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px', borderRadius: '12px',
                  border: `1.5px solid ${a.color}20`,
                  background: a.bg, cursor: 'pointer', width: '100%',
                  textAlign: 'left', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${a.color}25` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <span style={{ fontSize: '22px' }}>{a.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: a.color }}>{a.label}</span>
              </button>
            ))}
          </div>

          {/* Activity feed */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Recent Activity</h4>
            {[
              { text: 'PO-1025 raised by Ravi', time: '2m ago', color: '#6366f1' },
              { text: 'ABC Suppliers approved', time: '30m ago', color: '#10b981' },
              { text: 'Payment ₹45k cleared', time: '2h ago', color: '#f59e0b' },
              { text: 'GR-103 goods received', time: '5h ago', color: '#8b5cf6' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, flexShrink: 0, marginTop: '5px' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#374151', fontWeight: '500' }}>{a.text}</p>
                  <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#94a3b8' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Icons ── */
function UsersIcon({ size = 26, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
}
function BoxIcon({ size = 26, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/></svg>
}
function ClockIcon({ size = 26, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>
}
function CheckIcon({ size = 26, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
}
