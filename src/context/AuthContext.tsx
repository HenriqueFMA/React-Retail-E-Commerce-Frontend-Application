import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type User = { name: string; email: string } | null

const AuthContext = createContext<{ user: User; login: (u: User) => void; logout: () => void } | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem('auth_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const navigate = useNavigate()

  function login(u: User) {
    setUser(u)
    localStorage.setItem('auth_user', JSON.stringify(u))
    // navigation handled by caller via useLocation state
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('auth_user')
    navigate('/login')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
