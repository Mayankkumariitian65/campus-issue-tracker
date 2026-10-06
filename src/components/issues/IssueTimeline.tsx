import React from 'react'
import {
  CheckCircle2,
  Clock,
  UserCheck,
  Wrench,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  Users
} from 'lucide-react'
import type { IssueStatus } from '../../lib/supabase'

export interface IssueTimelineProps {
  currentStatus: IssueStatus
  verifiedByStudent?: boolean | null
  affectedCount?: number
  assigneeName?: string
  createdAt?: string
  updatedAt?: string
  resolutionNotes?: string
  variant?: 'grid' | 'detailed'
}

export const IssueTimeline: React.FC<IssueTimelineProps> = ({
  currentStatus,
  verifiedByStudent,
  affectedCount = 27,
  assigneeName = 'IT Network Team',
  createdAt = 'Today at 10:20 AM',
  updatedAt = '2 hours ago',
  resolutionNotes,
  variant = 'detailed',
}) => {
  const steps = [
    {
      key: 'reported',
      stepNum: '01',
      label: 'Reported',
      icon: Clock,
      time: createdAt,
      desc: 'Logged by student resident',
    },
    {
      key: 'confirmed',
      stepNum: '02',
      label: 'Confirmed',
      icon: Users,
      time: `${affectedCount} confirmations`,
      desc: 'Community impact confirmed by students',
    },
    {
      key: 'assigned',
      stepNum: '03',
      label: 'Assigned',
      icon: UserCheck,
      time: updatedAt,
      desc: `Assigned to ${assigneeName}`,
    },
    {
      key: 'in_progress',
      stepNum: '04',
      label: 'In Progress',
      icon: Wrench,
      time: 'Current stage',
      desc: 'Maintenance team is carrying out repairs',
    },
    {
      key: 'resolved',
      stepNum: '05',
      label: 'Resolved',
      icon: CheckCircle2,
      time: currentStatus === 'resolved' ? 'Awaiting student verification' : currentStatus === 'closed' ? 'Verified by student' : 'Pending completion',
      desc: resolutionNotes || 'Staff logged work completion',
    },
    {
      key: 'verification',
      stepNum: '06',
      label: 'Student Verification',
      icon: ShieldCheck,
      time: verifiedByStudent ? 'Verified Fixed' : currentStatus === 'reopened' ? 'Not Fixed (Reopened)' : 'Verification required',
      desc: verifiedByStudent
        ? 'Student confirmed issue is fixed'
        : currentStatus === 'reopened'
        ? 'Student marked not fixed & reopened'
        : 'Student verification required for final closure',
    },
  ]

  const getStepState = (stepKey: string) => {
    if (currentStatus === 'reopened' && stepKey === 'verification') {
      return 'reopened'
    }

    const statusOrder: Record<string, number> = {
      reported: 1,
      confirmed: 2,
      assigned: 3,
      in_progress: 4,
      resolved: 5,
      closed: 6,
      verification: verifiedByStudent ? 6 : currentStatus === 'resolved' ? 5 : 4,
    }

    const currentOrder = statusOrder[currentStatus] || 1
    const stepOrder = statusOrder[stepKey] || 1

    if (stepKey === 'verification' && verifiedByStudent) return 'completed'
    if (stepOrder < currentOrder) return 'completed'
    if (stepOrder === currentOrder) return 'active'
    return 'pending'
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">
          Complete Resolution Timeline
        </h4>
        <span className="text-[11px] font-bold text-[#14532d] bg-[#ecfdf5] px-2.5 py-1 rounded-md border border-emerald-200">
          Status: <strong className="uppercase">{currentStatus.replace('_', ' ')}</strong>
        </span>
      </div>

      {/* Grid Layout View */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step) => {
          const state = getStepState(step.key)
          const Icon = step.icon

          return (
            <div
              key={step.key}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                state === 'completed'
                  ? 'bg-emerald-50/80 border-emerald-300 text-[#14532d]'
                  : state === 'active'
                  ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-400 shadow-2xs'
                  : state === 'reopened'
                  ? 'bg-red-50 border-red-300 text-red-900 ring-2 ring-red-400'
                  : 'bg-slate-50 border-[#e2e8f0] text-slate-400 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold opacity-70">{step.stepNum}</span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      state === 'completed'
                        ? 'bg-[#16a34a] text-white'
                        : state === 'active'
                        ? 'bg-amber-500 text-white'
                        : state === 'reopened'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {state === 'reopened' ? (
                      <RotateCcw className="w-3.5 h-3.5" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
                <p className="text-xs font-extrabold leading-tight">{step.label}</p>
                <p className="text-[10px] text-[#64748b] mt-1 line-clamp-2">{step.desc}</p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-current/10 text-[10px] font-semibold opacity-80 truncate">
                {step.time}
              </div>
            </div>
          )
        })}
      </div>

      {/* Reopened Banner Notice if applicable */}
      {currentStatus === 'reopened' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 flex items-center gap-2.5 text-xs font-bold">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>
            Issue was marked "Not Fixed" by students. Timeline reset to priority queue for staff action.
          </span>
        </div>
      )}
    </div>
  )
}
