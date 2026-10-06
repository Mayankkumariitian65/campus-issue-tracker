import React from 'react'
import { PlusCircle, ThumbsUp, CheckCircle2, RotateCcw, Clock, Wrench } from 'lucide-react'
import { StatusBadge } from '../common/Badge'
import type { IssueStatus } from '../../lib/supabase'

export type ActivityType = 'reported' | 'confirmed' | 'updated' | 'resolved' | 'reopened'

export interface ActivityItemProps {
  id: string
  title: string
  action: ActivityType
  location: string
  timestamp: string
  status?: IssueStatus
  onClick?: () => void
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  action,
  location,
  timestamp,
  status,
  onClick,
}) => {
  const actionConfig = {
    reported: {
      icon: PlusCircle,
      label: 'You reported',
      color: 'bg-blue-100 text-blue-700',
    },
    confirmed: {
      icon: ThumbsUp,
      label: 'You confirmed',
      color: 'bg-emerald-100 text-[#14532d]',
    },
    updated: {
      icon: Wrench,
      label: 'Status updated',
      color: 'bg-amber-100 text-amber-800',
    },
    resolved: {
      icon: CheckCircle2,
      label: 'Staff resolved',
      color: 'bg-emerald-100 text-[#16a34a]',
    },
    reopened: {
      icon: RotateCcw,
      label: 'Student reopened',
      color: 'bg-orange-100 text-orange-800',
    },
  }

  const config = actionConfig[action] || actionConfig.reported
  const Icon = config.icon

  return (
    <div
      onClick={onClick}
      className="p-3.5 bg-white border border-[#e2e8f0] rounded-xl hover:border-slate-300 hover:shadow-2xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-2 rounded-lg shrink-0 ${config.color}`}>
          <Icon className="w-4 h-4" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
              {config.label}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timestamp}
            </span>
          </div>

          <h4 className="text-sm font-extrabold text-[#0f172a] truncate group-hover:text-[#16a34a] transition-colors">
            {title}
          </h4>
          <p className="text-xs text-[#64748b] truncate">{location}</p>
        </div>
      </div>

      {status && (
        <div className="shrink-0 hidden sm:block">
          <StatusBadge status={status} size="sm" />
        </div>
      )}
    </div>
  )
}
