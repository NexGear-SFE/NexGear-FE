import { ArrowRight, ClipboardList } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { getWarehouseOrders } from '@/apis/warehouseOrder.api'
import { DataState } from '@/components/warehouse/DataState'
import { DataTableSkeleton } from '@/components/warehouse/DataTableSkeleton'
import { SearchField } from '@/components/warehouse/SearchField'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehouseFilterBar } from '@/components/warehouse/WarehouseFilterBar'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { WarehousePagination } from '@/components/warehouse/WarehousePagination'
import { warehouseOrderDetailPath } from '@/constants/routes'
import { useWarehouseStore, warehouseSelectors } from '@/stores/warehouseStore'
import type { WarehouseOrderState } from '@/types/warehouseOrder.type'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { orderActionLabels, orderStateLabels, sortOrders } from '@/utils/warehouseOrder'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

const STATES: WarehouseOrderState[] = ['WAITING_ACCEPTANCE', 'PICKING', 'WAITING_SERIAL', 'READY_TO_PACK', 'WAITING_GHTK_PICKUP', 'ISSUE', 'COMPLETED']
const PAGE_SIZE = 8
const CURRENT_STAFF = 'Nguyễn Bảo'

export function OrderListPage() {
  const { orders, variants } = useWarehouseStore(useShallow(warehouseSelectors.orders))
  const [params, setParams] = useSearchParams()
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading')
  const query = params.get('q') ?? ''
  const debouncedQuery = useDebouncedValue(query)
  const tab = params.get('status') ?? 'ALL'
  const payment = params.get('payment') ?? ''
  const staff = params.get('staff') ?? ''
  const sort = params.get('sort') ?? 'smart'
  const mine = params.get('mine') === '1'
  const page = Math.max(1, Number(params.get('page') ?? 1))
  const rows = useMemo(() => sortOrders(orders.filter((order) => `${order.id} ${order.customerName}`.toLocaleLowerCase('vi').includes(debouncedQuery.trim().toLocaleLowerCase('vi')) && (tab === 'ALL' || order.state === tab) && (!payment || order.paymentMethod === payment) && (!staff || order.assignee === staff) && (!mine || order.assignee === CURRENT_STAFF)), sort), [debouncedQuery, mine, orders, payment, sort, staff, tab])
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const staffOptions = [...new Set(orders.map((order) => order.assignee).filter((value): value is string => Boolean(value)))]
  const updateParam = (key: string, value: string) => setParams((current) => { const next = new URLSearchParams(current); if (value && value !== 'ALL') next.set(key, value); else next.delete(key); if (key !== 'page') next.delete('page'); return next })
  const refresh = () => { setLoadState('loading'); void getWarehouseOrders().then(() => setLoadState('ready')).catch(() => setLoadState('error')) }
  useEffect(() => { void getWarehouseOrders().then(() => setLoadState('ready')).catch(() => setLoadState('error')) }, [])
  return <div className="space-y-6"><WarehousePageHeader eyebrow="Outbound operations" title="Đơn hàng" description="Theo dõi và xử lý đơn hàng từ giữ hàng đến bàn giao cho GHTK." />
    <div className="flex gap-2 overflow-x-auto" role="tablist"><button role="tab" aria-selected={tab === 'ALL'} type="button" className={tab === 'ALL' ? 'btn-primary whitespace-nowrap' : 'btn-outlined whitespace-nowrap'} onClick={() => updateParam('status', 'ALL')}>Tất cả ({orders.length})</button>{STATES.map((state) => <button key={state} role="tab" aria-selected={tab === state} type="button" className={tab === state ? 'btn-primary whitespace-nowrap' : 'btn-outlined whitespace-nowrap'} onClick={() => updateParam('status', state)}>{orderStateLabels[state]} ({orders.filter((order) => order.state === state).length})</button>)}</div>
    <WarehouseFilterBar><SearchField label="Tìm đơn hàng" value={query} onChange={(value) => updateParam('q', value)} placeholder="Mã đơn hoặc khách hàng…" /><select aria-label="Lọc thanh toán" value={payment} onChange={(event) => updateParam('payment', event.target.value)} className="input-gaming"><option value="">Mọi thanh toán</option><option value="COD">COD</option><option value="BANK_TRANSFER">Chuyển khoản</option><option value="VNPAY">VNPAY</option><option value="MOMO">MOMO</option></select><select aria-label="Lọc nhân viên" value={staff} onChange={(event) => updateParam('staff', event.target.value)} className="input-gaming"><option value="">Mọi nhân viên</option>{staffOptions.map((name) => <option key={name}>{name}</option>)}</select><select aria-label="Sắp xếp đơn" value={sort} onChange={(event) => updateParam('sort', event.target.value)} className="input-gaming"><option value="smart">Ưu tiên thông minh</option><option value="newest">Mới nhất</option><option value="oldest">Cũ nhất</option></select><label className="flex min-h-11 items-center gap-2 whitespace-nowrap px-2 text-sm font-semibold"><input type="checkbox" checked={mine} onChange={(event) => updateParam('mine', event.target.checked ? '1' : '')} /> Việc của tôi</label></WarehouseFilterBar>
    {loadState === 'loading' && <DataTableSkeleton columns={8} rows={6} />}{loadState === 'error' && <DataState type="error" title="Không tải được đơn hàng" description="Dữ liệu đơn hàng đang gián đoạn." onRetry={refresh} />}{loadState === 'ready' && rows.length === 0 && <DataState type="empty" title="Không có đơn phù hợp" description="Thử thay đổi tab, từ khóa hoặc bộ lọc." />}
    {loadState === 'ready' && pageRows.length > 0 && <div className="overflow-hidden rounded-md border border-surface-400 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[1280px] text-left text-sm"><thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-4">Đơn hàng</th><th className="p-4">Sản phẩm</th><th className="p-4">Trạng thái</th><th className="p-4">Phụ trách</th><th className="p-4">Vấn đề</th><th className="p-4">Tổng tiền</th><th className="p-4">Thao tác</th><th className="p-4"><span className="sr-only">Mở rộng</span></th></tr></thead><tbody className="divide-y divide-surface-400">{pageRows.map((order) => { const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0); const serialRequired = order.items.filter((item) => variants.find((variant) => variant.id === item.variantId)?.serialTracking).reduce((sum, item) => sum + item.quantity, 0); const serialAssigned = order.items.reduce((sum, item) => sum + item.assignedSerialIds.length, 0); return <tr key={order.id}><td className="p-4"><Link className="font-semibold text-brand-500 hover:underline" to={warehouseOrderDetailPath(order.id)}>{order.id}</Link><p className="mt-1 text-xs text-text-600">{order.customerName}</p><p className="text-[11px] text-text-600">{order.address.split(',').at(-1)?.trim()} · {formatDate(order.createdAt)}</p></td><td className="p-4"><p>{order.items.length} SKU · {totalQuantity} sản phẩm</p>{serialRequired > 0 && <p className="mt-1 text-xs text-text-600">Serial {serialAssigned}/{serialRequired}</p>}</td><td className="p-4"><StatusBadge label={orderStateLabels[order.state]} tone={order.state === 'ISSUE' ? 'error' : order.state === 'COMPLETED' ? 'success' : order.state === 'WAITING_GHTK_PICKUP' ? 'info' : 'warning'} /></td><td className="p-4">{order.assignee ?? 'Chưa có người nhận'}</td><td className="p-4 text-xs text-error-700">{order.issue?.title ?? '—'}</td><td className="p-4 font-semibold tabular-nums">{formatCurrency(order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0))}</td><td className="p-4"><Link className="btn-primary whitespace-nowrap" to={warehouseOrderDetailPath(order.id)}>{orderActionLabels[order.state]} <ArrowRight className="h-4 w-4" /></Link></td><td className="p-4"><button type="button" aria-label={`Lọc nhanh trạng thái ${orderStateLabels[order.state]}`} title="Lọc nhanh theo trạng thái" onClick={() => updateParam('status', order.state)} className="btn-outlined px-3"><ClipboardList className="h-4 w-4" /></button></td></tr> })}</tbody></table></div><WarehousePagination currentPage={page} pageSize={PAGE_SIZE} totalItems={rows.length} onPageChange={(next) => updateParam('page', String(next))} /></div>}
  </div>
}
