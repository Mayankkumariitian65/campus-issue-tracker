import React from 'react'
import { Loader2, Check, AlertCircle } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent' | 'icon'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  isError = false,
  errorMessage,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer'

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-bold',
  }

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#14532d] hover:bg-[#166534] active:bg-[#14532d] text-white focus:ring-[#14532d] shadow-2xs hover:shadow-xs',
    accent:
      'bg-[#16a34a] hover:bg-[#15803d] active:bg-[#16a34a] text-white focus:ring-[#16a34a] shadow-2xs hover:shadow-xs',
    secondary:
      'bg-white border border-[#e2e8f0] text-[#0f172a] hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 focus:ring-slate-400 shadow-2xs',
    ghost:
      'bg-transparent text-[#64748b] hover:text-[#0f172a] hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-300',
    danger:
      'bg-[#dc2626] hover:bg-[#b91c1c] active:bg-[#dc2626] text-white focus:ring-[#dc2626] shadow-2xs hover:shadow-xs',
    icon:
      'p-2 text-[#64748b] hover:text-[#0f172a] hover:bg-slate-100 active:bg-slate-200 rounded-full focus:ring-slate-400',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  let content = (
    <span className="inline-flex items-center gap-2">
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )

  if (isLoading) {
    content = (
      <span className="inline-flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        <span>Loading...</span>
      </span>
    )
  } else if (isSuccess) {
    content = (
      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
        <Check className="w-4 h-4 text-[#16a34a] stroke-[2.5]" />
        <span>{children || 'Success!'}</span>
      </span>
    )
  } else if (isError) {
    content = (
      <span className="inline-flex items-center gap-1.5 font-semibold text-red-800 bg-red-100 px-2 py-0.5 rounded">
        <AlertCircle className="w-4 h-4 text-red-600" />
        <span>{errorMessage || children || 'Failed'}</span>
      </span>
    )
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {content}
    </button>
  )
}
