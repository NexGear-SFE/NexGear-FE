import { Search } from 'lucide-react'

export type WarrantyStatusFilter = 'all' | 'active' | 'inactive'

interface WarrantyFilterBarProps {
  search: string
  statusFilter: WarrantyStatusFilter
  onSearchChange: (value: string) => void
  onStatusFilterChange: (filter: WarrantyStatusFilter) => void
}

export function WarrantyFilterBar({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: WarrantyFilterBarProps) {
  const filters: { key: WarrantyStatusFilter; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'active', label: 'Đang hoạt động' },
    { key: 'inactive', label: 'Vô hiệu' },
  ]

  return (
    <div className="flex gap-2.5 mb-4 items-center">
      <div className="relative flex-1">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm nhà sản xuất..."
          className="w-full h-9 pl-8 pr-3 bg-white border border-[var(--surface-400)] rounded-md text-[13px] font-body outline-none transition-colors focus:border-[var(--brand-500)]"
        />
        <Search
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-400)]"
          size={14}
        />
      </div>
      {filters.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onStatusFilterChange(key)}
          className={`h-9 px-3.5 rounded-lg border text-[12px] font-semibold font-body cursor-pointer transition-all duration-100 ${
            statusFilter !== key
              ? 'border-[var(--surface-400)] bg-transparent text-[var(--text-600)] hover:bg-[var(--surface-200)]'
              : key === 'all'
              ? 'border-[var(--brand-500)] bg-[var(--brand-50)] text-[var(--brand-400)]'
              : key === 'active'
              ? 'border-green-500 bg-green-50 text-green-600'
              : 'border-red-500 bg-red-50 text-red-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
