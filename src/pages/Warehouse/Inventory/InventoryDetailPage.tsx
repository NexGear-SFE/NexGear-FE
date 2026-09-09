import { ArrowLeft, Boxes, Hash, History, Layers3, PackageSearch, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { DataState } from '@/components/warehouse/DataState'
import { ProductInventoryPanel } from '@/components/warehouse/ProductInventoryPanel'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { WarehouseStatCard } from '@/components/warehouse/WarehouseStatCard'
import { ROUTES, warehouseOrderDetailPath, warehouseProductDetailPath, warehouseReceiptDetailPath } from '@/constants/routes'
import { useWarehouseStore } from '@/stores/warehouseStore'
import type { InventoryMovementReason, SerialStatus } from '@/types/inventory.type'
import { buildCategoryBreadcrumb } from '@/utils/buildCategoryTree'
import { formatDate, getAvailableStock } from '@/utils/formatters'
import { findSerialExact } from '@/utils/inventory'

const movementLabels: Record<InventoryMovementReason, string> = {
  STOCK_RECEIPT: 'Nhập kho', ORDER_RESERVED: 'Giữ cho đơn', ORDER_FULFILLED: 'Xuất đơn', ADJUSTMENT: 'Điều chỉnh',
}
const serialLabels: Record<SerialStatus, string> = { AVAILABLE: 'Khả dụng', RESERVED: 'Đã giữ', SOLD: 'Đã bán', RETURNED: 'Hoàn trả' }

export function InventoryDetailPage() {
  const { productId = '' } = useParams()
  const { products, variants, inventory, serials, movements, receipts, orders, categories } = useWarehouseStore()
  const [params, setParams] = useSearchParams()
  const [serialQuery, setSerialQuery] = useState('')
  const product = products.find((item) => item.id === productId)
  const productVariants = variants.filter((variant) => variant.productId === productId)
  const variantIds = useMemo(() => new Set(productVariants.map((variant) => variant.id)), [productVariants])
  const productInventory = inventory.filter((item) => variantIds.has(item.variantId))
  const productSerials = serials.filter((serial) => variantIds.has(serial.variantId))
  const selectedVariantId = params.get('sku') ?? ''
  const scopedSerials = selectedVariantId ? productSerials.filter((serial) => serial.variantId === selectedVariantId) : productSerials
  const visibleSerials = findSerialExact(scopedSerials, serialQuery)
  const productMovements = movements.filter((movement) => variantIds.has(movement.variantId)).sort((first, second) => second.occurredAt.localeCompare(first.occurredAt))
  const relatedReceipts = receipts.filter((receipt) => receipt.lines.some((line) => variantIds.has(line.variantId)))
  const totalOnHand = productInventory.reduce((sum, item) => sum + item.onHand, 0)
  const totalReserved = productInventory.reduce((sum, item) => sum + item.reserved, 0)

  if (!product) return <DataState type="empty" title="Không tìm thấy sản phẩm" description="Sản phẩm có thể đã bị xóa hoặc đường dẫn không còn hợp lệ." />

  return <div className="space-y-6">
    <Link to={ROUTES.warehouseInventory} className="inline-flex items-center gap-2 text-sm font-semibold text-text-600 hover:text-brand-500"><ArrowLeft className="h-4 w-4" /> Quay lại tồn kho</Link>
    <WarehousePageHeader eyebrow="Inventory detail" title={product.name} description={`${product.brand} · ${buildCategoryBreadcrumb(categories, product.categoryId)} · ID ${product.productCode}`} actions={<Link className="btn-outlined" to={warehouseProductDetailPath(product.id)}><PackageSearch className="h-4 w-4" /> Hồ sơ sản phẩm</Link>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><WarehouseStatCard icon={Boxes} label="Tổng on hand" value={totalOnHand} /><WarehouseStatCard icon={Layers3} label="Available" value={getAvailableStock(totalOnHand, totalReserved)} helper={`${totalReserved} đang được giữ`} /><WarehouseStatCard icon={Hash} label="Biến thể" value={productVariants.length} /><WarehouseStatCard icon={PackageSearch} label="Serial" value={productSerials.length} helper="Trên mọi SKU" /></div>

    <section className="rounded-md border border-surface-400 bg-white p-5"><h2 className="mb-4 font-heading text-lg font-semibold">Tồn kho theo biến thể</h2><ProductInventoryPanel variants={productVariants} inventory={productInventory} serials={productSerials} /><p className="mt-3 text-xs text-text-600">Tồn kho là dữ liệu chỉ đọc tại đây. Hãy dùng phiếu nhập hoặc quy trình xử lý đơn để thay đổi số lượng.</p></section>

    <section id="serials" className="scroll-mt-24 rounded-md border border-surface-400 bg-white p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"><div><h2 className="font-heading text-lg font-semibold">Serial sản phẩm</h2><p className="mt-1 text-xs text-text-600">Tra cứu chính xác serial để tránh nhầm thiết bị.</p></div><div className="flex flex-col gap-2 md:flex-row"><select aria-label="Lọc serial theo SKU" value={selectedVariantId} onChange={(event) => setParams((current) => { const next = new URLSearchParams(current); if (event.target.value) next.set('sku', event.target.value); else next.delete('sku'); return next })} className="input-gaming md:w-56"><option value="">Mọi SKU</option>{productVariants.filter((variant) => variant.serialTracking).map((variant) => <option key={variant.id} value={variant.id}>{variant.sku}</option>)}</select><label className="relative block md:w-80"><span className="sr-only">Tìm chính xác serial</span><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-text-600" /><input value={serialQuery} onChange={(event) => setSerialQuery(event.target.value)} className="input-gaming w-full pl-10" placeholder="Nhập đầy đủ serial…" /></label></div></div>
      {visibleSerials.length === 0 ? <DataState type="empty" title="Không có serial phù hợp" description="Nhập đầy đủ và kiểm tra lại serial cần tìm." /> : <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-3">Serial</th><th className="p-3">SKU</th><th className="p-3">Phiếu nhập</th><th className="p-3">Ngày nhập</th><th className="p-3">Trạng thái</th><th className="p-3">Đơn liên quan</th></tr></thead><tbody className="divide-y divide-surface-400">{visibleSerials.map((serial) => {
        const variant = productVariants.find((item) => item.id === serial.variantId)
        const relatedOrder = orders.find((order) => order.items.some((item) => item.assignedSerialIds.includes(serial.id)))
        return <tr key={serial.id}><td className="p-3 font-mono font-semibold">{serial.value}</td><td className="p-3 font-mono">{variant?.sku}</td><td className="p-3"><Link className="font-semibold text-brand-500 hover:underline" to={warehouseReceiptDetailPath(serial.receiptId)}>{serial.receiptId}</Link></td><td className="p-3">{formatDate(serial.receivedAt)}</td><td className="p-3"><StatusBadge label={serialLabels[serial.status]} tone={serial.status === 'AVAILABLE' ? 'success' : serial.status === 'RETURNED' ? 'warning' : 'neutral'} /></td><td className="p-3">{relatedOrder ? <Link className="font-semibold text-brand-500 hover:underline" to={warehouseOrderDetailPath(relatedOrder.id)}>{relatedOrder.id}</Link> : '—'}</td></tr>
      })}</tbody></table></div>}
    </section>

    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-md border border-surface-400 bg-white p-5"><h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold"><History className="h-5 w-5 text-brand-500" /> Lịch sử biến động</h2>{productMovements.length === 0 ? <DataState type="empty" title="Chưa có biến động" description="Lịch sử nhập, giữ và xuất SKU sẽ hiển thị tại đây." /> : <div className="space-y-3">{productMovements.map((movement) => {
        const variant = productVariants.find((item) => item.id === movement.variantId)
        const referencePath = movement.reason === 'STOCK_RECEIPT' ? warehouseReceiptDetailPath(movement.reference) : movement.reason.includes('ORDER') ? warehouseOrderDetailPath(movement.reference) : null
        return <article key={movement.id} className="flex items-start justify-between gap-4 border-b border-surface-400 pb-3 last:border-0"><div><p className="font-semibold">{movementLabels[movement.reason]} · <span className="font-mono text-xs">{variant?.sku}</span></p><p className="mt-1 text-xs text-text-600">{formatDate(movement.occurredAt)} · {referencePath ? <Link className="text-brand-500 hover:underline" to={referencePath}>{movement.reference}</Link> : movement.reference}</p></div><strong className={movement.quantityDelta > 0 ? 'text-success-500' : 'text-error-700'}>{movement.quantityDelta > 0 ? '+' : ''}{movement.quantityDelta}</strong></article>
      })}</div>}</section>
      <section className="rounded-md border border-surface-400 bg-white p-5"><h2 className="mb-4 font-heading text-lg font-semibold">Phiếu nhập liên quan</h2>{relatedReceipts.length === 0 ? <DataState type="empty" title="Chưa có phiếu nhập" description="Phiếu có SKU của sản phẩm này sẽ xuất hiện tại đây." /> : <div className="space-y-3">{relatedReceipts.map((receipt) => <Link key={receipt.id} to={warehouseReceiptDetailPath(receipt.id)} className="flex items-center justify-between rounded-sm border border-surface-400 p-4 hover:border-brand-500"><div><p className="font-semibold">{receipt.id}</p><p className="mt-1 text-xs text-text-600">{receipt.supplier} · {receipt.receiptDate}</p></div><StatusBadge label={receipt.status} tone={receipt.status === 'CONFIRMED' ? 'success' : 'warning'} /></Link>)}</div>}</section>
    </div>
  </div>
}
