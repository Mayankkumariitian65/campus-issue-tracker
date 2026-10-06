import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export interface TopbarProps {
  title?: string
  subtitle?: string
}

export const Topbar: React.FC<TopbarProps> = ({ title, subtitle }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        {title && <h1 className="text-lg font-bold text-[#0f172a]">{title}</h1>}
        {subtitle && <p className="text-xs text-[#64748b]">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="p-2 text-[#64748b] hover:text-[#0f172a] rounded-lg hover:bg-slate-100 transition-colors"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 pl-2 border-l border-[#e2e8f0]">
          <div className="w-8 h-8 rounded-full bg-[#14532d] text-white flex items-center justify-center font-bold text-xs">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-[#0f172a] leading-tight">{user?.name}</p>
            <p className="text-[10px] uppercase font-semibold text-[#16a34a]">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
