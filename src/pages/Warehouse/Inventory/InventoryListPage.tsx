import { Boxes, CircleAlert, CircleCheck, Eye, PackageX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getInventory } from '@/apis/inventory.api'
import { DataState } from '@/components/warehouse/DataState'
import { DataTableSkeleton } from '@/components/warehouse/DataTableSkeleton'
import { SearchField } from '@/components/warehouse/SearchField'
import { StockStatusBadge } from '@/components/warehouse/StockStatusBadge'
import { WarehouseFilterBar } from '@/components/warehouse/WarehouseFilterBar'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { WarehousePagination } from '@/components/warehouse/WarehousePagination'
import { WarehouseStatCard } from '@/components/warehouse/WarehouseStatCard'
import { warehouseInventoryDetailPath } from '@/constants/routes'
import { useWarehouseStore } from '@/stores/warehouseStore'
import { buildCategoryBreadcrumb, buildCategoryTree, flattenCategoryTree } from '@/utils/buildCategoryTree'
import { buildInventoryRows, filterInventoryRows } from '@/utils/inventory'

const PAGE_SIZE = 8

export function InventoryListPage() {
  const { products, variants, inventory, serials, categories } = useWarehouseStore()
  const [params, setParams] = useSearchParams()
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const query = params.get('q') ?? ''
  const categoryId = params.get('category') ?? ''
  const status = params.get('status') ?? ''
  const page = Math.max(1, Number(params.get('page') ?? 1))
  const allRows = useMemo(() => buildInventoryRows(products, variants, inventory, serials, categories), [categories, inventory, products, serials, variants])
  const rows = useMemo(() => filterInventoryRows(allRows, query, categoryId, status), [allRows, categoryId, query, status])
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const categoryOptions = flattenCategoryTree(buildCategoryTree(categories))
  const stats = {
    total: allRows.length,
    inStock: allRows.filter((row) => row.status === 'IN_STOCK').length,
    lowStock: allRows.filter((row) => row.status === 'LOW_STOCK').length,
    outOfStock: allRows.filter((row) => row.status === 'OUT_OF_STOCK').length,
  }

  const refresh = () => {
    setLoadState('loading')
    void getInventory().then(() => setLoadState('ready')).catch(() => setLoadState('error'))
  }
  useEffect(() => { void getInventory().then(() => setLoadState('ready')).catch(() => setLoadState('error')) }, [])
  const updateParam = (key: string, value: string) => setParams((current) => {
    const next = new URLSearchParams(current)
    if (value) next.set(key, value); else next.delete(key)
    if (key !== 'page') next.delete('page')
    return next
  })

  return <div className="space-y-6">
    <WarehousePageHeader eyebrow="Inventory control" title="Tồn kho theo SKU" description="Theo dõi tồn thực tế, lượng đã giữ và serial của từng biến thể. Số lượng chỉ thay đổi qua nghiệp vụ nhập hoặc xuất kho." />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <WarehouseStatCard icon={Boxes} label="Tổng SKU" value={stats.total} helper="Tất cả biến thể" />
      <WarehouseStatCard icon={CircleCheck} label="Còn hàng" value={stats.inStock} helper="Trên mức cảnh báo" />
      <WarehouseStatCard icon={CircleAlert} label="Sắp hết" value={stats.lowStock} helper="Cần nhập bổ sung" />
      <WarehouseStatCard icon={PackageX} label="Hết hàng" value={stats.outOfStock} helper="Available bằng 0" />
    </div>
    <WarehouseFilterBar>
      <SearchField label="Tìm tồn kho" value={query} onChange={(value) => updateParam('q', value)} placeholder="Tên sản phẩm hoặc SKU…" />
      <select aria-label="Lọc danh mục" value={categoryId} onChange={(event) => updateParam('category', event.target.value)} className="input-gaming md:w-64"><option value="">Mọi danh mục</option>{categoryOptions.map((option) => <option key={option.id} value={option.id}>{option.breadcrumb}</option>)}</select>
      <select aria-label="Lọc trạng thái tồn kho" value={status} onChange={(event) => updateParam('status', event.target.value)} className="input-gaming md:w-48"><option value="">Mọi trạng thái</option><option value="IN_STOCK">Còn hàng</option><option value="LOW_STOCK">Sắp hết</option><option value="OUT_OF_STOCK">Hết hàng</option></select>
    </WarehouseFilterBar>
    {loadState === 'loading' && <DataTableSkeleton columns={10} rows={6} />}
    {loadState === 'error' && <DataState type="error" title="Không tải được tồn kho" description="Dữ liệu tồn kho đang gián đoạn. Hãy thử tải lại." onRetry={refresh} />}
    {loadState === 'ready' && allRows.length === 0 && <DataState type="empty" title="Chưa có dữ liệu tồn kho" description="Tạo sản phẩm và SKU để bắt đầu theo dõi tồn kho." />}
    {loadState === 'ready' && allRows.length > 0 && rows.length === 0 && <DataState type="empty" title="Không có kết quả" description="Thử thay đổi từ khóa hoặc bộ lọc hiện tại." />}
    {loadState === 'ready' && pageRows.length > 0 && <div className="overflow-hidden rounded-md border border-surface-400 bg-white">
      <div className="overflow-x-auto"><table className="w-full min-w-[1380px] text-left text-sm">
        <thead className="bg-surface-200 text-[11px] uppercase tracking-wider text-text-600"><tr><th className="p-4">Sản phẩm</th><th className="p-4">Brand</th><th className="p-4">SKU / biến thể</th><th className="p-4">Danh mục</th><th className="p-4">On hand</th><th className="p-4">Reserved</th><th className="p-4">Available</th><th className="p-4">Serial</th><th className="p-4">Trạng thái</th><th className="p-4 text-right">Chi tiết</th></tr></thead>
        <tbody className="divide-y divide-surface-400">{pageRows.map((row) => <tr key={row.variant.id} className="hover:bg-surface-200/60">
          <td className="p-4"><div className="flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-warehouse-950 text-xs font-bold text-white">{row.product.brandCode}</span><Link className="font-semibold hover:text-brand-500" to={warehouseInventoryDetailPath(row.product.id)}>{row.product.name}</Link></div></td>
          <td className="p-4">{row.product.brand}</td><td className="p-4"><p className="font-mono font-semibold">{row.variant.sku}</p><p className="mt-1 text-xs text-text-600">{row.variant.optionValues.map((option) => `${option.option}: ${option.value}`).join(' · ') || 'Mặc định'}</p></td>
          <td className="p-4 text-xs">{buildCategoryBreadcrumb(categories, row.product.categoryId)}</td><td className="p-4 font-semibold">{row.stock.onHand}</td><td className="p-4">{row.stock.reserved}</td><td className="p-4 font-semibold">{row.available}</td><td className="p-4">{row.variant.serialTracking ? <Link className="font-semibold text-brand-500 hover:underline" to={`${warehouseInventoryDetailPath(row.product.id)}?sku=${encodeURIComponent(row.variant.id)}#serials`}>{row.serialCount}</Link> : '—'}</td><td className="p-4"><StockStatusBadge status={row.status} /></td>
          <td className="p-4 text-right"><Link aria-label={`Xem tồn kho ${row.variant.sku}`} className="btn-outlined px-3" to={warehouseInventoryDetailPath(row.product.id)}><Eye className="h-4 w-4" /></Link></td>
        </tr>)}</tbody>
      </table></div><WarehousePagination currentPage={page} pageSize={PAGE_SIZE} totalItems={rows.length} onPageChange={(nextPage) => updateParam('page', String(nextPage))} />
    </div>}
  </div>
}
