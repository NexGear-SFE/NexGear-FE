import type { LucideIcon } from 'lucide-react'

type WarehouseStatCardProps = {
  icon: LucideIcon
  label: string
  value: string | number
  helper?: string
}

export function WarehouseStatCard({ icon: Icon, label, value, helper }: WarehouseStatCardProps) {
  return <article className="rounded-md border border-surface-400 bg-white p-5 shadow-clay-sm">
    <div className="flex items-start justify-between gap-3">
      <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-600">{label}</p><p className="mt-3 font-heading text-2xl font-bold">{value}</p>{helper && <p className="mt-1 text-xs text-text-600">{helper}</p>}</div>
      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-error-50 text-brand-500"><Icon className="h-5 w-5" /></span>
    </div>
  </article>
}
