import { Eye, PackagePlus, Pencil } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { getProducts } from '@/apis/product.api'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { DataState } from '@/components/warehouse/DataState'
import { DataTableSkeleton } from '@/components/warehouse/DataTableSkeleton'
import { SearchField } from '@/components/warehouse/SearchField'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehouseFilterBar } from '@/components/warehouse/WarehouseFilterBar'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { WarehousePagination } from '@/components/warehouse/WarehousePagination'
import { ROUTES, warehouseProductDetailPath, warehouseProductEditPath } from '@/constants/routes'
import { useWarehouseStore, warehouseSelectors } from '@/stores/warehouseStore'
import { buildCategoryBreadcrumb, buildCategoryTree, flattenCategoryTree } from '@/utils/buildCategoryTree'
import { formatDate as formatDateTime } from '@/utils/formatDate'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

const PAGE_SIZE = 8

export function ProductListPage() {
  const { products, variants, inventory, categories, toggleProductStatus } = useWarehouseStore(useShallow(warehouseSelectors.catalog))
  const [params, setParams] = useSearchParams()
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [pendingProductId, setPendingProductId] = useState<string | null>(null)
  const query = params.get('q') ?? ''
  const debouncedQuery = useDebouncedValue(query)
  const categoryId = params.get('category') ?? ''
  const brand = params.get('brand') ?? ''
  const status = params.get('status') ?? ''
  const stock = params.get('stock') ?? ''
  const serial = params.get('serial') ?? ''
  const sort = params.get('sort') ?? 'newest'
  const page = Math.max(1, Number(params.get('page') ?? 1))

  const refresh = () => {
    setLoadState('loading')
    getProducts().then(() => setLoadState('ready')).catch(() => setLoadState('error'))
  }
  useEffect(() => {
    void getProducts().then(() => setLoadState('ready')).catch(() => setLoadState('error'))
  }, [])

  const updateParam = (key: string, value: string) => setParams((current) => {
    const next = new URLSearchParams(current)
    if (value) next.set(key, value); else next.delete(key)
    if (key !== 'page') next.delete('page')
    return next
  })

  const rows = useMemo(() => products.map((product) => {
    const productVariants = variants.filter((variant) => variant.productId === product.id)
    const stocks = productVariants.map((variant) => inventory.find((item) => item.variantId === variant.id))
    const onHand = stocks.reduce((sum, item) => sum + (item?.onHand ?? 0), 0)
    const reserved = stocks.reduce((sum, item) => sum + (item?.reserved ?? 0), 0)
    const available = Math.max(0, onHand - reserved)
    return { product, productVariants, onHand, available }
  }).filter(({ product, productVariants, available }) => {
    const searchText = `${product.name} ${product.productCode} ${productVariants.map((variant) => variant.sku).join(' ')}`.toLocaleLowerCase('vi')
    const stockMatch = !stock || (stock === 'available' ? available > 0 : available === 0)
    const serialMatch = !serial || productVariants.some((variant) => variant.serialTracking) === (serial === 'yes')
    return searchText.includes(debouncedQuery.toLocaleLowerCase('vi')) && (!categoryId || product.categoryId === categoryId) && (!brand || product.brand === brand) && (!status || product.status === status) && stockMatch && serialMatch
  }).sort((first, second) => sort === 'name' ? first.product.name.localeCompare(second.product.name) : sort === 'stock' ? second.available - first.available : second.product.updatedAt.localeCompare(first.product.updatedAt)), [brand, categoryId, debouncedQuery, inventory, products, serial, sort, status, stock, variants])
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const categoryOptions = flattenCategoryTree(buildCategoryTree(categories))
  const brands = [...new Set(products.map((product) => product.brand))].sort()
  const pendingProduct = products.find((product) => product.id === pendingProductId)

  return <div className="space-y-6">
    <WarehousePageHeader eyebrow="Product master" title="Sản phẩm" description="Quản lý source-of-truth, danh mục, biến thể và SKU dùng chung cho toàn hệ thống." actions={<Link to={ROUTES.warehouseNewProduct} className="btn-primary"><PackagePlus className="h-4 w-4" /> Tạo sản phẩm</Link>} />
    <WarehouseFilterBar><SearchField label="Tìm sản phẩm" value={query} onChange={(value) => updateParam('q', value)} placeholder="Tên, product code hoặc SKU…" />
      <select aria-label="Lọc danh mục" value={categoryId} onChange={(event) => updateParam('category', event.target.value)} className="input-gaming md:w-60"><option value="">Mọi danh mục</option>{categoryOptions.map((option) => <option key={option.id} value={option.id}>{option.breadcrumb}</option>)}</select>
      <select aria-label="Lọc thương hiệu" value={brand} onChange={(event) => updateParam('brand', event.target.value)} className="input-gaming md:w-44"><option value="">Mọi brand</option>{brands.map((item) => <option key={item}>{item}</option>)}</select>
      <select aria-label="Lọc trạng thái" value={status} onChange={(event) => updateParam('status', event.target.value)} className="input-gaming md:w-44"><option value="">Mọi trạng thái</option><option value="ACTIVE">Active</option><option value="DRAFT">Draft</option><option value="INACTIVE">Inactive</option></select>
    </WarehouseFilterBar>
    <div className="flex flex-wrap gap-3"><select aria-label="Lọc tồn kho" value={stock} onChange={(event) => updateParam('stock', event.target.value)} className="input-gaming"><option value="">Mọi tồn kho</option><option value="available">Còn hàng</option><option value="empty">Hết hàng</option></select><select aria-label="Lọc serial" value={serial} onChange={(event) => updateParam('serial', event.target.value)} className="input-gaming"><option value="">Mọi tracking</option><option value="yes">Có serial</option><option value="no">Không serial</option></select><select aria-label="Sắp xếp" value={sort} onChange={(event) => updateParam('sort', event.target.value)} className="input-gaming"><option value="newest">Mới cập nhật</option><option value="name">Tên A–Z</option><option value="stock">Tồn nhiều nhất</option></select></div>
    {loadState === 'loading' && <DataTableSkeleton columns={9} rows={6} />}
    {loadState === 'error' && <DataState type="error" title="Không tải được sản phẩm" description="Mock service đang không phản hồi. Hãy thử tải lại." onRetry={refresh} />}
    {loadState === 'ready' && products.length === 0 && <DataState type="empty" title="Chưa có sản phẩm" description="Tạo product master đầu tiên để bắt đầu quản lý kho." />}
    {loadState === 'ready' && products.length > 0 && rows.length === 0 && <DataState type="empty" title="Không có kết quả" description="Thử thay đổi từ khóa hoặc bộ lọc hiện tại." />}
    {loadState === 'ready' && pageRows.length > 0 && <div className="overflow-hidden rounded-md border border-surface-400 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[1320px] text-left text-sm"><thead className="bg-surface-200 text-[11px] uppercase tracking-wider text-text-600"><tr><th className="p-4">Sản phẩm</th><th className="p-4">ID / Brand</th><th className="p-4">Danh mục</th><th className="p-4">SKU</th><th className="p-4">On hand</th><th className="p-4">Available</th><th className="p-4">Serial</th><th className="p-4">Trạng thái / cập nhật</th><th className="p-4 text-right">Thao tác</th></tr></thead><tbody className="divide-y divide-surface-400">{pageRows.map(({ product, productVariants, onHand, available }) => <tr key={product.id} className="hover:bg-surface-200/60"><td className="p-4"><div className="flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-warehouse-950 text-xs font-bold text-white">{product.brandCode}</span><Link className="font-semibold hover:text-brand-500" to={warehouseProductDetailPath(product.id)}>{product.name}</Link></div></td><td className="p-4"><strong>{product.productCode}</strong><p className="text-xs text-text-600">{product.brand}</p></td><td className="p-4 text-xs">{buildCategoryBreadcrumb(categories, product.categoryId)}</td><td className="p-4 font-semibold">{productVariants.length}</td><td className="p-4 font-semibold">{onHand}</td><td className="p-4 font-semibold">{available}</td><td className="p-4 text-xs">{productVariants.some((variant) => variant.serialTracking) ? 'Có tracking' : 'Không tracking'}</td><td className="p-4"><StatusBadge label={product.status} tone={product.status === 'ACTIVE' ? 'success' : product.status === 'DRAFT' ? 'warning' : 'neutral'} /><p className="mt-1 text-[11px] text-text-600">{formatDateTime(product.updatedAt)}</p></td><td className="p-4"><div className="flex justify-end gap-2"><Link aria-label={`Xem ${product.name}`} className="btn-outlined px-3" to={warehouseProductDetailPath(product.id)}><Eye className="h-4 w-4" /></Link><Link aria-label={`Sửa ${product.name}`} className="btn-outlined px-3" to={warehouseProductEditPath(product.id)}><Pencil className="h-4 w-4" /></Link><button type="button" className="btn-outlined px-3" onClick={() => setPendingProductId(product.id)}>{product.status === 'ACTIVE' ? 'Ngừng' : 'Kích hoạt'}</button></div></td></tr>)}</tbody></table></div><WarehousePagination currentPage={page} pageSize={PAGE_SIZE} totalItems={rows.length} onPageChange={(nextPage) => updateParam('page', String(nextPage))} /></div>}
    <ConfirmDialog isOpen={Boolean(pendingProduct)} title="Đổi trạng thái sản phẩm?" description={`${pendingProduct?.name ?? ''} có ${variants.filter((variant) => variant.productId === pendingProductId).length} SKU bị ảnh hưởng. Dữ liệu lịch sử sẽ được giữ nguyên.`} confirmLabel="Xác nhận" onCancel={() => setPendingProductId(null)} onConfirm={() => { if (pendingProductId) toggleProductStatus(pendingProductId); setPendingProductId(null) }} />
  </div>
}
