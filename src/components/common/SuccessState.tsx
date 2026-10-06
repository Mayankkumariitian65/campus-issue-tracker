import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from './Button'

export interface SuccessStateProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 text-center bg-emerald-50/60 rounded-xl border border-emerald-200">
      <div className="p-3 bg-emerald-100 text-[#16a34a] rounded-full mb-3">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-[#14532d] mb-1">{title}</h3>
      <p className="text-xs text-emerald-800 max-w-sm mb-4 leading-relaxed">{message}</p>
      {actionLabel && onAction && (
        <Button variant="accent" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
