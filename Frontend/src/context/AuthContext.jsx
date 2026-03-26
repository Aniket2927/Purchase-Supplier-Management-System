import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Mock user store (simulates DB — swap with real API calls)
const MOCK_USERS_KEY = 'psms_users'
const MOCK_SESSION_KEY = 'psms_session'

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY)) || []
  } catch {
    return []
  }
}

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(MOCK_SESSION_KEY)) || null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredSession)
  const [loading, setLoading] = useState(false)

  const signup = async ({ fullName, email, password }) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    const users = getStoredUsers()
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setLoading(false)
      throw new Error('An account with this email already exists.')
    }
    const newUser = { id: Date.now(), fullName, email, password, role: 'Admin', avatar: fullName[0].toUpperCase() }
    users.push(newUser)
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
    const session = { id: newUser.id, fullName: newUser.fullName, email: newUser.email, role: newUser.role, avatar: newUser.avatar }
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))
    setUser(session)
    setLoading(false)
    return session
  }

  const login = async ({ email, password }) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    const users = getStoredUsers()
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) {
      setLoading(false)
      throw new Error('Invalid email or password.')
    }
    const session = { id: found.id, fullName: found.fullName, email: found.email, role: found.role, avatar: found.avatar }
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))
    setUser(session)
    setLoading(false)
    return session
  }

  const logout = () => {
    localStorage.removeItem(MOCK_SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
