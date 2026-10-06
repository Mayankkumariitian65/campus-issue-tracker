import type { Profile, Role } from '../lib/supabase'

export interface LoginParams {
  email: string
  role?: Role
}

export interface SignupParams {
  name: string
  email: string
  password: string
  role: Role
  campus: string
  hostel?: string
  block?: string
}

// Initial Mock Users for seamless demo
export const DEMO_USERS: Record<string, Profile> = {
  student: {
    id: 'usr-student-1',
    name: 'Aarav Sharma',
    email: 'aarav@campus.edu',
    role: 'student',
    campus: 'Main Tech Campus',
    hostel: 'Hostel Block A',
    block: 'Block A',
    created_at: new Date().toISOString(),
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Estate Facilities Admin',
    email: 'admin@campus.edu',
    role: 'admin',
    campus: 'Main Tech Campus',
    created_at: new Date().toISOString(),
  }
}

const STORAGE_KEY = 'campusfix_current_user'
const ACCOUNTS_KEY = 'campusfix_accounts'
const DEMO_PASSWORD = 'password123'

interface StoredAccount {
  profile: Profile
  salt: string
  passwordHash: string
}

export const authService = {
  getCurrentUser(): Profile | null {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    try {
      return JSON.parse(data)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  },

  async login(email: string, password: string, role: Role): Promise<Profile | null> {
    const normalizedEmail = email.trim().toLowerCase()
    const account = getStoredAccounts().find(
      candidate => candidate.profile.email.toLowerCase() === normalizedEmail && candidate.profile.role === role
    )

    if (account) {
      const passwordHash = await hashPassword(password, account.salt)
      if (passwordHash !== account.passwordHash) return null
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account.profile))
      return account.profile
    }

    const demoUser = DEMO_USERS[role]
    if (demoUser.email.toLowerCase() !== normalizedEmail || password !== DEMO_PASSWORD) return null
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
    return demoUser
  },

  async signup(params: SignupParams): Promise<Profile> {
    const accounts = getStoredAccounts()
    const normalizedEmail = params.email.trim().toLowerCase()
    const demoEmailInUse = Object.values(DEMO_USERS).some(user => user.email.toLowerCase() === normalizedEmail)
    if (demoEmailInUse || accounts.some(account => account.profile.email.toLowerCase() === normalizedEmail)) {
      throw new Error('An account with this email already exists.')
    }

    const newUser: Profile = {
      id: `usr-${Date.now()}`,
      name: params.name,
      email: normalizedEmail,
      role: 'student',
      campus: params.campus,
      hostel: params.hostel,
      block: params.block,
      created_at: new Date().toISOString(),
    }

    const salt = createSalt()
    const passwordHash = await hashPassword(params.password, salt)
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, { profile: newUser, salt, passwordHash }]))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    return newUser
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEY)
  }
}

function getStoredAccounts(): StoredAccount[] {
  try {
    const storedAccounts = localStorage.getItem(ACCOUNTS_KEY)
    return storedAccounts ? JSON.parse(storedAccounts) as StoredAccount[] : []
  } catch {
    return []
  }
}

function createSalt(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), value => value.toString(16).padStart(2, '0')).join('')
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const saltBytes = new Uint8Array(salt.match(/.{2}/g)?.map(value => Number.parseInt(value, 16)) ?? [])
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: saltBytes, iterations: 100_000, hash: 'SHA-256' },
    key,
    256
  )
  return Array.from(new Uint8Array(hash), value => value.toString(16).padStart(2, '0')).join('')
}
