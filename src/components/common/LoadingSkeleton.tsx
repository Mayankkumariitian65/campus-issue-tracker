import React from 'react'

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl p-5 animate-pulse space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/6"></div>
          </div>
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="pt-2 flex justify-between">
            <div className="h-8 bg-slate-200 rounded w-24"></div>
            <div className="h-8 bg-slate-200 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
