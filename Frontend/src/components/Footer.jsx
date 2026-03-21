function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-base font-semibold text-slate-900">PSMS</p>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <a href="#home" className="hover:text-indigo-600">
              Home
            </a>
            <a href="#features" className="hover:text-indigo-600">
              Features
            </a>
            <a href="#about" className="hover:text-indigo-600">
              About
            </a>
            <a href="#contact" className="hover:text-indigo-600">
              Contact
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600">
              in
            </a>
            <a href="#" aria-label="X" className="hover:text-indigo-600">
              X
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-indigo-600">
              fb
            </a>
          </div>
          <p>© {new Date().getFullYear()} PSMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
