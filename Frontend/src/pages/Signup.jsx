import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import FormField from '../components/FormField'

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setSuccessMessage('')
  }

  const validate = () => {
    const nextErrors = {}
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Enter a valid email.'
    if (!formData.password || formData.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }
    if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
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
    setSuccessMessage('')

    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage('Account created in UI mode. Connect backend API to persist users.')
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' })
    }, 900)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-sky-100 px-4 py-10">
      <AuthCard title="Create your account" subtitle="Start managing suppliers and purchases in minutes.">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <FormField
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            placeholder="John Doe"
            onChange={(e) => handleChange('fullName', e.target.value)}
            error={errors.fullName}
          />
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
            type="password"
            value={formData.password}
            placeholder="Create a secure password"
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
          />
          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign Up
          </Button>

          {successMessage ? <p className="text-sm text-emerald-600">{successMessage}</p> : null}

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </main>
  )
}

export default Signup
