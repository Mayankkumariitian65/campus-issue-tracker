import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Edit3,
  Sparkles,
  Building2,
  Home,
  Upload,
  AlertTriangle,
  Info,
  HelpCircle,
  X,
  Plus,
  ArrowRight,
  FileText,
  Loader2,
  CheckCircle2
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { issueService } from '../../services/issueService'
import { aiService, type AISuggestionResult } from '../../services/aiService'
import { Input } from '../../components/common/Input'
import { Textarea } from '../../components/common/Textarea'
import { Select } from '../../components/common/Select'
import { Button } from '../../components/common/Button'
import { Modal } from '../../components/common/Modal'
import { useToast as useToastHook } from '../../components/common/Toast'
import type { AreaType, Severity } from '../../lib/supabase'

export const ReportIssuePage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showSuccess, showError } = useToastHook()

  // Form State
  const [areaType, setAreaType] = useState<AreaType>('campus')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Other')
  const [location, setLocation] = useState('')
  const [severity, setSeverity] = useState<Severity>('medium')
  const [affectedArea, setAffectedArea] = useState('')
  const [confirmedAccurate, setConfirmedAccurate] = useState(false)

  const [photos, setPhotos] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // AI State
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestionResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showCategoryGuideModal, setShowCategoryGuideModal] = useState(false)
  const [showDuplicateModal, setShowDuplicateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Run AI Analysis when title/description change
  useEffect(() => {
    let isMounted = true
    if (title.length > 3 || description.length > 10) {
      setIsAnalyzing(true)
      const timer = setTimeout(async () => {
        const result = await aiService.analyzeIssue(title, description, areaType)
        if (isMounted) {
          setAiSuggestion(result)
          setIsAnalyzing(false)
        }
      }, 300)
      return () => {
        isMounted = false
        clearTimeout(timer)
      }
    }
  }, [title, description, areaType])

  const applyAiSuggestions = () => {
    if (aiSuggestion) {
      setCategory(aiSuggestion.suggestedCategory)
      setSeverity(aiSuggestion.suggestedSeverity)
      showSuccess('AI Suggestions Applied!', 'Category and severity updated.')
    }
  }

  const handleAddPhoto = () => {
    if (photos.length >= 5) {
      showError('Limit Reached', 'Maximum 5 photos allowed per report.')
      return
    }
    fileInputRef.current?.click()
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showError('Unsupported File', 'Choose an image file to attach.')
      return
    }
    if (file.size > 500 * 1024) {
      showError('Image Too Large', 'Each photo must be smaller than 500 KB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotos(current => [...current, reader.result as string])
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const submitIssue = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const newIssue = issueService.createIssue({
        title,
        description,
        area_type: areaType,
        category,
        location: affectedArea.trim() ? `${location} - ${affectedArea.trim()}` : location,
        severity,
        created_by: user?.id || 'usr-student-1',
        creator_name: user?.name || 'Aarav Sharma',
        image_url: photos[0],
        image_urls: photos,
      })
      setIsSubmitting(false)
      showSuccess('Issue Reported Successfully!', 'Your report has been logged and added to CampusFix.')
      navigate(`/student/issues/${newIssue.id}`)
    }, 450)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      showError('Missing Information', 'Please provide an issue title and description.')
      return
    }

    if (!location) {
      showError('Location Required', 'Please select where this issue is happening.')
      return
    }

    if (!confirmedAccurate) {
      showError('Confirmation Required', 'Please confirm that the information provided is accurate.')
      return
    }

    if (aiSuggestion?.similarIssue) {
      setShowDuplicateModal(true)
      return
    }

    submitIssue()
  }

  // Location dropdown options based on context
  const campusLocations = [
    { value: 'Academic Block 1', label: 'Academic Block 1' },
    { value: 'Central Library 1st Floor', label: 'Central Library 1st Floor' },
    { value: 'Science Pathway North', label: 'Science Pathway North' },
    { value: 'Main Gate Corridor', label: 'Main Gate Corridor' },
    { value: 'Student Canteen', label: 'Student Canteen' },
  ]

  const hostelLocations = [
    { value: 'Hostel Block A, 3rd Floor', label: 'Hostel Block A, 3rd Floor' },
    { value: 'Hostel Block B, Ground Floor', label: 'Hostel Block B, Ground Floor' },
    { value: 'Hostel Block C, Mess', label: 'Hostel Block C, Mess' },
    { value: 'Girls Hostel 1, Common Room', label: 'Girls Hostel 1, Common Room' },
  ]

  const locationOptions = [
    { value: '', label: 'Select a location' },
    ...(areaType === 'campus' ? campusLocations : hostelLocations),
  ]

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      
      {/* 1. MAIN TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / MAIN FORM COLUMN (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-2xs flex items-start gap-4">
            <div className="p-3 bg-[#ecfdf5] border border-emerald-200 text-[#14532d] rounded-2xl shrink-0">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">
                Report a Campus Issue
              </h1>
              <p className="text-xs text-[#64748b] mt-1">
                Help make your campus better. Report a new issue or raise your concern.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Context Selector Toggle: Campus vs Hostel (Reference Image match) */}
            <div className="inline-flex p-1 bg-slate-100 border border-[#e2e8f0] rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setAreaType('campus')
                  setLocation('Academic Block 1')
                }}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                  areaType === 'campus'
                    ? 'bg-[#14532d] text-white shadow-2xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Campus</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAreaType('hostel')
                  setLocation('Hostel Block A, 3rd Floor')
                }}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                  areaType === 'hostel'
                    ? 'bg-[#14532d] text-white shadow-2xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Hostel</span>
              </button>
            </div>

            {/* Issue Title with Character Counter */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-extrabold text-[#0f172a]">Issue Title *</label>
                <span className="text-[#64748b]">{title.length}/100</span>
              </div>
              <Input
                value={title}
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a short and clear title (e.g. Wi-Fi not working)"
                required
              />
            </div>

            {/* Description with Character Counter */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-extrabold text-[#0f172a]">Description *</label>
                <span className="text-[#64748b]">{description.length}/500</span>
              </div>
              <Textarea
                rows={4}
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail (what happened, since when, affected area, etc.)"
                required
              />
            </div>

            {/* Category & Location Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Category *"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: 'Wi-Fi & Internet', label: 'Wi-Fi & Internet' },
                  { value: 'Plumbing', label: 'Plumbing & Water' },
                  { value: 'Electrical & Lighting', label: 'Electrical & Lighting' },
                  { value: 'HVAC / AC', label: 'HVAC / AC' },
                  { value: 'Classroom & Labs', label: 'Classroom & Labs' },
                  { value: 'Hostel Facilities', label: 'Hostel Facilities' },
                  { value: 'General Maintenance', label: 'General Maintenance' },
                  { value: 'Other', label: 'Other' },
                ]}
              />

              <Select
                label="Location *"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={locationOptions}
                required
              />
            </div>

            {/* Severity Options (4 Clickable Visual Cards) */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-[#0f172a]">Severity *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'low', label: 'Low', desc: 'Minor issue, less impact', color: 'bg-emerald-500' },
                  { key: 'medium', label: 'Medium', desc: 'Moderate impact', color: 'bg-amber-500' },
                  { key: 'high', label: 'High', desc: 'Major impact, needs attention', color: 'bg-red-500' },
                  { key: 'critical', label: 'Critical', desc: 'Urgent, affects many students', color: 'bg-purple-600' },
                ].map((s) => {
                  const isSelected = severity === s.key
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSeverity(s.key as Severity)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-red-50/50 border-red-500 ring-2 ring-red-400'
                          : 'bg-white border-[#e2e8f0] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                        <span className="text-xs font-extrabold text-[#0f172a]">{s.label}</span>
                      </div>
                      <p className="text-[10px] text-[#64748b] leading-tight">{s.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upload Photos Section */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-[#0f172a]">Upload Photos (Optional)</label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="sm:col-span-2 border-2 border-dashed border-[#e2e8f0] rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100/60 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[90px]"
                >
                  <Upload className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-xs font-bold text-[#0f172a]">Choose an image to attach</span>
                  <span className="text-[10px] text-[#64748b]">JPG, PNG, or WebP, up to 500 KB each</span>
                </button>

                {/* Previews */}
                {photos.map((src, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-[#e2e8f0] group">
                    <img src={src} alt="Evidence photo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      aria-label={`Remove evidence photo ${i + 1}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Add More Control */}
                {photos.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="border border-dashed border-[#e2e8f0] rounded-xl flex flex-col items-center justify-center p-3 text-slate-400 hover:text-[#14532d] hover:border-emerald-300 transition-colors cursor-pointer bg-slate-50 min-h-[90px]"
                  >
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-[11px] font-bold">Add More</span>
                  </button>
                )}
              </div>
            </div>

            {/* Affected Area (Optional) */}
            <Input
              label="Affected Area (Optional)"
              value={affectedArea}
              onChange={(e) => setAffectedArea(e.target.value)}
              placeholder="e.g. 2nd Floor, Room 204, Canteen, Main Gate, etc."
            />

            {/* Confirmation Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-[#0f172a] cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedAccurate}
                  onChange={(e) => setConfirmedAccurate(e.target.checked)}
                  className="rounded text-[#14532d] focus:ring-[#14532d]"
                  required
                />
                <span className="font-semibold">
                  I confirm that this information is accurate to the best of my knowledge.
                </span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting} icon={<ArrowRight className="w-4 h-4" />} className="font-extrabold px-6">
                Submit Issue →
              </Button>
            </div>

          </form>

        </div>

        {/* RIGHT COLUMN: AI SUGGESTIONS & HELP PANELS (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI SUGGESTIONS PANEL (Blueprint Section 14) */}
          <div className="bg-[#ecfdf5] border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-[#14532d]">
              <Sparkles className="w-5 h-5 text-[#16a34a]" />
              <h3 className="text-base font-black">AI Suggestions</h3>
            </div>
            <p className="text-xs text-[#64748b]">Text-based category and severity suggestions. Review before applying.</p>

            {isAnalyzing ? (
              <div className="py-4 text-center text-xs font-semibold text-[#14532d] flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing your issue...</span>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                
                {/* Suggested Category */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#64748b]">Suggested Category</span>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Text suggestion
                    </span>
                  </div>
                  <p className="text-sm font-extrabold text-[#0f172a]">
                    {aiSuggestion?.suggestedCategory || 'Enter a title and description'}
                  </p>
                </div>

                {/* Suggested Severity */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#64748b]">Suggested Severity</span>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Text suggestion
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <p className="text-sm font-extrabold text-[#0f172a] uppercase">
                      {aiSuggestion?.suggestedSeverity || 'Enter a title and description'}
                    </p>
                  </div>
                </div>

                {/* Similar Existing Issue Discovery Card (Blueprint Section 21) */}
                {aiSuggestion?.similarIssue && (
                  <div className="bg-white p-3.5 rounded-xl border border-amber-300 space-y-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-amber-800 font-extrabold text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Similar Existing Issue Detected</span>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#0f172a]">{aiSuggestion.similarIssue.title}</p>
                      <p className="text-[11px] text-[#64748b]">
                        {aiSuggestion.similarIssue.location} · {aiSuggestion.similarIssue.affected_count} students affected
                      </p>
                    </div>
                    <Link
                      to={`/student/issues/${aiSuggestion.similarIssue.id}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#14532d] hover:text-[#16a34a]"
                    >
                      View Issue & Confirm Instead →
                    </Link>
                  </div>
                )}

                {/* Review Disclaimer Notice */}
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-[11px] text-[#64748b] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#14532d] shrink-0 mt-0.5" />
                  <span>These are suggestions only. You can review and change them before submitting.</span>
                </div>

                <Button variant="accent" fullWidth onClick={applyAiSuggestions} size="sm" className="font-bold">
                  Apply AI Suggestions
                </Button>

              </div>
            )}
          </div>

          {/* TIPS FOR A GOOD REPORT PANEL */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-[#0f172a] font-extrabold text-sm">
              <FileText className="w-4 h-4 text-[#14532d]" />
              <span>Tips for a Good Report</span>
            </div>
            <ul className="space-y-2 text-xs text-[#64748b]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" /> Use a clear and specific title</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" /> Add detailed description</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" /> Include photos if possible</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" /> Mention exact location</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" /> Select the correct category and severity</li>
            </ul>
          </div>

          {/* NEED HELP PANEL */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-[#0f172a] font-extrabold text-sm">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>Need Help?</span>
            </div>
            <p className="text-xs text-[#64748b]">
              Not sure which category to choose? Check our category guide or contact support.
            </p>
            <Button
              variant="secondary"
              fullWidth
              size="sm"
              onClick={() => setShowCategoryGuideModal(true)}
              className="font-bold"
            >
              View Category Guide →
            </Button>
          </div>

        </div>

      </div>

      {/* Category Guide Modal */}
      <Modal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        title="Check for an existing issue"
      >
        {aiSuggestion?.similarIssue && (
          <div className="space-y-4 text-sm">
            <p className="text-[#64748b]">A similar active report may already cover this problem:</p>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
              <p className="font-bold text-[#0f172a]">{aiSuggestion.similarIssue.title}</p>
              <p className="text-xs text-[#64748b]">
                {aiSuggestion.similarIssue.location} · {aiSuggestion.similarIssue.affected_count} students affected
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowDuplicateModal(false)}>
                Keep Editing
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(`/student/issues/${aiSuggestion.similarIssue?.id}`)}
              >
                View Existing Issue
              </Button>
              <Button
                variant="secondary"
                isLoading={isSubmitting}
                onClick={() => {
                  setShowDuplicateModal(false)
                  submitIssue()
                }}
              >
                Submit Separate Report
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showCategoryGuideModal}
        onClose={() => setShowCategoryGuideModal(false)}
        title="CampusFix Category Guide"
      >
        <div className="space-y-3 text-xs text-[#0f172a]">
          <div className="p-3 bg-slate-50 rounded-lg">
            <strong className="block text-[#14532d]">Wi-Fi & Internet:</strong> Access point outages, router drops, portal connectivity.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <strong className="block text-[#14532d]">Plumbing & Water:</strong> Leaking purifiers, low pressure, tap damage, flush problems.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <strong className="block text-[#14532d]">Electrical & Lighting:</strong> Broken streetlights, socket sparks, corridor lighting.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <strong className="block text-[#14532d]">HVAC / AC:</strong> Reading room AC units, lab fans, temperature control.
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="primary" onClick={() => setShowCategoryGuideModal(false)}>
              Got It
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}
