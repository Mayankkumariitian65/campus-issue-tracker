import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ListOrdered,
  BarChart3,
  LogOut,
  ShieldAlert,
  Building2
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export const AdminSidebar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/issues', label: 'Issue Management', icon: ListOrdered, end: false },
    { to: '/admin/analytics', label: 'Impact Analytics', icon: BarChart3, end: false },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-[#0f172a] font-bold">
          <ShieldAlert className="w-4 h-4 text-[#0f172a]" />
        </div>
        <div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            Campus<span className="text-emerald-400">Fix</span>
          </span>
          <span className="block text-[10px] uppercase font-bold text-amber-400 tracking-wider">Admin Ops Portal</span>
        </div>
      </div>

      {/* Campus Context Card */}
      {user && (
        <div className="mx-4 my-4 p-3 bg-slate-800/70 border border-slate-700 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>{user.campus}</span>
          </div>
          <p className="text-[11px] text-slate-400">Operations Control Center</p>
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
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
              A
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[11px] text-slate-400 truncate">Staff / Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
