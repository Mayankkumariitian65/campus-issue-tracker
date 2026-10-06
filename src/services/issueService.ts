import type { Issue, IssueStatus, Severity, Priority } from '../lib/supabase'

// Initial realistic dataset matching the blueprint story
const INITIAL_ISSUES: Issue[] = [
  {
    id: 'iss-101',
    title: 'Wi-Fi Not Working on 3rd & 4th Floors',
    description: 'The router access point on 3rd floor Block A is down. Over 25+ students are unable to submit lab assignments.',
    area_type: 'hostel',
    category: 'Network / Wi-Fi',
    location: 'Hostel Block A, 3rd Floor',
    severity: 'high',
    priority: 'high',
    status: 'in_progress',
    affected_count: 27,
    created_by: 'usr-student-1',
    creator_name: 'Aarav Sharma',
    assigned_to: 'usr-staff-wifi',
    assignee_name: 'IT Network Team',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'iss-102',
    title: 'Water Purifier Leaking & Low Pressure',
    description: 'The RO drinking water unit outside Room 204 is leaking onto the corridor floor and creating a slip hazard.',
    area_type: 'hostel',
    category: 'Plumbing',
    location: 'Hostel Block B, Ground Floor',
    severity: 'medium',
    priority: 'high',
    status: 'reported',
    affected_count: 14,
    created_by: 'usr-student-2',
    creator_name: 'Priya Patel',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'iss-103',
    title: 'Central Library AC Not Cooling Main Reading Room',
    description: 'AC unit 3 in central reading room is making loud noise and blowing warm air.',
    area_type: 'campus',
    category: 'HVAC / AC',
    location: 'Central Library 1st Floor',
    severity: 'medium',
    priority: 'medium',
    status: 'assigned',
    affected_count: 42,
    created_by: 'usr-student-3',
    creator_name: 'Rohan Verma',
    assigned_to: 'usr-staff-ac',
    assignee_name: 'HVAC Maintenance',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'iss-104',
    title: 'Broken Streetlight Near Science Block Path',
    description: 'Path between Science Block and Girls Hostel is completely unlit at night.',
    area_type: 'campus',
    category: 'Electrical & Lighting',
    location: 'Science Pathway North',
    severity: 'critical',
    priority: 'critical',
    status: 'resolved',
    affected_count: 58,
    created_by: 'usr-student-4',
    creator_name: 'Ananya Gupta',
    assigned_to: 'usr-staff-elec',
    assignee_name: 'Electrical Maintenance',
    resolution_notes: 'Replaced halogen lamp with 100W LED streetlight unit.',
    verified_by_student: true,
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  }
]

const STORAGE_KEY = 'campusfix_issues'
const CONFIRMATIONS_KEY = 'campusfix_user_confirmations'
const ALL_CONFIRMATIONS_KEY = 'campusfix_confirmations'

interface StoredConfirmation {
  issueId: string
  userId: string
  createdAt: string
}

export const issueService = {
  getIssues(): Issue[] {
    const data = localStorage.getItem(STORAGE_KEY)
    let issues: Issue[]
    try {
      issues = data ? JSON.parse(data) as Issue[] : INITIAL_ISSUES
    } catch {
      issues = INITIAL_ISSUES
    }
    const confirmations = getAllConfirmations(issues)
    const updatedIssues = issues.map(issue => {
      const affectedCount = confirmations.filter(confirmation => confirmation.issueId === issue.id).length
      return {
        ...issue,
        affected_count: affectedCount,
        priority: calculateSmartPriority(issue.severity, affectedCount),
      }
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIssues))
    return updatedIssues
  },

  getIssueById(id: string): Issue | undefined {
    const issues = this.getIssues()
    return issues.find(issue => issue.id === id)
  },

  createIssue(newIssueData: Omit<Issue, 'id' | 'affected_count' | 'status' | 'created_at' | 'updated_at' | 'priority'>): Issue {
    const issues = this.getIssues()
    
    // Smart priority calculation combining severity and initial affected count (1)
    const priority = calculateSmartPriority(newIssueData.severity, 1)

    const newIssue: Issue = {
      ...newIssueData,
      id: `iss-${Date.now()}`,
      status: 'reported',
      affected_count: 0,
      priority,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const updated = [newIssue, ...issues]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    
    // Auto confirm for creator
    this.confirmIssue(newIssue.id, newIssueData.created_by)
    return this.getIssueById(newIssue.id) || newIssue
  },

  confirmIssue(issueId: string, userId: string): { success: boolean; affectedCount: number; message: string } {
    const issues = this.getIssues()
    const target = issues.find(issue => issue.id === issueId)
    if (!target) return { success: false, affectedCount: 0, message: 'Issue not found' }
    if (target.status === 'resolved' || target.status === 'closed') {
      return { success: false, affectedCount: target.affected_count, message: 'This issue is no longer accepting confirmations.' }
    }

    const confirmations = getAllConfirmations(issues)
    if (confirmations.some(confirmation => confirmation.issueId === issueId && confirmation.userId === userId)) {
      return { success: false, affectedCount: target.affected_count, message: 'You have already confirmed this issue.' }
    }

    confirmations.push({ issueId, userId, createdAt: new Date().toISOString() })
    localStorage.setItem(ALL_CONFIRMATIONS_KEY, JSON.stringify(confirmations))
    localStorage.setItem(`${CONFIRMATIONS_KEY}_${userId}`, JSON.stringify(
      confirmations.filter(confirmation => confirmation.userId === userId).map(confirmation => confirmation.issueId)
    ))

    target.affected_count = confirmations.filter(confirmation => confirmation.issueId === issueId).length
    target.priority = calculateSmartPriority(target.severity, target.affected_count)
    target.updated_at = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues))
    return { success: true, affectedCount: target.affected_count, message: 'Your confirmation has been recorded!' }
  },

  hasUserConfirmed(issueId: string, userId: string): boolean {
    const issues = this.getIssues()
    return getAllConfirmations(issues).some(
      confirmation => confirmation.issueId === issueId && confirmation.userId === userId
    )
  },

  updateStatus(issueId: string, status: IssueStatus, notes?: string, assignedTo?: string): Issue | undefined {
    const issues = this.getIssues()
    const target = issues.find(i => i.id === issueId)
    if (target) {
      target.status = status
      target.updated_at = new Date().toISOString()
      if (notes) target.resolution_notes = notes
      if (assignedTo) {
        target.assigned_to = assignedTo
        target.assignee_name = assignedTo
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(issues))
    }
    return target
  },

  verifyResolution(issueId: string, isFixed: boolean, userId: string): Issue | undefined {
    const issues = this.getIssues()
    const target = issues.find(i => i.id === issueId)
    if (!target || target.status !== 'resolved') return undefined
    if (target.created_by !== userId && !this.hasUserConfirmed(issueId, userId)) return undefined

    target.verified_by_student = isFixed
    target.status = isFixed ? 'closed' : 'reopened'
    target.updated_at = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues))
    return target
  }
}

function getAllConfirmations(issues: Issue[]): StoredConfirmation[] {
  const storedData = localStorage.getItem(ALL_CONFIRMATIONS_KEY)
  try {
    if (storedData) return JSON.parse(storedData) as StoredConfirmation[]
  } catch {
    localStorage.removeItem(ALL_CONFIRMATIONS_KEY)
  }

  const priorConfirmations: StoredConfirmation[] = []
  const confirmationPrefix = `${CONFIRMATIONS_KEY}_`
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (!key?.startsWith(confirmationPrefix)) continue
    try {
      const issueIds = JSON.parse(localStorage.getItem(key) || '[]') as string[]
      const userId = key.slice(confirmationPrefix.length)
      for (const issueId of issueIds) {
        priorConfirmations.push({ issueId, userId, createdAt: new Date().toISOString() })
      }
    } catch {
      localStorage.removeItem(key)
    }
  }

  const migrated = [...priorConfirmations]
  for (const issue of issues) {
    const recordedCount = priorConfirmations.filter(confirmation => confirmation.issueId === issue.id).length
    const baselineCount = Math.max(0, issue.affected_count - recordedCount)
    for (let index = 0; index < baselineCount; index += 1) {
      migrated.push({
        issueId: issue.id,
        userId: `seed-${issue.id}-${index}`,
        createdAt: issue.created_at,
      })
    }
  }

  localStorage.setItem(ALL_CONFIRMATIONS_KEY, JSON.stringify(migrated))
  return migrated
}

// Core USP formula: Smart Priority combining severity & affected community count
function calculateSmartPriority(severity: Severity, affectedCount: number): Priority {
  if (severity === 'critical' || affectedCount > 35) return 'critical'
  if (severity === 'high' || affectedCount > 20) return 'high'
  if (severity === 'medium' || affectedCount > 10) return 'medium'
  return 'low'
}
