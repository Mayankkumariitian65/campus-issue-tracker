import { useState, useCallback, useEffect } from 'react'
import type { Issue, AreaType, Priority, IssueStatus } from '../lib/supabase'
import { issueService } from '../services/issueService'

export interface IssueFilters {
  areaType?: AreaType | 'all'
  search?: string
  category?: string
  priority?: Priority | 'all'
  status?: IssueStatus | 'all'
  location?: string
  sortBy?: 'smart_priority' | 'most_affected' | 'newest'
}

export const useIssues = (initialFilters?: IssueFilters) => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filters, setFilters] = useState<IssueFilters>({
    areaType: 'all',
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all',
    sortBy: 'smart_priority',
    ...initialFilters,
  })

  const refreshIssues = useCallback(() => {
    setIsLoading(true)
    const data = issueService.getIssues()
    setIssues(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    refreshIssues()
  }, [refreshIssues])

  const filteredIssues = issues.filter(issue => {
    if (filters.areaType && filters.areaType !== 'all' && issue.area_type !== filters.areaType) {
      return false
    }
    if (filters.category && filters.category !== 'all' && issue.category !== filters.category) {
      return false
    }
    if (filters.priority && filters.priority !== 'all' && issue.priority !== filters.priority) {
      return false
    }
    if (filters.status && filters.status !== 'all' && issue.status !== filters.status) {
      return false
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const matchTitle = issue.title.toLowerCase().includes(q)
      const matchLocation = issue.location.toLowerCase().includes(q)
      const matchCategory = issue.category.toLowerCase().includes(q)
      if (!matchTitle && !matchLocation && !matchCategory) return false
    }
    return true
  }).sort((a, b) => {
    if (filters.sortBy === 'most_affected') {
      return b.affected_count - a.affected_count
    }
    if (filters.sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    // Default: Smart priority weight
    const priorityWeight: Record<Priority, number> = { critical: 4, high: 3, medium: 2, low: 1 }
    const pDiff = priorityWeight[b.priority] - priorityWeight[a.priority]
    if (pDiff !== 0) return pDiff
    return b.affected_count - a.affected_count
  })

  return {
    issues: filteredIssues,
    allIssues: issues,
    isLoading,
    filters,
    setFilters,
    refreshIssues,
  }
}
