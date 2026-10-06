import React, { forwardRef } from 'react'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: boolean
  successMessage?: string
  isLoading?: boolean
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  success,
  successMessage,
  isLoading,
  helperText,
  className = '',
  id,
  rows = 4,
  disabled,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-[#0f172a] flex items-center justify-between">
          <span>{label}</span>
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#14532d]" />}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled || isLoading}
          className={`w-full bg-white border border-[#e2e8f0] rounded-lg p-3 text-sm text-[#0f172a] placeholder-[#64748b] transition-all duration-150 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14532d] focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
            error ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : ''
          } ${
            success ? 'border-emerald-500 focus:ring-emerald-500 bg-emerald-50/20' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{error}</p>}
      {!error && success && successMessage && (
        <p className="text-xs text-emerald-700 font-medium flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />{successMessage}</p>
      )}
      {!error && !success && helperText && <p className="text-xs text-[#64748b]">{helperText}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'
