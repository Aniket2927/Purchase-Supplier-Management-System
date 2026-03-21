import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'
import Navbar from '../components/Navbar'
import dashboardPreview from '../assets/images/dashboard-preview.svg'
import aboutImage from '../assets/images/about-illustration.svg'

const features = [
  {
    title: 'Supplier Management',
    description: 'Manage profiles, performance, and communication in one place.',
    icon: '👥',
  },
  {
    title: 'Purchase Order Tracking',
    description: 'Track purchase orders from creation to delivery in real time.',
    icon: '📦',
  },
  {
    title: 'Inventory Control',
    description: 'Monitor stock levels with smarter reorder and planning support.',
    icon: '📊',
  },
  {
    title: 'Payment Management',
    description: 'Handle invoices, due dates, and payment status with confidence.',
    icon: '💳',
  },
]

function LandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successText, setSuccessText] = useState('')

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!formData.name.trim()) nextErrors.name = 'Name is required.'
    if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Enter a valid email.'
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.'
    }
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccessText('')
      return
    }
    setIsSubmitting(true)
    setErrors({})
    setSuccessText('')

    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessText('Thanks! Your message has been received.')
      setFormData({ name: '', email: '', message: '' })
    }, 900)
  }

  return (
    <div className="text-slate-800">
      <Navbar />

      <main>
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
        >
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-18 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <p className="inline-flex rounded-full border border-indigo-300/40 bg-indigo-400/15 px-3 py-1 text-xs font-semibold text-indigo-100">
                Built for modern procurement teams
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
                Smart Purchase & Supplier Management System
              </h1>
              <p className="mt-5 max-w-xl text-base text-slate-200/90 sm:text-lg">
                Streamline supplier collaboration, track purchases, control stock, and
                optimize payment operations in one intuitive platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/signup">
                  <Button variant="heroPrimary">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button variant="heroOutline">
                    Login
                  </Button>
                </Link>
              </div>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-center text-xs sm:text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-white">
                  <p className="text-lg font-bold">99.9%</p>
                  <p className="text-white/70">Uptime</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-white">
                  <p className="text-lg font-bold">2x</p>
                  <p className="text-white/70">Faster PO Flow</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-white">
                  <p className="text-lg font-bold">24/7</p>
                  <p className="text-white/70">Visibility</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl shadow-indigo-900/40">
              <img
                src={dashboardPreview}
                alt="Dashboard preview of purchase and supplier management system"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-18"
        >
          <div className="pointer-events-none absolute left-0 top-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Core Features</h2>
            <p className="mt-3 text-slate-200/85">
              Everything needed to run efficient procurement and supplier workflows.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/15 bg-white/8 p-6 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300/60 hover:bg-white/12 hover:shadow-2xl hover:shadow-indigo-900/30"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-300/20 text-xl">
                  {feature.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-200/80">{feature.description}</p>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section
          id="about"
          className="bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 py-18"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl border border-white/10 bg-white/8 px-4 py-8 shadow-xl shadow-indigo-900/20 backdrop-blur-sm sm:px-6 lg:grid-cols-2 lg:px-10">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">About PSMS</h2>
              <p className="mt-4 text-slate-200/85">
                PSMS is designed for organizations that want clarity and control across
                procurement and supplier operations. With an easy-to-use interface and
                clear data visibility, teams can reduce delays, improve compliance, and
                make better purchase decisions.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={aboutImage}
                alt="Team collaboration and supplier planning"
                className="w-full rounded-2xl border border-white/20"
              />
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl shadow-indigo-900/30 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Contact Us</h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Share your requirements and our team will reach out shortly.
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <FormField
                id="name"
                label="Name"
                value={formData.name}
                placeholder="Your name"
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
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
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {errors.message ? <p className="text-xs text-rose-600">{errors.message}</p> : null}
              </div>
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Submit
              </Button>
              {successText ? <p className="text-sm text-emerald-600">{successText}</p> : null}
            </form>
          </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
