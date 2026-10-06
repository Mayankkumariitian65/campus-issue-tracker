import React from 'react'

export interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: string
  trendType?: 'positive' | 'negative' | 'neutral'
  badgeColor?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendType = 'positive',
}) => {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">{title}</span>
        <div className="p-2.5 bg-[#ecfdf5] text-[#14532d] rounded-lg">{icon}</div>
      </div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">{value}</h2>
        {trend && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              trendType === 'positive'
                ? 'bg-emerald-100 text-emerald-800'
                : trendType === 'negative'
                ? 'bg-red-100 text-red-800'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-[#64748b] mt-1">{subtitle}</p>}
    </div>
  )
}
