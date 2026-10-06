import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { useIssues } from '../../hooks/useIssues'
import { StatCard } from '../../components/dashboard/StatCard'
import { IssueTable } from '../../components/admin/IssueTable'
import { Button } from '../../components/common/Button'

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { issues } = useIssues({ sortBy: 'smart_priority' })

  const activeIssues = issues.filter(i => i.status !== 'resolved' && i.status !== 'closed')
  const totalCount = issues.length
  const pendingCount = activeIssues.length
  const highPriorityCount = activeIssues.filter(i => i.priority === 'high' || i.priority === 'critical').length
  const resolvedCount = issues.filter(i => i.status === 'resolved' || i.status === 'closed').length

  const topPriorityQueue = activeIssues.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8f0] p-6 rounded-2xl shadow-2xs">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a]">Operational Priority Queue</h1>
          <p className="text-xs text-[#64748b] mt-1">
            Community complaints sorted by severity and affected student count.
          </p>
        </div>
        <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} onClick={() => navigate('/admin/issues')}>
          Manage All Issues ({totalCount})
        </Button>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Campus Issues" value={totalCount} icon={<Activity className="w-5 h-5" />} />
        <StatCard title="Pending Queue" value={pendingCount} icon={<Clock className="w-5 h-5 text-amber-600" />} />
        <StatCard title="High / Critical Impact" value={highPriorityCount} icon={<AlertTriangle className="w-5 h-5 text-red-600" />} />
        <StatCard title="Resolved Issues" value={resolvedCount} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} />
      </div>

      {/* Priority Queue Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#0f172a]">Highest Impact Queue</h2>
          <span className="text-xs text-[#64748b] font-medium">Sorted by Community Impact</span>
        </div>

        <IssueTable issues={topPriorityQueue} />
      </div>
    </div>
  )
}
