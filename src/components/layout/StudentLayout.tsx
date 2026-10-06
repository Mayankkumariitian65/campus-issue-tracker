import React from 'react'
import { Outlet } from 'react-router-dom'
import { StudentSidebar } from './StudentSidebar'
import { Topbar } from './Topbar'
import { MobileNav } from './MobileNav'

export const StudentLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="hidden md:block">
        <StudentSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Topbar title="Student Portal" subtitle="Report, confirm, and verify campus issues" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
