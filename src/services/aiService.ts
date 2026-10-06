import type { AreaType, Severity } from '../lib/supabase'
import { issueService } from './issueService'

export interface AISuggestionResult {
  suggestedCategory: string
  suggestedSeverity: Severity
  similarIssue?: {
    id: string
    title: string
    affected_count: number
    location: string
  }
}

export const aiService = {
  async analyzeIssue(title: string, description: string, areaType: AreaType): Promise<AISuggestionResult> {
    const text = `${title} ${description}`.toLowerCase()
    const categories: Array<[string, RegExp]> = [
      ['Wi-Fi & Internet', /\b(wi[ -]?fi|internet|router|network)\b/],
      ['Plumbing', /\b(water|leak|plumb|tap|flush|pipe|purifier)\b/],
      ['Electrical & Lighting', /\b(light|power|wire|spark|socket|electric)\b/],
      ['HVAC / AC', /\b(ac|cool|fan|heat|air.?conditioning)\b/],
      ['Classroom & Labs', /\b(projector|class|board|bench|lab)\b/],
    ]
    const suggestedCategory = categories.find(([, pattern]) => pattern.test(text))?.[0] ?? 'General Maintenance'
    const suggestedSeverity: Severity = /\b(emergency|danger|fire|spark|flood|injury|unsafe)\b/.test(text)
      ? 'critical'
      : /\b(all|entire|outage|broken|leak|not working|down)\b/.test(text)
        ? 'high'
        : /\b(minor|small|occasionally|sometimes)\b/.test(text)
          ? 'low'
          : 'medium'

    const titleTokens = tokenize(title)
    const matched = titleTokens.size >= 2
      ? issueService.getIssues()
        .filter(issue => issue.status !== 'resolved' && issue.status !== 'closed' && issue.area_type === areaType)
        .map(issue => {
          const existingTokens = tokenize(issue.title)
          const overlap = [...titleTokens].filter(token => existingTokens.has(token)).length
          return { issue, score: overlap / Math.max(titleTokens.size, existingTokens.size) }
        })
        .filter(candidate => candidate.score >= 0.4)
        .sort((a, b) => b.score - a.score)[0]?.issue
      : undefined

    return {
      suggestedCategory,
      suggestedSeverity,
      similarIssue: matched ? {
        id: matched.id,
        title: matched.title,
        affected_count: matched.affected_count,
        location: matched.location
      } : undefined
    }
  }
}

function tokenize(value: string): Set<string> {
  return new Set(
    value.toLowerCase().match(/[a-z0-9]+/g)?.filter(token => token.length > 2) ?? []
  )
}
