import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, UserCheck, CheckCircle2, MapPin, Tag, Calendar } from 'lucide-react'
import { issueService } from '../../services/issueService'
import { PriorityBadge, StatusBadge } from '../../components/common/Badge'
import { IssueTimeline } from '../../components/issues/IssueTimeline'
import { Button } from '../../components/common/Button'
import { Select } from '../../components/common/Select'
import { Textarea } from '../../components/common/Textarea'
import type { IssueStatus } from '../../lib/supabase'

export const AdminIssueDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [issue, setIssue] = useState(() => issueService.getIssueById(id || ''))
  const [status, setStatus] = useState<IssueStatus>(issue?.status || 'reported')
  const [assignedTo, setAssignedTo] = useState(issue?.assignee_name || 'IT Network Team')
  const [notes, setNotes] = useState(issue?.resolution_notes || '')
  const [isSaved, setIsSaved] = useState(false)

  if (!issue) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-[#e2e8f0]">
        <h2 className="text-xl font-bold text-[#0f172a] mb-2">Issue Not Found</h2>
        <Button variant="primary" onClick={() => navigate('/admin/issues')}>
          Back to Issues
        </Button>
      </div>
    )
  }

  const issuePhotos = issue.image_urls?.length ? issue.image_urls : issue.image_url ? [issue.image_url] : []

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    issueService.updateStatus(issue.id, status, notes, assignedTo)
    setIssue(issueService.getIssueById(issue.id))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin/issues')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748b] hover:text-[#0f172a] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Issue Management
      </button>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={issue.priority} />
            <StatusBadge status={issue.status} />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-[#14532d] text-sm font-bold border border-emerald-200">
            <span>{issue.affected_count} Students Affected</span>
          </div>
        </div>

        {/* Title & Metadata */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a]">{issue.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748b] mt-2">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {issue.location}</span>
            <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {issue.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Logged by {issue.creator_name}</span>
          </div>
        </div>

        {issuePhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {issuePhotos.map((photo, index) => (
              <img
                key={`${issue.id}-admin-photo-${index}`}
                src={photo}
                alt={`Evidence for ${issue.title}, photo ${index + 1}`}
                className="w-full aspect-video object-cover rounded-lg border border-[#e2e8f0]"
              />
            ))}
          </div>
        )}

        {/* Timeline */}
        <IssueTimeline currentStatus={issue.status} verifiedByStudent={issue.verified_by_student} />

        {/* Admin Operational Controls Form */}
        <form onSubmit={handleUpdate} className="p-5 bg-slate-50 border border-[#e2e8f0] rounded-xl space-y-4">
          <h3 className="text-sm font-extrabold text-[#0f172a] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#14532d]" /> Staff Assignment & Resolution Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Assigned Maintenance Team"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              options={[
                { value: 'IT Network Team', label: 'IT Network Team' },
                { value: 'Electrical Maintenance', label: 'Electrical Maintenance' },
                { value: 'Plumbing Services', label: 'Plumbing Services' },
                { value: 'HVAC Unit', label: 'HVAC Maintenance' },
                { value: 'General Estate Ops', label: 'General Estate Ops' },
              ]}
            />

            <Select
              label="Update Resolution Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as IssueStatus)}
              options={[
                { value: 'reported', label: 'Reported' },
                { value: 'assigned', label: 'Assigned to Staff' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved (Send for Student Verification)' },
                ...(issue.status === 'closed' ? [{ value: 'closed', label: 'Closed (Student Verified)' }] : []),
                { value: 'reopened', label: 'Reopened' },
              ]}
            />
          </div>

          <Textarea
            label="Resolution Notes / Staff Remarks"
            placeholder="Describe action taken, replacement parts installed, or work completed..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex items-center justify-between pt-2">
            {isSaved && <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Status Saved!</span>}
            <Button type="submit" variant="primary" className="ml-auto font-bold">
              Save Resolution Updates
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
