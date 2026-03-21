function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/50 bg-white/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-8">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  )
}

export default AuthCard
