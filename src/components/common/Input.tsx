import React, { forwardRef } from 'react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  successMessage?: string
  isLoading?: boolean
  helperText?: string
  icon?: React.ReactNode
  endAction?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  success,
  successMessage,
  isLoading,
  helperText,
  icon,
  endAction,
  className = '',
  id,
  disabled,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[#0f172a] flex items-center justify-between">
          <span>{label}</span>
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#14532d]" />}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-[#64748b] pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled || isLoading}
          className={`w-full bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder-[#64748b] transition-all duration-150 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14532d] focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
            icon ? 'pl-9' : 'px-3'
          } ${error ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : ''} ${
            success ? 'border-emerald-500 focus:ring-emerald-500 bg-emerald-50/20' : ''
          } ${endAction || error || success ? 'pr-10' : 'pr-3'} py-2.5 ${className}`}
          {...props}
        />
        <div className="absolute right-3 flex items-center gap-1">
          {endAction}
          {!endAction && error && <AlertCircle className="w-4 h-4 text-red-500" />}
          {!endAction && !error && success && <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />}
        </div>
      </div>
      {error && <p className="text-xs text-red-600 font-medium flex items-center gap-1">{error}</p>}
      {!error && success && successMessage && (
        <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">{successMessage}</p>
      )}
      {!error && !success && helperText && <p className="text-xs text-[#64748b]">{helperText}</p>}
    </div>
  )
})

Input.displayName = 'Input'
