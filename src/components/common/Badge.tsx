import React from 'react'
import type { Priority, IssueStatus } from '../../lib/supabase'

export interface PriorityBadgeProps {
  priority: Priority
  size?: 'sm' | 'md'
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const styles: Record<Priority, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-rose-100 text-rose-700 border-rose-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  }

  const labels: Record<Priority, string> = {
    critical: 'Critical Priority',
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold'

  return (
    <span className={`inline-flex items-center rounded-full border ${styles[priority]} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        priority === 'critical' || priority === 'high' ? 'bg-red-600 animate-pulse' : 
        priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
      }`} />
      {labels[priority]}
    </span>
  )
}

export interface StatusBadgeProps {
  status: IssueStatus
  size?: 'sm' | 'md'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles: Record<IssueStatus, string> = {
    reported: 'bg-slate-100 text-slate-700 border-slate-200',
    assigned: 'bg-purple-100 text-purple-700 border-purple-200',
    in_progress: 'bg-amber-100 text-amber-800 border-amber-200',
    resolved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    closed: 'bg-green-100 text-green-900 border-green-200',
    reopened: 'bg-orange-100 text-orange-800 border-orange-200',
  }

  const labels: Record<IssueStatus, string> = {
    reported: 'Reported',
    assigned: 'Assigned',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    reopened: 'Reopened (Needs Review)',
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold'

  return (
    <span className={`inline-flex items-center rounded-md border ${styles[status]} ${sizeClasses}`}>
      {labels[status]}
    </span>
  )
}
