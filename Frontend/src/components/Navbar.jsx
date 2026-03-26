import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 shadow-lg shadow-black/30 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white no-underline">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">PSMS</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button variant="ghostLight" className="px-4 text-sm">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="heroPrimary" className="px-3 sm:px-4">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:hidden border-none bg-transparent cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/98 px-4 pb-4 md:hidden">
          <ul className="mt-3 flex flex-col gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/8 hover:text-white no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="ghostLight" className="w-full justify-center">Login</Button>
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <Button variant="heroPrimary" className="w-full justify-center">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
