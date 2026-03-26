import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/* ─── Field must live OUTSIDE Signup so React keeps the same component
       identity across re-renders. Defining it inside causes unmount/remount
       on every keystroke, which loses focus. ─── */
function Field({ id, label, type = 'text', placeholder, value, onChange, error, hint }) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          width: '100%',
          padding: '11px 14px',
          border: `1.5px solid ${error ? '#ef4444' : '#e2e8f0'}`,
          borderRadius: '10px',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
          background: '#fff',
          color: '#0f172a',
        }}
        onFocus={e => { if (!error) e.target.style.borderColor = '#6366f1' }}
        onBlur={e => { if (!error) e.target.style.borderColor = '#e2e8f0' }}
      />
      {error && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#ef4444' }}>{error}</p>}
      {hint && !error && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>{hint}</p>}
    </div>
  )
}

export default function Signup() {
  const { signup, loading } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
    setApiError('')
  }

  const validate = () => {
    const e = {}
    if (!formData.fullName.trim()) e.fullName = 'Full name is required.'
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email.'
    if (!formData.password || formData.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (formData.confirmPassword !== formData.password) e.confirmPassword = 'Passwords do not match.'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    try {
      await signup({ fullName: formData.fullName, email: formData.email, password: formData.password })
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'stretch', background: '#f8fafc' }}>

      {/* ─── Left decorative panel ─── */}
      <div
        className="auth-panel"
        style={{
          flex: '0 0 42%',
          background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '60px 48px', gap: '32px',
        }}
      >
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
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>Join PSMS</h2>
          <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: '14px' }}>Start managing procurement smartly</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '24px',
          border: '1px solid rgba(255,255,255,0.07)', width: '100%',
        }}>
          <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '700', color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>What you get</p>
          {[
            '✅ Centralized supplier database',
            '✅ Automated purchase order workflow',
            '✅ Real-time inventory tracking',
            '✅ Payment & receipt management',
            '✅ Analytics & custom reports',
          ].map(t => (
            <p key={t} style={{ margin: '0 0 10px', fontSize: '14px', color: '#94a3b8' }}>{t}</p>
          ))}
        </div>
      </div>

      {/* ─── Right form ─── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 32px', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Create Account 🚀</h1>
          <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '14px' }}>Fill in the details below to get started.</p>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <Field
              id="signup-name"
              label="Full Name"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={e => handleChange('fullName', e.target.value)}
              error={errors.fullName}
            />
            <Field
              id="signup-email"
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              error={errors.email}
            />
            <Field
              id="signup-password"
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              error={errors.password}
              hint="Use letters, numbers & symbols for security."
            />
            <Field
              id="signup-confirm"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={e => handleChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
            />

            {apiError && (
              <div style={{
                padding: '12px 16px', background: '#fef2f2',
                border: '1px solid #fecaca', borderRadius: '10px',
                color: '#dc2626', fontSize: '13px', fontWeight: '500',
              }}>
                ⚠️ {apiError}
              </div>
            )}

            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              style={{
                padding: '12px', borderRadius: '12px', marginTop: '4px',
                background: loading ? '#e2e8f0' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: loading ? '#94a3b8' : '#fff',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px', fontWeight: '700', transition: 'opacity 0.2s',
                boxShadow: loading ? 'none' : '0 6px 20px rgba(99,102,241,0.4)',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.9' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', margin: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#6366f1', fontWeight: '700', textDecoration: 'none' }}>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
