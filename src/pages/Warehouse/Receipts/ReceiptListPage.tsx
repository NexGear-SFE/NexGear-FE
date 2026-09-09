import { FilePlus2, Pencil, ReceiptText } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getReceipts } from '@/apis/receipt.api'
import { DataState } from '@/components/warehouse/DataState'
import { DataTableSkeleton } from '@/components/warehouse/DataTableSkeleton'
import { SearchField } from '@/components/warehouse/SearchField'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehouseFilterBar } from '@/components/warehouse/WarehouseFilterBar'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { WarehousePagination } from '@/components/warehouse/WarehousePagination'
import { ROUTES, warehouseReceiptDetailPath, warehouseReceiptEditPath } from '@/constants/routes'
import { useWarehouseStore } from '@/stores/warehouseStore'
import { formatCurrency, formatDate, formatDateOnly } from '@/utils/formatters'
import { calculateReceiptTotal } from '@/utils/receipt'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

const PAGE_SIZE = 8
export function ReceiptListPage() {
  const receipts = useWarehouseStore((state) => state.receipts)
  const [params, setParams] = useSearchParams()
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const query = params.get('q') ?? ''
  const debouncedQuery = useDebouncedValue(query)
  const tab = params.get('status') ?? 'ALL'
  const page = Math.max(1, Number(params.get('page') ?? 1))
  const rows = useMemo(() => receipts.filter((receipt) => {
    const searchText = `${receipt.id} ${receipt.supplier} ${receipt.invoiceCode}`.toLocaleLowerCase('vi')
    return searchText.includes(debouncedQuery.trim().toLocaleLowerCase('vi')) && (tab === 'ALL' || receipt.status === tab)
  }).sort((first, second) => second.updatedAt.localeCompare(first.updatedAt)), [debouncedQuery, receipts, tab])
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const updateParam = (key: string, value: string) => setParams((current) => { const next = new URLSearchParams(current); if (value && value !== 'ALL') next.set(key, value); else next.delete(key); if (key !== 'page') next.delete('page'); return next })
  const refresh = () => { setLoadState('loading'); void getReceipts().then(() => setLoadState('ready')).catch(() => setLoadState('error')) }
  useEffect(() => { void getReceipts().then(() => setLoadState('ready')).catch(() => setLoadState('error')) }, [])

  return <div className="space-y-6"><WarehousePageHeader eyebrow="Inbound operations" title="Phiếu nhập kho" description="Tạo bản nháp, kiểm tra SKU và xác nhận lô hàng trước khi tăng tồn kho." actions={<Link to={ROUTES.warehouseNewReceipt} className="btn-primary"><FilePlus2 className="h-4 w-4" /> Tạo phiếu nhập</Link>} />
    <div className="flex gap-2 overflow-x-auto" role="tablist">{(['ALL', 'DRAFT', 'CONFIRMED'] as const).map((status) => <button key={status} role="tab" aria-selected={tab === status} type="button" onClick={() => updateParam('status', status)} className={tab === status ? 'btn-primary whitespace-nowrap' : 'btn-outlined whitespace-nowrap'}>{status === 'ALL' ? 'Tất cả' : status === 'DRAFT' ? 'Bản nháp' : 'Đã xác nhận'} ({status === 'ALL' ? receipts.length : receipts.filter((item) => item.status === status).length})</button>)}</div>
    <WarehouseFilterBar><SearchField label="Tìm phiếu nhập" value={query} onChange={(value) => updateParam('q', value)} placeholder="Mã phiếu, nhà cung cấp, hóa đơn…" /></WarehouseFilterBar>
    {loadState === 'loading' && <DataTableSkeleton columns={8} rows={5} />}{loadState === 'error' && <DataState type="error" title="Không tải được phiếu nhập" description="Dữ liệu phiếu nhập đang gián đoạn." onRetry={refresh} />}{loadState === 'ready' && rows.length === 0 && <DataState type="empty" title="Không có phiếu nhập" description="Thử đổi bộ lọc hoặc tạo phiếu nhập đầu tiên." />}
    {loadState === 'ready' && pageRows.length > 0 && <div className="overflow-hidden rounded-md border border-surface-400 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[1180px] text-left text-sm"><thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-4">Mã phiếu</th><th className="p-4">Nhà cung cấp</th><th className="p-4">Người tạo</th><th className="p-4">SKU</th><th className="p-4">Số lượng</th><th className="p-4">Tổng giá trị</th><th className="p-4">Trạng thái</th><th className="p-4 text-right">Thao tác</th></tr></thead><tbody className="divide-y divide-surface-400">{pageRows.map((receipt) => <tr key={receipt.id}><td className="p-4"><Link className="font-semibold text-brand-500 hover:underline" to={warehouseReceiptDetailPath(receipt.id)}>{receipt.id}</Link><p className="mt-1 text-xs text-text-600">{formatDateOnly(receipt.receiptDate)}</p></td><td className="p-4"><p className="font-semibold">{receipt.supplier || 'Chưa chọn'}</p><p className="mt-1 text-xs text-text-600">{receipt.invoiceCode || 'Chưa có chứng từ'}</p></td><td className="p-4">{receipt.creator}</td><td className="p-4 font-semibold">{receipt.lines.length}</td><td className="p-4 tabular-nums">{receipt.lines.reduce((sum, line) => sum + line.quantity, 0)}</td><td className="p-4 font-semibold tabular-nums">{formatCurrency(calculateReceiptTotal(receipt.lines))}</td><td className="p-4"><StatusBadge label={receipt.status === 'DRAFT' ? 'Bản nháp' : 'Đã xác nhận'} tone={receipt.status === 'DRAFT' ? 'warning' : 'success'} />{receipt.status === 'DRAFT' && <p className="mt-1 text-[11px] text-text-600">Cập nhật {formatDate(receipt.updatedAt)}</p>}</td><td className="p-4 text-right"><Link className={receipt.status === 'DRAFT' ? 'btn-primary' : 'btn-outlined'} to={receipt.status === 'DRAFT' ? warehouseReceiptEditPath(receipt.id) : warehouseReceiptDetailPath(receipt.id)}>{receipt.status === 'DRAFT' ? <Pencil className="h-4 w-4" /> : <ReceiptText className="h-4 w-4" />}{receipt.status === 'DRAFT' ? 'Tiếp tục nhập' : 'Xem chi tiết'}</Link></td></tr>)}</tbody></table></div><WarehousePagination currentPage={page} pageSize={PAGE_SIZE} totalItems={rows.length} onPageChange={(next) => updateParam('page', String(next))} /></div>}
  </div>
}
