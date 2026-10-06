import React, { forwardRef } from 'react'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
  success?: boolean
  isLoading?: boolean
  helperText?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  success,
  isLoading,
  helperText,
  className = '',
  id,
  disabled,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-[#0f172a] flex items-center justify-between">
          <span>{label}</span>
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#14532d]" />}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled || isLoading}
          className={`w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5 text-sm text-[#0f172a] transition-all duration-150 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#14532d] focus:border-transparent disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
            error ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : ''
          } ${
            success ? 'border-emerald-500 focus:ring-emerald-500 bg-emerald-50/20' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{error}</p>}
      {!error && helperText && <p className="text-xs text-[#64748b]">{helperText}</p>}
    </div>
  )
})

Select.displayName = 'Select'
