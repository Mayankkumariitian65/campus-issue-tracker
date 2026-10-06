import React from 'react'
import { Search } from 'lucide-react'
import { useIssues } from '../../hooks/useIssues'
import { IssueTable } from '../../components/admin/IssueTable'
import { Input } from '../../components/common/Input'
import { Select } from '../../components/common/Select'
import type { Priority, IssueStatus } from '../../lib/supabase'

export const AdminIssuesPage: React.FC = () => {
  const { issues, filters, setFilters } = useIssues()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0f172a]">Campus Issue Management</h1>
        <p className="text-xs text-[#64748b]">Filter, assign, and update resolution status for campus issues</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <Input
            placeholder="Filter by issue title, location, category..."
            icon={<Search className="w-4 h-4" />}
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <Select
          value={filters.status || 'all'}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as IssueStatus | 'all' })}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'reported', label: 'Reported' },
            { value: 'assigned', label: 'Assigned' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'resolved', label: 'Resolved' },
            { value: 'closed', label: 'Closed' },
            { value: 'reopened', label: 'Reopened' },
          ]}
        />

        <Select
          value={filters.priority || 'all'}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value as Priority | 'all' })}
          options={[
            { value: 'all', label: 'All Priorities' },
            { value: 'critical', label: 'Critical' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' },
          ]}
        />
      </div>

      {/* Table Component */}
      <IssueTable issues={issues} />
    </div>
  )
}
