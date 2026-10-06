import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Tag, Users, Clock, ArrowRight } from 'lucide-react'
import type { Issue } from '../../lib/supabase'
import { PriorityBadge, StatusBadge } from '../common/Badge'
import { ConfirmationButton } from './ConfirmationButton'
import { useAuth } from '../../hooks/useAuth'
import { issueService } from '../../services/issueService'

export interface IssueCardProps {
  issue: Issue
  onUpdate?: () => void
  showActions?: boolean
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onUpdate, showActions = true }) => {
  const { user } = useAuth()
  const [isConfirming, setIsConfirming] = React.useState(false)
  const userId = user?.id || 'usr-guest'

  const hasConfirmed = issueService.hasUserConfirmed(issue.id, userId)

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      issueService.confirmIssue(issue.id, userId)
      setIsConfirming(false)
      if (onUpdate) onUpdate()
    }, 250)
  }

  const isStudent = !user || user.role === 'student'
  const detailUrl = isStudent ? `/student/issues/${issue.id}` : `/admin/issues/${issue.id}`

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header Badges & Affected Count Highlight */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={issue.priority} />
            <StatusBadge status={issue.status} />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-[#14532d] text-xs font-bold border border-emerald-200">
            <Users className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>{issue.affected_count} students affected</span>
          </div>
        </div>

        {/* Issue Title */}
        <Link to={detailUrl} className="block group-hover:text-[#16a34a] transition-colors">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a] leading-snug mb-2">
            {issue.title}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p className="text-xs sm:text-sm text-[#64748b] line-clamp-2 mb-4">
          {issue.description}
        </p>
      </div>

      <div>
        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#64748b] pt-3 border-t border-[#e2e8f0] mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium">{issue.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{issue.category}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto text-[11px] text-slate-400">
            <Clock className="w-3 h-3" />
            <span>{new Date(issue.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Footer Actions */}
        {showActions && (
          <div className="flex items-center justify-between gap-3 pt-1">
            {issue.status !== 'resolved' && issue.status !== 'closed' ? (
              <ConfirmationButton
                hasConfirmed={hasConfirmed}
                affectedCount={issue.affected_count}
                onConfirm={handleConfirm}
                isLoading={isConfirming}
                size="sm"
              />
            ) : <span className="text-xs font-semibold text-[#64748b]">Confirmations closed</span>}
            <Link
              to={detailUrl}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#14532d] hover:text-[#16a34a] transition-colors p-1"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
