import React from 'react'
import { Check, Users, Loader2 } from 'lucide-react'
import { useToast } from '../common/Toast'

export interface ConfirmationButtonProps {
  hasConfirmed: boolean
  affectedCount: number
  onConfirm: () => void
  isLoading?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  hasConfirmed,
  affectedCount,
  onConfirm,
  isLoading = false,
  disabled = false,
  size = 'md',
}) => {
  const { showSuccess } = useToast()

  if (hasConfirmed) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ecfdf5] border border-emerald-300 text-[#14532d] text-xs sm:text-sm font-semibold shadow-2xs">
        <Check className="w-4 h-4 text-[#16a34a] stroke-[2.5]" />
        <span>You're affected by this issue</span>
        <span className="ml-1 bg-white text-[#14532d] px-2 py-0.5 rounded-md text-xs font-bold border border-emerald-200">
          {affectedCount}
        </span>
      </div>
    )
  }

  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onConfirm()
        showSuccess('Confirmation Recorded!', 'Your support was added to the affected student count.')
      }}
      disabled={disabled || isLoading}
      className={`inline-flex items-center gap-2 rounded-lg font-bold transition-all duration-200 cursor-pointer shadow-xs bg-[#16a34a] hover:bg-[#15803d] active:bg-[#16a34a] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Users className="w-4 h-4" />
      )}
      <span>I'm facing this too</span>
      <span className="bg-white/20 text-white px-2 py-0.5 rounded-md text-xs font-extrabold">
        {affectedCount}
      </span>
    </button>
  )
}
