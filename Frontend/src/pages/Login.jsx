import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import FormField from '../components/FormField'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setResponseMessage('')
  }

  const validate = () => {
    const nextErrors = {}
    if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Enter a valid email.'
    if (!formData.password || formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    setResponseMessage('')

    setTimeout(() => {
      setIsLoading(false)
      setResponseMessage('Mock login successful. Connect API to authenticate users.')
    }, 800)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-sky-100 px-4 py-10">
      <AuthCard title="Welcome back" subtitle="Log in to continue managing purchases and suppliers.">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            placeholder="you@company.com"
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
          <FormField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            placeholder="Enter your password"
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-indigo-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            }
          />

          <div className="flex justify-end">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
              Forgot Password?
            </a>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Login
          </Button>

          {responseMessage ? <p className="text-sm text-emerald-600">{responseMessage}</p> : null}

          <p className="text-center text-sm text-slate-600">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Create Account
            </Link>
          </p>
        </form>
      </AuthCard>
    </main>
  )
}

export default Login
