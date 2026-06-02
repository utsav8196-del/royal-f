import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { api, getErrorMessage } from '@/lib/api'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'student'
  phone?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<User>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    if (!localStorage.getItem('token')) {
      setUser(null)
      return
    }
    try {
      const { data } = await api.get<User>('/auth/me')
      setUser(data)
    } catch {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      if (token) {
        await refreshUser()
      }
      setLoading(false)
    }
    init()
  }, [token, refreshUser])

  const login = async (email: string, password: string) => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (payload: { name: string; email: string; password: string; phone?: string }) => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/register', payload)
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export { getErrorMessage }
