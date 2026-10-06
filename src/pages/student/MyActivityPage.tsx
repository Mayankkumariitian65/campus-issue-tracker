import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useIssues } from '../../hooks/useIssues'
import { issueService } from '../../services/issueService'
import { IssueCard } from '../../components/issues/IssueCard'
import { EmptyState } from '../../components/common/EmptyState'

export const MyActivityPage: React.FC = () => {
  const { user } = useAuth()
  const userId = user?.id || 'usr-student-1'
  const { issues, refreshIssues } = useIssues()

  const [activeTab, setActiveTab] = useState<'reported' | 'confirmed' | 'resolved'>('confirmed')

  const confirmedIssues = issues.filter((i) => issueService.hasUserConfirmed(i.id, userId))
  const reportedIssues = issues.filter((i) => i.created_by === userId)
  const resolvedIssues = confirmedIssues.filter((i) => i.status === 'resolved')

  const displayedIssues =
    activeTab === 'reported' ? reportedIssues : activeTab === 'confirmed' ? confirmedIssues : resolvedIssues

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0f172a]">My Activity</h1>
        <p className="text-xs text-[#64748b]">Track issues you have reported or confirmed</p>
      </div>

      {/* Activity Tabs */}
      <div className="flex border-b border-[#e2e8f0]">
        <button
          onClick={() => setActiveTab('confirmed')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'confirmed'
              ? 'border-[#14532d] text-[#14532d]'
              : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          Confirmed by Me ({confirmedIssues.length})
        </button>
        <button
          onClick={() => setActiveTab('reported')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'reported'
              ? 'border-[#14532d] text-[#14532d]'
              : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          My Reports ({reportedIssues.length})
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'resolved'
              ? 'border-[#14532d] text-[#14532d]'
              : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          Resolved ({resolvedIssues.length})
        </button>
      </div>

      {/* Issues Grid */}
      {displayedIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onUpdate={refreshIssues} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeTab} issues`}
          description={`You have not ${activeTab} any issues yet.`}
        />
      )}
    </div>
  )
}
