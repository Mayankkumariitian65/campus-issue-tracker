import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from './Button'

export interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <AlertCircle className="w-12 h-12 text-[#64748b]" />,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-[#e2e8f0]">
      <div className="p-3 bg-slate-50 rounded-full mb-3">{icon}</div>
      <h3 className="text-base font-bold text-[#0f172a] mb-1">{title}</h3>
      <p className="text-sm text-[#64748b] max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
