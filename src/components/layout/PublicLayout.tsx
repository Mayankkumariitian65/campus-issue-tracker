import React from 'react'
import { Outlet } from 'react-router-dom'
import { PublicNavbar } from './PublicNavbar'

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-[#e2e8f0] py-8 text-center text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-[#0f172a] mb-1">CampusFix — Community Confirmed Issue Platform</p>
          <p>“One issue, multiple confirmations — instead of multiple duplicate complaints.”</p>
        </div>
      </footer>
    </div>
  )
}
