import { AlertTriangle, ArrowRight, Boxes, ClipboardList, FolderTree, PackageOpen, ReceiptText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getInventory } from '@/apis/inventory.api'
import { getReceipts } from '@/apis/receipt.api'
import { getWarehouseOrders } from '@/apis/warehouseOrder.api'
import { DataState } from '@/components/warehouse/DataState'
import { DataTableSkeleton } from '@/components/warehouse/DataTableSkeleton'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { ROUTES, warehouseOrderDetailPath, warehouseReceiptDetailPath } from '@/constants/routes'
import { useWarehouseStore } from '@/stores/warehouseStore'
import { formatCurrency } from '@/utils/formatters'
import { getDashboardMetrics } from '@/utils/warehouseDashboard'
import { orderStateLabels } from '@/utils/warehouseOrder'

export function WarehouseDashboardPage() {
  const store = useWarehouseStore()
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const metrics = getDashboardMetrics(store)
  const actionOrders = store.orders.filter((order) => order.state !== 'COMPLETED')
  const recentReceipts = [...store.receipts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5)
  const refresh = () => { setLoadState('loading'); void Promise.all([getWarehouseOrders(), getReceipts(), getInventory()]).then(() => setLoadState('ready')).catch(() => setLoadState('error')) }
  useEffect(() => { void Promise.all([getWarehouseOrders(), getReceipts(), getInventory()]).then(() => setLoadState('ready')).catch(() => setLoadState('error')) }, [])
  const cards = [
    { label: 'Đơn chờ tiếp nhận', value: metrics.waitingAcceptance, icon: ClipboardList, to: `${ROUTES.warehouseOrders}?status=WAITING_ACCEPTANCE`, tone: 'text-brand-500 bg-error-50' },
    { label: 'Tổng SKU', value: metrics.totalSku, icon: Boxes, to: ROUTES.warehouseInventory, tone: 'text-info-500 bg-blue-50' },
    { label: 'SKU sắp hết', value: metrics.lowStock, icon: AlertTriangle, to: `${ROUTES.warehouseInventory}?status=LOW_STOCK`, tone: 'text-warning-500 bg-amber-50' },
    { label: 'SKU hết hàng', value: metrics.outOfStock, icon: Boxes, to: `${ROUTES.warehouseInventory}?status=OUT_OF_STOCK`, tone: 'text-error-700 bg-error-50' },
    { label: 'Sản phẩm Active / Draft', value: `${metrics.activeProducts} / ${metrics.draftProducts}`, icon: PackageOpen, to: ROUTES.warehouseProducts, tone: 'text-info-500 bg-blue-50' },
    { label: 'Danh mục ngừng dùng', value: metrics.inactiveCategories, icon: FolderTree, to: ROUTES.warehouseCategories, tone: metrics.inactiveCategories > 0 ? 'text-warning-500 bg-amber-50' : 'text-success-500 bg-emerald-50' },
  ]
  return <div className="space-y-8"><WarehousePageHeader eyebrow="Warehouse operations" title="Tổng quan kho" description="Theo dõi công việc cần xử lý, sức khỏe tồn kho và các phiếu nhập gần nhất." />
    {loadState === 'loading' && <DataTableSkeleton columns={3} rows={2} />}{loadState === 'error' && <DataState type="error" title="Không tải được tổng quan kho" description="Dữ liệu vận hành đang gián đoạn." onRetry={refresh} />}
    {loadState === 'ready' && <><section aria-label="Chỉ số kho" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(({ label, value, icon: Icon, to, tone }) => <Link key={label} to={to} className="card-gaming group flex items-center gap-4 p-5 focus-visible:outline-none focus-visible:shadow-focus"><span className={`flex h-11 w-11 items-center justify-center rounded-md ${tone}`}><Icon className="h-5 w-5" /></span><span><strong className="block font-heading text-2xl">{value}</strong><span className="text-body-sm text-text-600">{label}</span></span><ArrowRight className="ml-auto h-4 w-4 text-text-600 transition-mechanical group-hover:text-brand-500" /></Link>)}</section>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><section className="card-gaming overflow-hidden"><div className="flex items-center justify-between border-b border-surface-400 p-5"><div><p className="text-caption font-semibold uppercase tracking-wider text-text-600">Ưu tiên hôm nay</p><h2 className="mt-1 font-heading text-lg font-semibold">Đơn cần xử lý</h2></div><Link className="text-xs font-semibold text-brand-500" to={ROUTES.warehouseOrders}>Xem tất cả</Link></div>{actionOrders.length === 0 ? <DataState type="empty" title="Không có đơn cần xử lý" description="Mọi đơn đã được bàn giao cho GHTK." /> : <div className="divide-y divide-surface-400">{actionOrders.slice(0, 5).map((order) => <Link key={order.id} to={warehouseOrderDetailPath(order.id)} className="flex items-center gap-3 p-4 hover:bg-surface-200"><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{order.id}</strong><span className="text-xs text-text-600">{order.customerName} · {order.items.length} SKU</span></span><StatusBadge label={orderStateLabels[order.state]} tone={order.state === 'ISSUE' ? 'error' : 'warning'} /><span className="hidden text-sm font-semibold md:block">{formatCurrency(order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0))}</span></Link>)}</div>}</section>
        <section className="card-gaming overflow-hidden"><div className="flex items-center justify-between border-b border-surface-400 p-5"><div><p className="text-caption font-semibold uppercase tracking-wider text-text-600">Inbound</p><h2 className="mt-1 font-heading text-lg font-semibold">Phiếu nhập gần đây</h2></div><ReceiptText className="h-5 w-5 text-brand-500" /></div>{recentReceipts.length === 0 ? <DataState type="empty" title="Chưa có phiếu nhập" description="Phiếu mới nhất sẽ xuất hiện tại đây." /> : <div className="divide-y divide-surface-400">{recentReceipts.map((receipt) => <Link key={receipt.id} to={warehouseReceiptDetailPath(receipt.id)} className="flex items-center gap-3 p-4 hover:bg-surface-200"><span className="flex-1"><strong className="block text-sm">{receipt.id}</strong><span className="text-xs text-text-600">{receipt.supplier || 'Chưa chọn nhà cung cấp'} · {receipt.lines.reduce((sum, line) => sum + line.quantity, 0)} sản phẩm</span></span><StatusBadge label={receipt.status === 'DRAFT' ? 'Bản nháp' : 'Đã xác nhận'} tone={receipt.status === 'CONFIRMED' ? 'success' : 'warning'} /></Link>)}</div>}</section></div></>}
  </div>
}
