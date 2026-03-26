import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
    setApiError('')
  }

  const validate = () => {
    const e = {}
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email.'
    if (!formData.password || formData.password.length < 6) e.password = 'Password must be at least 6 characters.'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    try {
      await login({ email: formData.email, password: formData.password })
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message)
    }
  }

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'stretch',
      background: '#f8fafc',
    }}>
      {/* Left decorative panel */}
      <div style={{
        flex: '0 0 42%', background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '60px 48px', gap: '32px',
      }}
        className="auth-panel"
      >
        {/* Logo */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 32px rgba(99,102,241,0.5)',
          }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="white">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>PSMS</h2>
          <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: '14px' }}>Purchase & Supplier Management</p>
        </div>

        <div style={{ width: '100%' }}>
          {[
            { icon: '🏭', title: 'Supplier Management', desc: 'Manage 120+ verified suppliers in one place' },
            { icon: '📦', title: 'Product Catalogue',   desc: 'Track 540+ products across categories' },
            { icon: '📊', title: 'Real-time Analytics', desc: 'Visual dashboards & purchase insights' },
          ].map(f => (
            <div key={f.title} style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '24px' }}>{f.icon}</span>
              <div>
                <p style={{ margin: 0, fontWeight: '700', color: '#e2e8f0', fontSize: '14px' }}>{f.title}</p>
                <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '13px' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 32px',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Welcome back 👋</h1>
          <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '14px' }}>Log in to continue to your dashboard.</p>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email Address</label>
              <input
                id="login-email"
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="you@company.com"
                style={{
                  width: '100%', padding: '11px 14px',
                  border: `1.5px solid ${errors.email ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '10px', fontSize: '14px', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.2s', background: '#fff',
                }}
                onFocus={e => { if (!errors.email) e.target.style.borderColor = '#6366f1' }}
                onBlur={e => { if (!errors.email) e.target.style.borderColor = '#e2e8f0' }}
              />
              {errors.email && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Password</label>
                <a href="#" style={{ fontSize: '12px', color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Forgot Password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%', padding: '11px 44px 11px 14px',
                    border: `1.5px solid ${errors.password ? '#ef4444' : '#e2e8f0'}`,
                    borderRadius: '10px', fontSize: '14px', outline: 'none',
                    boxSizing: 'border-box', transition: 'border-color 0.2s', background: '#fff',
                  }}
                  onFocus={e => { if (!errors.password) e.target.style.borderColor = '#6366f1' }}
                  onBlur={e => { if (!errors.password) e.target.style.borderColor = '#e2e8f0' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700', color: '#6366f1' }}
                >{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              {errors.password && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#ef4444' }}>{errors.password}</p>}
            </div>

            {apiError && (
              <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontSize: '13px', fontWeight: '500' }}>
                ⚠️ {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="login-submit"
              style={{
                padding: '12px', borderRadius: '12px',
                background: loading ? '#e2e8f0' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: loading ? '#94a3b8' : '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px', fontWeight: '700', transition: 'opacity 0.2s',
                boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.4)',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', margin: 0 }}>
              Don&apos;t have an account?{' '}
              <Link to="/signup" style={{ color: '#6366f1', fontWeight: '700', textDecoration: 'none' }}>Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
