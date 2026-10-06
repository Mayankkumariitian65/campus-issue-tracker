import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  PlusCircle,
  Activity,
  User,
  LogOut,
  ShieldCheck,
  Building2,
  Home
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export const StudentSidebar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/student/issues', label: 'Issues / Explore', icon: Search, end: false },
    { to: '/student/report', label: 'Report Issue', icon: PlusCircle, end: false },
    { to: '/student/activity', label: 'My Activity', icon: Activity, end: false },
    { to: '/student/profile', label: 'Profile', icon: User, end: false },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="w-64 bg-white border-r border-[#e2e8f0] flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-[#e2e8f0] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#14532d] flex items-center justify-center text-white font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <span className="font-extrabold text-lg text-[#0f172a] tracking-tight">
            Campus<span className="text-[#16a34a]">Fix</span>
          </span>
          <span className="block text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Student Portal</span>
        </div>
      </div>

      {/* Campus Context Card */}
      {user && (
        <div className="mx-4 my-4 p-3 bg-[#ecfdf5] border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#14532d] mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>{user.campus}</span>
          </div>
          {user.hostel && (
            <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
              <Home className="w-3 h-3 text-emerald-600" />
              <span>{user.hostel} {user.block ? `(${user.block})` : ''}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#14532d] text-white shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f172a] hover:bg-slate-100'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* User Footer & Logout */}
      <div className="p-4 border-t border-[#e2e8f0] bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#14532d] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name.charAt(0) || 'S'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[#0f172a] truncate">{user?.name}</p>
              <p className="text-[11px] text-[#64748b] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 text-[#64748b] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
