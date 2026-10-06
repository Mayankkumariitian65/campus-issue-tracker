import React from 'react'
import { User, Mail, Building2, Home, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export const ProfilePage: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0f172a]">User Profile</h1>
        <p className="text-xs text-[#64748b]">Your campus directory details and account credentials</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-[#e2e8f0]">
          <div className="w-16 h-16 rounded-full bg-[#14532d] text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0f172a]">{user?.name}</h2>
            <p className="text-xs text-[#64748b]">{user?.email}</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#14532d] text-[11px] font-bold uppercase">
              {user?.role} Account
            </span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[11px] text-[#64748b] font-semibold">Campus</p>
              <p className="font-bold text-[#0f172a]">{user?.campus}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <Home className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[11px] text-[#64748b] font-semibold">Hostel / Residence</p>
              <p className="font-bold text-[#0f172a]">
                {user?.hostel || 'Main Hostel'} {user?.block ? `(${user.block})` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[11px] text-[#64748b] font-semibold">Verification Status</p>
              <p className="font-bold text-emerald-700">Verified Campus Resident</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
