import { ChevronLeft, ChevronRight } from 'lucide-react'

type WarehousePaginationProps = {
  currentPage: number
  onPageChange: (page: number) => void
  pageSize: number
  totalItems: number
}

export function WarehousePagination({ currentPage, onPageChange, pageSize, totalItems }: WarehousePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(currentPage, 1), totalPages)
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1
  const end = Math.min(safePage * pageSize, totalItems)

  return <nav aria-label="Phân trang" className="flex flex-col gap-3 border-t border-surface-400 bg-white px-4 py-3 text-sm text-text-600 sm:flex-row sm:items-center sm:justify-between">
    <p>Hiển thị {start}–{end} trong {totalItems}</p>
    <div className="flex items-center gap-2">
      <button type="button" aria-label="Trang trước" disabled={safePage === 1} onClick={() => onPageChange(safePage - 1)} className="btn-outlined min-h-11 px-3 disabled:cursor-not-allowed disabled:opacity-50"><ChevronLeft className="h-4 w-4" /></button>
      <span aria-live="polite" className="min-w-20 text-center font-semibold text-text-900">{safePage} / {totalPages}</span>
      <button type="button" aria-label="Trang sau" disabled={safePage === totalPages} onClick={() => onPageChange(safePage + 1)} className="btn-outlined min-h-11 px-3 disabled:cursor-not-allowed disabled:opacity-50"><ChevronRight className="h-4 w-4" /></button>
    </div>
  </nav>
}
