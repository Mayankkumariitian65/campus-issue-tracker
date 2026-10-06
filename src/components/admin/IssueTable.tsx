import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Eye, UserCheck } from 'lucide-react'
import type { Issue, IssueStatus } from '../../lib/supabase'
import { PriorityBadge, StatusBadge } from '../common/Badge'

export interface IssueTableProps {
  issues: Issue[]
  onStatusChange?: (issueId: string, status: IssueStatus) => void
  onAssign?: (issueId: string, staffName: string) => void
}

export const IssueTable: React.FC<IssueTableProps> = ({ issues }) => {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-2xs overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-[#e2e8f0] text-xs font-semibold text-[#64748b] uppercase tracking-wider">
              <th className="py-3.5 px-4">Issue Details</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4 text-center">Affected</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Assigned To</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <Link to={`/admin/issues/${issue.id}`} className="font-bold text-[#0f172a] hover:text-[#16a34a]">
                    {issue.title}
                  </Link>
                  <p className="text-xs text-[#64748b] truncate max-w-xs">{issue.category}</p>
                </td>
                <td className="py-3.5 px-4 font-medium text-[#0f172a]">{issue.location}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-[#14532d] font-bold text-xs border border-emerald-200">
                    <Users className="w-3 h-3 text-[#16a34a]" />
                    {issue.affected_count}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <PriorityBadge priority={issue.priority} size="sm" />
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={issue.status} size="sm" />
                </td>
                <td className="py-3.5 px-4 text-xs text-[#64748b]">
                  {issue.assignee_name ? (
                    <span className="flex items-center gap-1 text-[#0f172a] font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {issue.assignee_name}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    to={`/admin/issues/${issue.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#14532d] bg-[#ecfdf5] hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List Fallback (Blueprint Section 14) */}
      <div className="md:hidden divide-y divide-[#e2e8f0]">
        {issues.map((issue) => (
          <div key={issue.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <PriorityBadge priority={issue.priority} size="sm" />
              <StatusBadge status={issue.status} size="sm" />
            </div>
            <Link to={`/admin/issues/${issue.id}`} className="block font-bold text-[#0f172a] text-base">
              {issue.title}
            </Link>
            <div className="flex items-center justify-between text-xs text-[#64748b]">
              <span>{issue.location}</span>
              <span className="font-bold text-[#14532d]">{issue.affected_count} affected</span>
            </div>
            <div className="pt-2 flex justify-end">
              <Link
                to={`/admin/issues/${issue.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#14532d] bg-[#ecfdf5] px-3 py-1.5 rounded-lg"
              >
                <Eye className="w-3.5 h-3.5" />
                Manage Issue
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
