const express = require('express')
const router  = express.Router()
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const db      = require('../db')

const JWT_SECRET  = process.env.JWT_SECRET  || 'psms_secret'
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d'

/* ─── helpers ─── */
const makeToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  )

const safeUser = ({ id, full_name, email, role, created_at }) => ({
  id, fullName: full_name, email, role, avatar: full_name[0].toUpperCase(), created_at,
})

/* ─────────────────────────────────────────
   POST /api/auth/signup
───────────────────────────────────────── */
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password)
    return res.status(400).json({ message: 'All fields are required.' })

  if (!/\S+@\S+\.\S+/.test(email))
    return res.status(400).json({ message: 'Enter a valid email address.' })

  if (password.length < 8)
    return res.status(400).json({ message: 'Password must be at least 8 characters.' })

  try {
    // Check duplicate email
    const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email.toLowerCase()])
    if (rows.length > 0)
      return res.status(409).json({ message: 'An account with this email already exists.' })

    const hash = await bcrypt.hash(password, 12)
    const [result] = await db.execute(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [fullName.trim(), email.toLowerCase(), hash, 'Admin']
    )

    const [newRows] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId])
    const user  = safeUser(newRows[0])
    const token = makeToken(newRows[0])

    return res.status(201).json({ message: 'Account created successfully.', user, token })
  } catch (err) {
    console.error('Signup error:', err)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
})

/* ─────────────────────────────────────────
   POST /api/auth/login
───────────────────────────────────────── */
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' })

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email.toLowerCase()])
    if (rows.length === 0)
      return res.status(401).json({ message: 'Invalid email or password.' })

    const match = await bcrypt.compare(password, rows[0].password)
    if (!match)
      return res.status(401).json({ message: 'Invalid email or password.' })

    const user  = safeUser(rows[0])
    const token = makeToken(rows[0])

    return res.status(200).json({ message: 'Login successful.', user, token })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
})

/* ─────────────────────────────────────────
   GET /api/auth/me   (verify token)
───────────────────────────────────────── */
router.get('/me', async (req, res) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided.' })

  try {
    const payload = jwt.verify(auth.split(' ')[1], JWT_SECRET)
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [payload.id])
    if (rows.length === 0)
      return res.status(404).json({ message: 'User not found.' })

    return res.json({ user: safeUser(rows[0]) })
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired.' })
  }
})

module.exports = router
