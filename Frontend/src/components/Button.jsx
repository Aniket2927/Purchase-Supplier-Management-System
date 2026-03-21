function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  isLoading = false,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70'

  const variants = {
    primary:
      'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:ring-indigo-500',
    secondary:
      'border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-100 focus-visible:ring-slate-400',
    ghost:
      'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
    heroPrimary:
      'bg-white text-indigo-700 shadow-xl shadow-black/30 hover:-translate-y-0.5 hover:bg-indigo-50 focus-visible:ring-white',
    heroOutline:
      'border border-indigo-200/40 bg-white/10 text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-indigo-200',
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Please wait...' : children}
    </button>
  )
}

export default Button
