import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, PlusCircle, Activity, User } from 'lucide-react'

export const MobileNav: React.FC = () => {
  const items = [
    { to: '/student', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/student/issues', label: 'Issues', icon: Search, end: false },
    { to: '/student/report', label: 'Report', icon: PlusCircle, end: false, highlight: true },
    { to: '/student/activity', label: 'Activity', icon: Activity, end: false },
    { to: '/student/profile', label: 'Profile', icon: User, end: false },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e2e8f0] px-2 py-1 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center py-1.5 px-3 rounded-lg text-[11px] font-medium transition-colors ${
                item.highlight
                  ? 'text-[#14532d] font-bold'
                  : isActive
                  ? 'text-[#14532d]'
                  : 'text-[#64748b]'
              }`
            }
          >
            {item.highlight ? (
              <div className="w-10 h-10 -mt-5 bg-[#14532d] text-white rounded-full flex items-center justify-center shadow-md">
                <Icon className="w-5 h-5" />
              </div>
            ) : (
              <Icon className="w-5 h-5 mb-0.5" />
            )}
            <span className={item.highlight ? 'mt-1 text-xs font-bold text-[#14532d]' : ''}>
              {item.label}
            </span>
          </NavLink>
        )
      })}
    </div>
  )
}
