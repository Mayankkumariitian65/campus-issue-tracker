import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Profile, Role } from '../lib/supabase'
import { authService, type SignupParams } from '../services/authService'

interface AuthContextType {
  user: Profile | null
  isLoading: boolean
  login: (email: string, password: string, role: Role) => Promise<boolean>
  signup: (params: SignupParams) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: Role) => {
    const loggedInUser = await authService.login(email, password, role)
    if (!loggedInUser) return false
    setUser(loggedInUser)
    return true
  }

  const signup = async (params: SignupParams) => {
    const newUser = await authService.signup(params)
    setUser(newUser)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
