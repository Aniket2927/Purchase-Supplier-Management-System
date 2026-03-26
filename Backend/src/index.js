require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const authRoutes = require('./routes/auth')

const app  = express()
const PORT = process.env.PORT || 5000

/* ─── Middleware ─── */
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:5173'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ─── Routes ─── */
app.use('/api/auth', authRoutes)

/* ─── Health check ─── */
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

/* ─── 404 handler ─── */
app.use((_req, res) => res.status(404).json({ message: 'Route not found.' }))

/* ─── Start ─── */
app.listen(PORT, () => {
  console.log(`🚀 PSMS Backend running on http://localhost:${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health`)
})
