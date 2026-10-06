import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { StatCard } from '../../components/dashboard/StatCard'
import { Activity, CheckCircle2, RotateCcw, Users } from 'lucide-react'
import { useIssues } from '../../hooks/useIssues'

export const AdminAnalyticsPage: React.FC = () => {
  const { allIssues: issues, isLoading } = useIssues()
  const activeIssues = issues.filter(issue => issue.status !== 'resolved' && issue.status !== 'closed')
  const resolvedCount = issues.filter(issue => issue.status === 'resolved' || issue.status === 'closed').length
  const reopenedCount = issues.filter(issue => issue.status === 'reopened').length
  const activeCount = issues.filter(issue => issue.status !== 'resolved' && issue.status !== 'closed').length
  const categoryData = [...new Set(activeIssues.map(issue => issue.category))].map(name => {
    const categoryIssues = activeIssues.filter(issue => issue.category === name)
    return {
      name,
      count: categoryIssues.length,
      affected: categoryIssues.reduce((total, issue) => total + issue.affected_count, 0),
    }
  })
  const areaData = ['campus', 'hostel'].map(area => {
    const areaIssues = issues.filter(issue => issue.area_type === area)
    return {
      name: area === 'campus' ? 'Campus' : 'Hostel',
      issues: areaIssues.length,
      affected: areaIssues.reduce((total, issue) => total + issue.affected_count, 0),
    }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0f172a]">Impact & Operations Analytics</h1>
        <p className="text-xs text-[#64748b]">Issue and community impact totals from the current workspace data</p>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Issues" value={isLoading ? '...' : issues.length} icon={<Activity className="w-5 h-5" />} />
        <StatCard title="Active Queue" value={isLoading ? '...' : activeCount} icon={<Users className="w-5 h-5 text-blue-600" />} />
        <StatCard title="Resolved / Closed" value={isLoading ? '...' : resolvedCount} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="Reopened" value={isLoading ? '...' : reopenedCount} icon={<RotateCcw className="w-5 h-5 text-orange-600" />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Bar Chart */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-[#0f172a]">Active issues and affected students by category</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Issues" fill="#14532d" radius={[6, 6, 0, 0]} />
                <Bar dataKey="affected" name="Affected students" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campus and hostel comparison */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-[#0f172a]">Campus and hostel impact</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="issues" name="Issues" fill="#14532d" radius={[6, 6, 0, 0]} />
                <Bar dataKey="affected" name="Affected students" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
