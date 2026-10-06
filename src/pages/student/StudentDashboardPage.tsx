import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PlusCircle,
  Search,
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Home,
  UserCheck,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useIssues } from '../../hooks/useIssues'
import { StatCard } from '../../components/dashboard/StatCard'
import { ActivityItem, type ActivityType } from '../../components/dashboard/ActivityItem'
import { IssueCard } from '../../components/issues/IssueCard'
import { Button } from '../../components/common/Button'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorState } from '../../components/common/ErrorState'

export const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { issues, isLoading, refreshIssues } = useIssues({ sortBy: 'smart_priority' })

  const [hasError, setHasError] = useState(false)

  // Calculate dynamic statistics from issueService
  const userId = user?.id || 'usr-student-1'
  const totalCount = issues.length
  const myReportsCount = issues.filter((i) => i.created_by === userId).length
  const resolvedCount = issues.filter((i) => i.status === 'resolved' || i.status === 'closed').length
  const pendingCount = issues.filter((i) => i.status === 'reported' || i.status === 'in_progress' || i.status === 'assigned').length

  // High Priority Issues
  const priorityIssues = issues.filter((i) => i.status !== 'resolved' && i.status !== 'closed' && (i.priority === 'high' || i.priority === 'critical' || i.affected_count > 10))

  // Dynamic Recent Activity feed items
  const recentActivities: Array<{
    id: string
    title: string
    action: ActivityType
    location: string
    timestamp: string
    issueId: string
  }> = [...issues]
    .sort((first, second) => new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime())
    .slice(0, 4)
    .map(issue => ({
      id: issue.id,
      title: issue.title,
      action: issue.status === 'reported' ? 'reported' : issue.status === 'reopened' ? 'reopened' : issue.status === 'resolved' || issue.status === 'closed' ? 'resolved' : 'updated',
      location: issue.location,
      timestamp: new Date(issue.updated_at).toLocaleString(),
      issueId: issue.id,
    }))

  // Time-based greeting
  const hour = new Date().getHours()
  const greetingTime = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  if (hasError) {
    return (
      <div className="py-8">
        <ErrorState
          title="Unable to load your dashboard"
          message="There was an issue fetching campus reports. Please check your connection and retry."
          onRetry={() => {
            setHasError(false)
            refreshIssues()
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HEADER WITH STUDENT CONTEXT */}
      <div className="bg-gradient-to-r from-[#14532d] to-[#166534] rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Campus Community Active</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {greetingTime}, {user?.name.split(' ')[0] || 'Student'}!
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Here's what's happening across your campus and hostel.
          </p>

          {/* Context Badges (Blueprint Section 9) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Campus: {user?.campus || 'Main Tech Campus'}</span>
            </span>

            {user?.hostel && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/20">
                <Home className="w-3.5 h-3.5 text-emerald-300" />
                <span>Hostel: {user.hostel} {user.block ? `(${user.block})` : ''}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto shrink-0">
          <Button
            variant="accent"
            size="md"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => navigate('/student/report')}
          >
            Report Issue
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={<Search className="w-4 h-4" />}
            onClick={() => navigate('/student/issues')}
          >
            Explore Issues
          </Button>
        </div>
      </div>

      {/* 2. STAT CARDS (4 PROMINENT CARDS) */}
      {isLoading ? (
        <LoadingSkeleton count={1} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Issues"
            value={totalCount}
            subtitle="Across your campus"
            icon={<Activity className="w-5 h-5 text-[#14532d]" />}
          />
          <StatCard
            title="My Reports"
            value={myReportsCount}
            subtitle="Issues you reported"
            icon={<UserCheck className="w-5 h-5 text-emerald-700" />}
          />
          <StatCard
            title="Resolved"
            value={resolvedCount}
            subtitle="Successfully resolved"
            icon={<CheckCircle2 className="w-5 h-5 text-[#16a34a]" />}
          />
          <StatCard
            title="Pending"
            value={pendingCount}
            subtitle="Still being worked on"
            icon={<Clock className="w-5 h-5 text-amber-600" />}
          />
        </div>
      )}

      {/* 3. QUICK ACTION BANNER */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[#16a34a]">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a]">
            Can't find your problem?
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b]">
            Report it once and let fellow students confirm it to boost real priority.
          </p>
        </div>
        <Button
          variant="primary"
          icon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate('/student/report')}
          className="shrink-0 font-bold"
        >
          Report New Issue →
        </Button>
      </div>

      {/* 4. MAIN CONTENT GRID: PRIORITY ISSUES & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Priority Issues (Main Column) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#0f172a]">Priority Issues</h2>
              <p className="text-xs text-[#64748b]">
                Problems affecting the most students need attention first.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-[#14532d]"
              onClick={() => navigate('/student/issues')}
            >
              View All ({totalCount})
            </Button>
          </div>

          {isLoading ? (
            <LoadingSkeleton count={2} />
          ) : priorityIssues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {priorityIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} onUpdate={refreshIssues} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No major issues right now."
              description="Your campus is looking good. You can still report a problem if you find one."
              actionLabel="Report an Issue →"
              onAction={() => navigate('/student/report')}
            />
          )}
        </div>

        {/* Recent Activity (Side Column) */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#0f172a]">Recent Activity</h2>
            <p className="text-xs text-[#64748b]">Updates on reports and confirmations</p>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => (
              <ActivityItem
                key={act.id}
                id={act.id}
                title={act.title}
                action={act.action}
                location={act.location}
                timestamp={act.timestamp}
                status={issues.find(issue => issue.id === act.issueId)?.status}
                onClick={() => navigate(`/student/issues/${act.issueId}`)}
              />
            ))}
            {recentActivities.length === 0 && <p className="text-sm text-[#64748b]">No campus updates yet.</p>}
          </div>

          <div className="p-4 bg-[#ecfdf5] border border-emerald-200 rounded-xl text-center">
            <p className="text-xs font-extrabold text-[#14532d] mb-1">
              One Issue. Multiple Students.
            </p>
            <p className="text-[11px] text-emerald-800">
              Confirm issues in one click to help campus facilities prioritize what matters most.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
