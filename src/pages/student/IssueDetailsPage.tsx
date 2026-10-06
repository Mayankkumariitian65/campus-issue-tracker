import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Tag,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  HelpCircle,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react'
import { issueService } from '../../services/issueService'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../components/common/Toast'
import { PriorityBadge, StatusBadge } from '../../components/common/Badge'
import { ConfirmationButton } from '../../components/issues/ConfirmationButton'
import { IssueTimeline } from '../../components/issues/IssueTimeline'
import { Button } from '../../components/common/Button'
import { Modal } from '../../components/common/Modal'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorState } from '../../components/common/ErrorState'
import type { Issue } from '../../lib/supabase'

export const IssueDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showSuccess, showError, showInfo } = useToast()

  const userId = user?.id || 'usr-student-1'

  const [issue, setIssue] = useState<Issue | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)
  const [showReopenModal, setShowReopenModal] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const data = issueService.getIssueById(id || '')
    setIssue(data)
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return (
      <div className="py-8 max-w-5xl mx-auto space-y-6">
        <LoadingSkeleton count={3} />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="py-8 max-w-5xl mx-auto">
        <ErrorState
          title="Unable to load this issue"
          message="An error occurred while retrieving issue details. Please try again."
          onRetry={() => {
            setHasError(false)
            setIssue(issueService.getIssueById(id || ''))
          }}
        />
      </div>
    )
  }

  if (!issue) {
    return (
      <div className="py-12 max-w-lg mx-auto text-center bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-[#0f172a]">Issue Not Found</h2>
        <p className="text-xs text-[#64748b]">
          This issue may have been removed, resolved, or is no longer available.
        </p>
        <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/student/issues')}>
          Back to Issues
        </Button>
      </div>
    )
  }

  const hasConfirmed = issueService.hasUserConfirmed(issue.id, userId)
  const canVerifyResolution = issue.created_by === userId || hasConfirmed
  const issuePhotos = issue.image_urls?.length ? issue.image_urls : issue.image_url ? [issue.image_url] : []

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      issueService.confirmIssue(issue.id, userId)
      const updated = issueService.getIssueById(issue.id)
      setIssue(updated)
      setIsConfirming(false)
    }, 250)
  }

  const handleVerifyFixed = () => {
    const updated = issueService.verifyResolution(issue.id, true, userId)
    if (!updated) {
      showError('Verification unavailable', 'Only a student who reported or confirmed this issue can verify it.')
      return
    }
    setIssue(updated)
    showSuccess('Verification Recorded!', 'Thank you! Your verification helps keep campus tracking accurate.')
  }

  const handleConfirmReopen = () => {
    const updated = issueService.verifyResolution(issue.id, false, userId)
    if (!updated) {
      showError('Reopen unavailable', 'Only a student who reported or confirmed this issue can reopen it.')
      return
    }
    setIssue(updated)
    setShowReopenModal(false)
    showInfo('Issue Reopened', 'The issue has been returned to the operational priority queue for staff action.')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* 1. BREADCRUMB / BACK LINK */}
      <div className="flex items-center justify-between">
        <Link
          to="/student/issues"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#14532d] hover:text-[#16a34a] transition-colors bg-white px-3 py-1.5 rounded-lg border border-[#e2e8f0] shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Issues
        </Link>
        <span className="text-xs font-bold text-[#64748b]">Issue #{issue.id}</span>
      </div>

      {/* 2. MAIN LAYOUT GRID (LEFT MAIN DETAILS + RIGHT SUPPORTING COLUMN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Issue Summary Hero Card */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header Badges & Confirmation Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <PriorityBadge priority={issue.priority} />
                <StatusBadge status={issue.status} />
              </div>

              {issue.status !== 'resolved' && issue.status !== 'closed' && (
                <ConfirmationButton
                  hasConfirmed={hasConfirmed}
                  affectedCount={issue.affected_count}
                  onConfirm={handleConfirm}
                  isLoading={isConfirming}
                />
              )}
            </div>

            {/* Title & Key Attributes */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight leading-tight">
                {issue.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-[#64748b]">
                <span className="flex items-center gap-1.5 text-[#0f172a]">
                  <MapPin className="w-4 h-4 text-[#16a34a]" /> {issue.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-slate-400" /> {issue.category}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-4 h-4" /> Reported {new Date(issue.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Community Impact Banner & Avatars (Blueprint Section 7) */}
            <div className="p-4 bg-[#ecfdf5] border border-emerald-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full bg-[#14532d] text-white flex items-center justify-center font-extrabold text-xs ring-2 ring-white">AS</div>
                  <div className="inline-block h-8 w-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center font-extrabold text-xs ring-2 ring-white">PP</div>
                  <div className="inline-block h-8 w-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xs ring-2 ring-white">RV</div>
                </div>

                <div>
                  <p className="text-xs font-black text-[#14532d]">
                    {issue.affected_count} Students Affected
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    Students across {issue.location} have confirmed this same problem.
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-xs font-extrabold text-[#14532d] bg-white px-2.5 py-1 rounded-md border border-emerald-200">
                  Smart Priority Active
                </span>
              </div>
            </div>

            {/* About This Issue (Description) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
                About this issue
              </h3>
              <div className="p-4 bg-slate-50 border border-[#e2e8f0] rounded-xl text-sm text-[#0f172a] leading-relaxed">
                {issue.description}
              </div>
            </div>

            {issuePhotos.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-500" /> Photo Evidence
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {issuePhotos.map((photo, index) => (
                    <img
                      key={`${issue.id}-photo-${index}`}
                      src={photo}
                      alt={`Evidence for ${issue.title}, photo ${index + 1}`}
                      className="w-full aspect-video object-cover rounded-lg border border-[#e2e8f0]"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Complete Lifecycle Timeline (Blueprint Section 11) */}
            <div className="pt-6 border-t border-[#e2e8f0]">
              <IssueTimeline
                currentStatus={issue.status}
                verifiedByStudent={issue.verified_by_student}
                affectedCount={issue.affected_count}
                assigneeName={issue.assignee_name || 'IT Network Team'}
                resolutionNotes={issue.resolution_notes}
              />
            </div>

            {/* Staff Resolution Notes & Student Verification Controls (Blueprint Section 15 & 19) */}
            {(issue.status === 'resolved' || issue.status === 'closed') && (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-[#14532d] font-black text-base">
                  <CheckCircle2 className="w-6 h-6 text-[#16a34a]" />
                  <span>{issue.status === 'closed' ? 'Resolution Verified' : 'Staff Marked Issue as Resolved'}</span>
                </div>

                {issue.resolution_notes ? (
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-xs text-[#0f172a] space-y-1">
                    <p className="font-bold text-[#14532d]">Resolution Remarks:</p>
                    <p>{issue.resolution_notes}</p>
                  </div>
                ) : (
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-xs text-[#0f172a]">
                    <p className="font-bold text-[#14532d]">Resolution Remarks:</p>
                    <p>Work completed by assigned maintenance staff.</p>
                  </div>
                )}

                {/* Student Verification Action Buttons */}
                {issue.status === 'resolved' && !issue.verified_by_student && canVerifyResolution ? (
                  <div className="pt-2 border-t border-emerald-200 space-y-2">
                    <p className="text-xs font-bold text-[#0f172a]">
                      Student Verification: Is this issue actually fixed?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="accent"
                        icon={<CheckCircle2 className="w-4 h-4" />}
                        onClick={handleVerifyFixed}
                      >
                        Yes, It's Fixed
                      </Button>
                      <Button
                        variant="danger"
                        icon={<XCircle className="w-4 h-4" />}
                        onClick={() => setShowReopenModal(true)}
                      >
                        Not Fixed (Reopen)
                      </Button>
                    </div>
                  </div>
                ) : issue.status === 'resolved' && !canVerifyResolution ? (
                  <p className="text-xs text-[#64748b]">Resolution verification is available to students who reported or confirmed this issue.</p>
                ) : issue.status === 'closed' || issue.verified_by_student ? (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
                    <span>This issue was verified as fixed and closed.</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Reopened Warning Notice (Blueprint Section 18) */}
            {issue.status === 'reopened' && (
              <div className="p-5 bg-red-50 border border-red-300 rounded-xl space-y-2 text-red-900">
                <div className="flex items-center gap-2 font-black text-sm text-red-700">
                  <RotateCcw className="w-5 h-5 text-red-600" />
                  <span>REOPENED BY STUDENTS</span>
                </div>
                <p className="text-xs">
                  Students reported that the issue is still not fixed. It has been returned to the operational priority queue for staff re-inspection.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* 3. RIGHT SIDE SUPPORTING PANEL (Desktop Layout) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card A: Issue Summary */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider border-b border-[#e2e8f0] pb-3">
              Issue Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Priority Rating:</span>
                <PriorityBadge priority={issue.priority} size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Current Status:</span>
                <StatusBadge status={issue.status} size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Affected Students:</span>
                <span className="font-extrabold text-[#14532d] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {issue.affected_count}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Category:</span>
                <span className="font-bold text-[#0f172a]">{issue.category}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Location:</span>
                <span className="font-bold text-[#0f172a]">{issue.location}</span>
              </div>
            </div>
          </div>

          {/* Card B: Community Impact */}
          <div className="bg-gradient-to-b from-[#ecfdf5] to-white border border-emerald-200 rounded-2xl p-5 shadow-2xs space-y-2 text-center">
            <Users className="w-6 h-6 text-[#14532d] mx-auto" />
            <h4 className="text-sm font-extrabold text-[#0f172a]">Community Impact</h4>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              <strong>{issue.affected_count} students</strong> have confirmed they are facing this problem. Higher count increases priority on the maintenance dashboard.
            </p>
          </div>

          {/* Card C: Assigned Team */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-2xs space-y-2">
            <h4 className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Assigned Team</h4>
            <div className="flex items-center gap-2 pt-1">
              <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-[#0f172a]">{issue.assignee_name || 'IT Network Team'}</p>
                <p className="text-[10px] text-[#64748b]">Estate Facilities Unit</p>
              </div>
            </div>
          </div>

          {/* Card D: Need Help */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
              <HelpCircle className="w-4 h-4 text-[#16a34a]" />
              <span>Have a question?</span>
            </div>
            <p className="text-[11px] text-[#64748b]">
              Contact campus hostel warden or facilities desk if emergency safety issues arise.
            </p>
          </div>

        </div>

      </div>

      {/* 4. REOPEN CONFIRMATION MODAL (Blueprint Section 17) */}
      <Modal
        isOpen={showReopenModal}
        onClose={() => setShowReopenModal(false)}
        title="Reopen this issue?"
      >
        <div className="space-y-4 text-xs">
          <p className="text-[#0f172a] leading-relaxed">
            Your feedback will reopen the issue and notify campus management that the problem still exists in <strong>{issue.location}</strong>.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-semibold">
            Status will change to <strong>REOPENED</strong> and return to the top priority queue.
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowReopenModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmReopen}>
              Yes, Reopen Issue
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}
