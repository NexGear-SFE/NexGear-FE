import type { ReactNode } from 'react'

type WarehouseFilterBarProps = { children: ReactNode }

export function WarehouseFilterBar({ children }: WarehouseFilterBarProps) {
  return <div className="flex flex-col gap-3 rounded-md border border-surface-400 bg-white p-3 md:flex-row md:items-center" aria-label="Bộ lọc dữ liệu">{children}</div>
}
