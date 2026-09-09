import type { ReactNode } from 'react'

type WarehouseFilterBarProps = { children: ReactNode }

export function WarehouseFilterBar({ children }: WarehouseFilterBarProps) {
  return <details open className="rounded-md border border-surface-400 bg-white" aria-label="Bộ lọc dữ liệu"><summary className="min-h-11 cursor-pointer px-4 py-3 text-sm font-semibold md:hidden">Tìm kiếm và bộ lọc</summary><div className="flex flex-col gap-3 border-t border-surface-400 p-3 md:flex-row md:items-center md:border-t-0">{children}</div></details>
}
