import { Plus } from 'lucide-react'
import type { WarrantyProvider } from '@/types/admin/staff.type'
import { WarrantyProviderRow } from './WarrantyProviderRow'

interface WarrantyProviderTableProps {
  totalProvidersCount: number
  filteredProviders: WarrantyProvider[]
  onOpenAdd: () => void
  onView: (provider: WarrantyProvider) => void
  onEdit: (provider: WarrantyProvider) => void
  onDisable: (provider: WarrantyProvider) => void
  onEnable: (id: string) => void
}

export function WarrantyProviderTable({
  totalProvidersCount,
  filteredProviders,
  onOpenAdd,
  onView,
  onEdit,
  onDisable,
  onEnable,
}: WarrantyProviderTableProps) {
  if (totalProvidersCount === 0) {
    return (
      <div className="text-center py-[60px] px-6 bg-white rounded-xl border border-black/5">
        <div className="text-[36px] mb-4">📭</div>
        <div className="text-[var(--text-600)] text-[15px] font-semibold font-heading">
          Chưa có nhà cung cấp nào.
        </div>
        <div className="text-[var(--text-400)] text-[13px] mt-1.5 mb-5 font-body">
          Thêm nhà cung cấp để hiển thị trên trang Kiểm tra Serial.
        </div>
        <button
          type="button"
          className="h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body cursor-pointer hover:bg-[var(--brand-600)] transition-colors inline-flex items-center gap-1.5"
          onClick={onOpenAdd}
        >
          <Plus size={16} /> Thêm nhà cung cấp
        </button>
      </div>
    )
  }

  if (filteredProviders.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white rounded-xl border border-black/5">
        <div className="text-[28px] mb-3">🔍</div>
        <div className="text-[var(--text-600)] text-[14px] font-body">
          Không tìm thấy kết quả phù hợp.
        </div>
      </div>
    )
  }

  const tableHeaders = ['', 'Nhà sản xuất', 'URL tra cứu', 'Trạng thái', 'Thao tác']

  return (
    <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[40px_1fr_1fr_100px_130px] gap-0 px-4 py-2.5 bg-black/5 border-b border-[var(--surface-400)]">
        {tableHeaders.map((h) => (
          <div
            key={h}
            className="text-[10px] font-bold text-[var(--text-400)] uppercase tracking-[0.08em] font-body"
          >
            {h}
          </div>
        ))}
      </div>
      {/* Table rows */}
      {filteredProviders.map((p, i) => (
        <WarrantyProviderRow
          key={p.id}
          provider={p}
          isLast={i === filteredProviders.length - 1}
          onView={() => onView(p)}
          onEdit={() => onEdit(p)}
          onDisable={() => onDisable(p)}
          onEnable={() => onEnable(p.id)}
        />
      ))}
    </div>
  )
}
