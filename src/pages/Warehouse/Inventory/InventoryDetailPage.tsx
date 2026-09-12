import { ArrowLeft, Boxes, ExternalLink, Hash, History, Layers3, PackageSearch, RotateCcw, Search, SlidersHorizontal, Undo2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { DataState } from '@/components/warehouse/DataState'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { ProductInventoryPanel } from '@/components/warehouse/ProductInventoryPanel'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { WarehouseStatCard } from '@/components/warehouse/WarehouseStatCard'
import { ROUTES, warehouseOrderDetailPath, warehouseProductDetailPath, warehouseReceiptDetailPath } from '@/constants/routes'
import { useWarehouseStore, warehouseSelectors } from '@/stores/warehouseStore'
import type { InventoryMovementReason, SerialStatus } from '@/types/inventory.type'
import { buildCategoryBreadcrumb } from '@/utils/buildCategoryTree'
import { formatDate, formatDateOnly } from '@/utils/formatDate'
import { findSerialExact, getAvailableStock } from '@/utils/inventory'

const movementLabels: Record<InventoryMovementReason, string> = {
  STOCK_RECEIPT: 'Nhập kho', ORDER_RESERVED: 'Giữ cho đơn', ORDER_FULFILLED: 'Xuất đơn', ADJUSTMENT: 'Điều chỉnh',
}
const serialLabels: Record<SerialStatus, string> = { AVAILABLE: 'Khả dụng', RESERVED: 'Đã giữ', SOLD: 'Đã bán', RETURNED: 'Hoàn trả' }
type PendingAction =
  | { type: 'release'; serialId: string; serialValue: string }
  | { type: 'return'; serialId: string; serialValue: string }
  | { type: 'restock'; serialId: string; serialValue: string }
  | { type: 'adjust'; variantId: string; quantityDelta: number; reference: string }
  | null

export function InventoryDetailPage() {
  const { productId = '' } = useParams()
  const store = useWarehouseStore(useShallow(warehouseSelectors.inventory))
  const { products, variants, inventory, serials, movements, receipts, orders, categories } = store
  const [params, setParams] = useSearchParams()
  const [serialQuery, setSerialQuery] = useState('')
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const [adjustVariantId, setAdjustVariantId] = useState('')
  const [adjustDelta, setAdjustDelta] = useState(0)
  const [adjustReference, setAdjustReference] = useState('')
  const [actionMessage, setActionMessage] = useState('')
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
  const serialStats = { available: productSerials.filter((serial) => serial.status === 'AVAILABLE').length, reserved: productSerials.filter((serial) => serial.status === 'RESERVED').length, sold: productSerials.filter((serial) => serial.status === 'SOLD').length, returned: productSerials.filter((serial) => serial.status === 'RETURNED').length }
  const quantityOnlyVariants = productVariants.filter((variant) => !variant.serialTracking && variant.status === 'ACTIVE')

  if (!product) return <DataState type="empty" title="Không tìm thấy sản phẩm" description="Sản phẩm có thể đã bị xóa hoặc đường dẫn không còn hợp lệ." />

  const confirmAction = () => {
    if (!pendingAction) return
    let success: boolean
    if (pendingAction.type === 'release') success = store.releaseSerialReservation(pendingAction.serialId)
    else if (pendingAction.type === 'return') success = store.markSerialReturned(pendingAction.serialId)
    else if (pendingAction.type === 'restock') success = store.restockReturnedSerial(pendingAction.serialId)
    else success = store.adjustInventory(pendingAction.variantId, pendingAction.quantityDelta, pendingAction.reference)
    setActionMessage(success ? 'Đã cập nhật tồn kho thành công.' : 'Không thể thực hiện thao tác. Dữ liệu có thể đã thay đổi hoặc số lượng không hợp lệ.')
    if (success && pendingAction.type === 'adjust') { setAdjustDelta(0); setAdjustReference('') }
    setPendingAction(null)
  }
  const actionDescription = pendingAction?.type === 'release' ? `Serial ${pendingAction.serialValue} sẽ trở lại trạng thái Khả dụng và được gỡ khỏi đơn đang giữ.`
    : pendingAction?.type === 'return' ? `Ghi nhận serial ${pendingAction.serialValue} đã được khách trả về. Tồn kho thực chưa tăng cho tới khi hàng được kiểm tra và nhập lại kho.`
      : pendingAction?.type === 'restock' ? `Serial ${pendingAction.serialValue} sẽ chuyển về Khả dụng và tồn kho thực tăng 1.`
        : pendingAction?.type === 'adjust' ? `Tồn kho thực sẽ ${pendingAction.quantityDelta > 0 ? 'tăng' : 'giảm'} ${Math.abs(pendingAction.quantityDelta)}. Thao tác sẽ được ghi vào lịch sử biến động.` : ''

  return <div className="space-y-6">
    <Link to={ROUTES.warehouseInventory} className="inline-flex items-center gap-2 text-sm font-semibold text-text-600 hover:text-brand-500"><ArrowLeft className="h-4 w-4" /> Quay lại tồn kho</Link>
    <WarehousePageHeader eyebrow="Chi tiết tồn kho" title={product.name} description={`${product.brand} · ${buildCategoryBreadcrumb(categories, product.categoryId)} · ID ${product.productCode}`} actions={<><button type="button" className="btn-outlined" onClick={() => window.print()}>In báo cáo</button><Link className="btn-outlined" to={warehouseProductDetailPath(product.id)}><PackageSearch className="h-4 w-4" /> Hồ sơ sản phẩm</Link></>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><WarehouseStatCard icon={Boxes} label="Tồn kho thực" value={totalOnHand} helper="Số lượng vật lý đang có" /><WarehouseStatCard icon={Layers3} label="Có thể bán" value={getAvailableStock(totalOnHand, totalReserved)} helper={`${totalReserved} sản phẩm đang được giữ`} /><WarehouseStatCard icon={Hash} label="Biến thể" value={productVariants.length} /><WarehouseStatCard icon={PackageSearch} label="Serial" value={productSerials.length} helper={`${serialStats.available} khả dụng · ${serialStats.reserved} đã giữ · ${serialStats.sold} đã bán · ${serialStats.returned} hoàn trả`} /></div>
    <div className="rounded-md border border-surface-400 bg-white p-4 text-sm"><strong>Cách đọc trạng thái:</strong><span className="ml-2 text-text-600">“Sắp hết” khi Có thể bán lớn hơn 0 và nhỏ hơn hoặc bằng ngưỡng nhập lại của SKU. Ngưỡng có thể chỉnh trong Hồ sơ sản phẩm → Biến thể/SKU.</span></div>
    {actionMessage && <p role="status" className="rounded-sm border border-success-200 bg-success-50 p-3 text-sm font-semibold text-success-700">{actionMessage}</p>}

    <section className="rounded-md border border-surface-400 bg-white p-5"><h2 className="mb-4 font-heading text-lg font-semibold">Tồn kho theo biến thể</h2><ProductInventoryPanel variants={productVariants} inventory={productInventory} serials={productSerials} /><p className="mt-3 text-xs text-text-600">Tồn kho là dữ liệu chỉ đọc tại đây. Hãy dùng phiếu nhập hoặc quy trình xử lý đơn để thay đổi số lượng.</p></section>

    <section id="serials" className="scroll-mt-24 rounded-md border border-surface-400 bg-white p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"><div><h2 className="font-heading text-lg font-semibold">Serial sản phẩm</h2><p className="mt-1 text-xs text-text-600">Tra cứu chính xác serial và thực hiện bước tiếp theo trong vòng đời thiết bị.</p></div><div className="flex flex-col gap-2 md:flex-row"><select aria-label="Lọc serial theo SKU" value={selectedVariantId} onChange={(event) => setParams((current) => { const next = new URLSearchParams(current); if (event.target.value) next.set('sku', event.target.value); else next.delete('sku'); return next })} className="input-gaming md:w-56"><option value="">Mọi SKU</option>{productVariants.filter((variant) => variant.serialTracking).map((variant) => <option key={variant.id} value={variant.id}>{variant.sku}</option>)}</select><label className="relative block md:w-80"><span className="sr-only">Tìm chính xác serial</span><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-text-600" /><input value={serialQuery} onChange={(event) => setSerialQuery(event.target.value)} className="input-gaming w-full pl-10" placeholder="Nhập đầy đủ serial…" /></label></div></div>
      {visibleSerials.length === 0 ? <DataState type="empty" title="Không có serial phù hợp" description="Nhập đầy đủ và kiểm tra lại serial cần tìm." /> : <div className="overflow-x-auto"><table className="w-full min-w-[1080px] text-left text-sm"><thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-3">Serial</th><th className="p-3">SKU</th><th className="p-3">Phiếu nhập</th><th className="p-3">Ngày nhập</th><th className="p-3">Trạng thái</th><th className="p-3">Đơn liên quan</th><th className="p-3">Thao tác</th></tr></thead><tbody className="divide-y divide-surface-400">{visibleSerials.map((serial) => {
        const variant = productVariants.find((item) => item.id === serial.variantId)
        const relatedOrder = orders.find((order) => order.items.some((item) => item.assignedSerialIds.includes(serial.id)))
        return <tr key={serial.id}><td className="p-3 font-mono font-semibold">{serial.value}</td><td className="p-3 font-mono">{variant?.sku}</td><td className="p-3"><Link className="font-semibold text-brand-500 underline-offset-2 hover:underline" to={warehouseReceiptDetailPath(serial.receiptId)}>{serial.receiptId} <ExternalLink className="inline h-3.5 w-3.5" /></Link></td><td className="p-3">{formatDate(serial.receivedAt)}</td><td className="p-3"><StatusBadge label={serialLabels[serial.status]} tone={serial.status === 'AVAILABLE' ? 'success' : serial.status === 'RETURNED' ? 'warning' : 'neutral'} /></td><td className="p-3">{relatedOrder ? <Link className="font-semibold text-brand-500 underline underline-offset-2" to={warehouseOrderDetailPath(relatedOrder.id)}>{relatedOrder.id} <ExternalLink className="inline h-3.5 w-3.5" /></Link> : <span className="text-text-600">Không có</span>}</td><td className="p-3">{serial.status === 'RESERVED' ? <button type="button" className="btn-outlined whitespace-nowrap" onClick={() => setPendingAction({ type: 'release', serialId: serial.id, serialValue: serial.value })}><Undo2 className="h-4 w-4" /> Hủy giữ</button> : serial.status === 'SOLD' ? <button type="button" className="btn-outlined whitespace-nowrap" onClick={() => setPendingAction({ type: 'return', serialId: serial.id, serialValue: serial.value })}><RotateCcw className="h-4 w-4" /> Ghi nhận trả hàng</button> : serial.status === 'RETURNED' ? <button type="button" className="btn-primary whitespace-nowrap" onClick={() => setPendingAction({ type: 'restock', serialId: serial.id, serialValue: serial.value })}><Boxes className="h-4 w-4" /> Nhập lại kho</button> : <span className="text-xs text-text-600">Sẵn sàng bán</span>}</td></tr>
      })}</tbody></table></div>}
    </section>

    <section className="rounded-md border border-surface-400 bg-white p-5"><div className="flex items-start gap-3"><SlidersHorizontal className="mt-0.5 h-5 w-5 text-brand-500" /><div><h2 className="font-heading text-lg font-semibold">Điều chỉnh số lượng</h2><p className="mt-1 text-xs text-text-600">Chỉ áp dụng cho SKU quản lý theo số lượng. SKU theo serial phải dùng phiếu nhập hoặc thao tác trả hàng ở trên.</p></div></div>{quantityOnlyVariants.length === 0 ? <p className="mt-4 text-sm text-text-600">Sản phẩm này không có SKU quản lý theo số lượng.</p> : <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_minmax(0,1fr)_auto]"><select aria-label="SKU cần điều chỉnh" value={adjustVariantId} onChange={(event) => setAdjustVariantId(event.target.value)} className="input-gaming"><option value="">Chọn SKU…</option>{quantityOnlyVariants.map((variant) => <option key={variant.id} value={variant.id}>{variant.sku}</option>)}</select><input aria-label="Số lượng điều chỉnh" type="number" step="1" value={adjustDelta} onChange={(event) => setAdjustDelta(Number(event.target.value))} className="input-gaming" placeholder="+/- số lượng" /><input aria-label="Lý do điều chỉnh" value={adjustReference} onChange={(event) => setAdjustReference(event.target.value)} className="input-gaming" placeholder="Mã kiểm kê / lý do" /><button type="button" className="btn-primary" disabled={!adjustVariantId || !Number.isInteger(adjustDelta) || adjustDelta === 0 || !adjustReference.trim()} onClick={() => setPendingAction({ type: 'adjust', variantId: adjustVariantId, quantityDelta: adjustDelta, reference: adjustReference })}>Xác nhận</button></div>}</section>

    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-md border border-surface-400 bg-white p-5"><h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold"><History className="h-5 w-5 text-brand-500" /> Lịch sử biến động</h2>{productMovements.length === 0 ? <DataState type="empty" title="Chưa có biến động" description="Lịch sử nhập, giữ và xuất SKU sẽ hiển thị tại đây." /> : <div className="space-y-3">{productMovements.map((movement) => {
        const variant = productVariants.find((item) => item.id === movement.variantId)
        const referencePath = movement.reason === 'STOCK_RECEIPT' ? warehouseReceiptDetailPath(movement.reference) : movement.reason.includes('ORDER') ? warehouseOrderDetailPath(movement.reference) : null
        return <article key={movement.id} className="flex items-start justify-between gap-4 border-b border-surface-400 pb-3 last:border-0"><div><p className="font-semibold">{movementLabels[movement.reason]} · <span className="font-mono text-xs">{variant?.sku}</span></p><p className="mt-1 text-xs text-text-600">{formatDate(movement.occurredAt)} · {referencePath ? <Link className="text-brand-500 hover:underline" to={referencePath}>{movement.reference}</Link> : movement.reference}</p></div><strong className={movement.quantityDelta > 0 ? 'text-success-500' : 'text-error-700'}>{movement.quantityDelta > 0 ? '+' : ''}{movement.quantityDelta}</strong></article>
      })}</div>}</section>
      <section className="rounded-md border border-surface-400 bg-white p-5"><h2 className="mb-4 font-heading text-lg font-semibold">Phiếu nhập liên quan</h2>{relatedReceipts.length === 0 ? <DataState type="empty" title="Chưa có phiếu nhập" description="Phiếu có SKU của sản phẩm này sẽ xuất hiện tại đây." /> : <div className="space-y-3">{relatedReceipts.map((receipt) => <Link key={receipt.id} to={warehouseReceiptDetailPath(receipt.id)} className="flex items-center justify-between rounded-sm border border-surface-400 p-4 hover:border-brand-500"><div><p className="font-semibold">{receipt.id}</p><p className="mt-1 text-xs text-text-600">{receipt.supplier} · {formatDateOnly(receipt.receiptDate)}</p></div><StatusBadge label={receipt.status === 'CONFIRMED' ? 'Đã xác nhận' : 'Bản nháp'} tone={receipt.status === 'CONFIRMED' ? 'success' : 'warning'} /></Link>)}</div>}</section>
    </div>
    <ConfirmDialog isOpen={Boolean(pendingAction)} title={pendingAction?.type === 'release' ? 'Hủy giữ serial?' : pendingAction?.type === 'return' ? 'Ghi nhận trả hàng?' : pendingAction?.type === 'restock' ? 'Nhập lại kho?' : 'Điều chỉnh tồn kho?'} description={actionDescription} confirmLabel="Xác nhận thao tác" onCancel={() => setPendingAction(null)} onConfirm={confirmAction} />
  </div>
}
