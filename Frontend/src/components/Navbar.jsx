import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-indigo-100/70 bg-white/90 shadow-lg shadow-indigo-900/10 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
            P
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">PSMS</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-indigo-600"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/login">
            <Button variant="ghost" className="px-3 sm:px-4">
              Login
            </Button>
          </NavLink>
          <Link to="/signup">
            <Button className="px-3 sm:px-4">Sign Up</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
