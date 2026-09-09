import type { ReactNode } from 'react'
type Props = { eyebrow?: string; title: string; description: string; actions?: ReactNode }
export function WarehousePageHeader({ eyebrow, title, description, actions }: Props) {
  return <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div>{eyebrow && <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-500">{eyebrow}</p>}<h1 className="text-h2">{title}</h1><p className="mt-2 max-w-2xl text-body-sm text-text-600">{description}</p></div>{actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}</div>
}
