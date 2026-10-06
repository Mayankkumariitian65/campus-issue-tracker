import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Building2,
  Home,
  PlusCircle,
  ShieldCheck,
  Flame,
  Users,
  Tag,
  SlidersHorizontal,
  X,
  ArrowRight
} from 'lucide-react'
import { useIssues } from '../../hooks/useIssues'
import { IssueCard } from '../../components/issues/IssueCard'
import { Input } from '../../components/common/Input'
import { Select } from '../../components/common/Select'
import { Button } from '../../components/common/Button'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorState } from '../../components/common/ErrorState'
import type { AreaType, Priority, IssueStatus } from '../../lib/supabase'

export const ExploreIssuesPage: React.FC = () => {
  const navigate = useNavigate()
  const { issues, allIssues, isLoading, filters, setFilters, refreshIssues } = useIssues({
    sortBy: 'smart_priority',
  })

  // Local states
  const [activeArea, setActiveArea] = useState<AreaType | 'all'>('campus')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleAreaChange = (area: AreaType | 'all') => {
    setActiveArea(area)
    setFilters({ ...filters, areaType: area })
  }

  // Calculate category metrics for sidebar/supporting panel
  const categoriesList = [
    { name: 'All Categories', value: 'all' },
    { name: 'Network / Wi-Fi', value: 'Network / Wi-Fi' },
    { name: 'Plumbing', value: 'Plumbing' },
    { name: 'Electrical & Lighting', value: 'Electrical & Lighting' },
    { name: 'HVAC / AC', value: 'HVAC / AC' },
    { name: 'General Maintenance', value: 'General Maintenance' },
  ]

  const totalAffectedSum = allIssues.reduce((sum, i) => sum + i.affected_count, 0)

  if (hasError) {
    return (
      <div className="py-8">
        <ErrorState
          title="Unable to load issues"
          message="Could not fetch existing campus reports. Please check your connection."
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
      {/* 1. HEADER WITH USP STATEMENT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#e2e8f0] p-6 rounded-2xl shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#14532d] text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>One issue. Multiple students. One clear priority.</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Campus Issues
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] mt-1">
            Explore real problems reported by students in your campus and hostel before logging a duplicate.
          </p>
        </div>

        {/* Campus / Hostel Context Toggle (Blueprint Section 23) */}
        <div className="inline-flex p-1.5 bg-slate-100 border border-[#e2e8f0] rounded-xl shrink-0">
          <button
            onClick={() => handleAreaChange('campus')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
              activeArea === 'campus'
                ? 'bg-[#14532d] text-white shadow-2xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Campus</span>
          </button>

          <button
            onClick={() => handleAreaChange('hostel')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
              activeArea === 'hostel'
                ? 'bg-[#14532d] text-white shadow-2xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Hostel</span>
          </button>

          <button
            onClick={() => handleAreaChange('all')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeArea === 'all'
                ? 'bg-white text-[#14532d] shadow-2xs border border-[#e2e8f0]'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Field */}
          <div className="md:col-span-6">
            <Input
              placeholder="Search issues by title, category, or location..."
              icon={<Search className="w-4 h-4" />}
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Sorting Dropdown */}
          <div className="md:col-span-3">
            <Select
              value={filters.sortBy || 'smart_priority'}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              options={[
                { value: 'smart_priority', label: 'Sort: Smart Priority' },
                { value: 'most_affected', label: 'Sort: Most Affected' },
                { value: 'newest', label: 'Sort: Newest First' },
              ]}
            />
          </div>

          {/* Priority Filter */}
          <div className="md:col-span-3 hidden md:block">
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
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="flex md:hidden items-center justify-between pt-2 border-t border-[#e2e8f0]">
          <span className="text-xs font-bold text-[#64748b]">
            Showing {issues.length} of {allIssues.length} issues
          </span>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-1.5 text-xs font-extrabold text-[#14532d] bg-[#ecfdf5] px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="md:hidden pt-3 border-t border-[#e2e8f0] grid grid-cols-1 gap-3 animate-in fade-in">
            <Select
              label="Category"
              value={filters.category || 'all'}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              options={categoriesList.map((c) => ({ value: c.value, label: c.name }))}
            />

            <Select
              label="Status"
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
          </div>
        )}
      </div>

      {/* 3. MAIN CONTENT LAYOUT: SIDEBAR FILTERS + ISSUES GRID + SUPPORTING PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Desktop Category Sidebar Filter Panel */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-[#0f172a] uppercase tracking-wider">
              Issue Categories
            </h3>

            <div className="space-y-1 text-xs">
              {categoriesList.map((cat) => {
                const count =
                  cat.value === 'all'
                    ? allIssues.length
                    : allIssues.filter((i) => i.category === cat.value).length
                const isSelected = (filters.category || 'all') === cat.value

                return (
                  <button
                    key={cat.value}
                    onClick={() => setFilters({ ...filters, category: cat.value })}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#14532d] text-white font-bold'
                        : 'text-[#64748b] hover:bg-slate-100 hover:text-[#0f172a]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Status Filter Card */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-extrabold text-[#0f172a] uppercase tracking-wider">
              Filter by Status
            </h3>
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
          </div>
        </div>

        {/* Center Main Issue Cards Grid */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#64748b]">
            <span>
              Showing {issues.length} of {allIssues.length} issues
            </span>
            <span className="text-[#14532d]">{totalAffectedSum} total student confirmations</span>
          </div>

          {isLoading ? (
            <LoadingSkeleton count={3} />
          ) : issues.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} onUpdate={refreshIssues} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No issues found"
              description="Try changing your filters or search terms to discover reported campus problems."
              actionLabel="Clear Filters"
              onAction={() =>
                setFilters({
                  areaType: 'all',
                  search: '',
                  category: 'all',
                  priority: 'all',
                  status: 'all',
                  sortBy: 'smart_priority',
                })
              }
            />
          )}
        </div>

        {/* Right Supporting Panel (Blueprint Section 30 & 34) */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          
          {/* "Can't Find Your Problem?" Discovery Card */}
          <div className="bg-gradient-to-b from-[#ecfdf5] to-white border border-emerald-200 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="p-2.5 bg-[#14532d] text-white rounded-xl w-fit">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-base font-extrabold text-[#0f172a]">
              Don't find your problem?
            </h4>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Report a new issue in just 1 minute. Other students can confirm it to raise priority.
            </p>
            <Button
              variant="primary"
              fullWidth
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/student/report')}
              className="font-bold py-2.5"
            >
              Report Now →
            </Button>
          </div>

          {/* Impact Banner */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-2xs text-center space-y-2">
            <Flame className="w-6 h-6 text-[#16a34a] mx-auto" />
            <h5 className="text-xs font-extrabold text-[#0f172a]">Smart Priority Active</h5>
            <p className="text-[11px] text-[#64748b]">
              CampusFix automatically ranks issues by severity and number of affected student confirmations.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}
