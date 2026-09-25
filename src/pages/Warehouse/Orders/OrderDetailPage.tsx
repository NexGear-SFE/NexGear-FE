import { AlertTriangle, ArrowLeft, Camera, CheckCircle2, Copy, PackageCheck, Printer, Tag, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { CameraScannerModal } from '@/components/warehouse/CameraScannerModal'
import { DataState } from '@/components/warehouse/DataState'
import { ProgressStepper } from '@/components/warehouse/ProgressStepper'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { ROUTES } from '@/constants/routes'
import { useWarehouseStore, warehouseSelectors } from '@/stores/warehouseStore'
import { formatDate } from '@/utils/formatDate'
import { getOrderProgressIndex, orderStateLabels } from '@/utils/warehouseOrder'

const progressSteps = ['Tiếp nhận', 'Chuẩn bị & Đóng gói', 'Chờ Đơn Vị Vận Chuyển Lấy', 'Hoàn tất']

export function OrderDetailPage() {
  const { orderId = '' } = useParams()
  const store = useWarehouseStore(useShallow(warehouseSelectors.orders))
  const order = store.orders.find((item) => item.id === orderId)
  const [serialInputs, setSerialInputs] = useState<Record<string, string>>({})
  const [serialErrors, setSerialErrors] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [cameraScanningItem, setCameraScanningItem] = useState<{
    itemId: string
    variantId: string
    productName: string
    sku: string
  } | null>(null)

  // Validation to see if all quantities are picked and all required serials scanned
  const canFinalizePack = useMemo(() => {
    if (!order) return false
    return order.items.every((item) => {
      const variant = store.variants.find((v) => v.id === item.variantId)
      const picked = item.pickedQuantity === item.quantity
      if (!variant?.serialTracking) return picked
      return picked && item.assignedSerialIds.length === item.quantity
    })
  }, [order, store.variants])

  if (!order) return <DataState type="empty" title="Không tìm thấy đơn hàng" description="Mã đơn không tồn tại hoặc đã thay đổi." />

  const isPreparing = order.state === 'PICKING' || order.state === 'WAITING_SERIAL' || order.state === 'READY_TO_PACK'
  const isAwaitingPickup = order.state === 'WAITING_GHTK_PICKUP'

  const handleScanSerial = (itemId: string, variantId: string, customVal?: string): boolean => {
    const rawVal = (customVal !== undefined ? customVal : (serialInputs[itemId] ?? '')).trim().toUpperCase()
    if (!rawVal) return false

    setSerialErrors((prev) => ({ ...prev, [itemId]: '' }))

    // Find if serial exists in available pool
    const matchingSerial = store.serials.find(
      (s) => s.variantId === variantId && s.value.trim().toUpperCase() === rawVal && (s.status === 'AVAILABLE' || s.status === 'RESERVED')
    )

    if (!matchingSerial) {
      setSerialErrors((prev) => ({ ...prev, [itemId]: `Mã serial "${rawVal}" không tồn tại hoặc không khả dụng.` }))
      return false
    }

    const currentItem = order.items.find((i) => i.id === itemId)
    if (!currentItem) return false

    if (currentItem.assignedSerialIds.includes(matchingSerial.id)) {
      setSerialErrors((prev) => ({ ...prev, [itemId]: `Serial "${rawVal}" đã được quét cho dòng này.` }))
      return false
    }

    if (currentItem.assignedSerialIds.length >= currentItem.quantity) {
      setSerialErrors((prev) => ({ ...prev, [itemId]: `Đã quét đủ số lượng serial (${currentItem.quantity}/${currentItem.quantity}).` }))
      return false
    }

    // Collect all serials across all items in order, appending new serial to this item
    const allAssigned = order.items.flatMap((item) =>
      item.id === itemId ? [...item.assignedSerialIds, matchingSerial.id] : item.assignedSerialIds
    )
    store.assignOrderSerials(order.id, allAssigned)
    setSerialInputs((prev) => ({ ...prev, [itemId]: '' }))
    return true
  }

  const handleRemoveSerial = (itemId: string, serialId: string) => {
    const allAssigned = order.items.flatMap((item) =>
      item.id === itemId ? item.assignedSerialIds.filter((id) => id !== serialId) : item.assignedSerialIds
    )
    store.assignOrderSerials(order.id, allAssigned)
  }

  const handleExecutePacking = () => {
    // Complete picking
    store.completePicking(order.id)
    // Create GHTK shipment and transition to WAITING_GHTK_PICKUP
    store.packOrder(order.id, false, {
      weightGrams: 1000,
      lengthCm: 25,
      widthCm: 20,
      heightCm: 15,
      pickupAddress: 'Kho NexGear — TP.HCM',
    })
  }

  const handlePrintShippingLabel = () => {
    const printWindow = window.open('', '_blank', 'width=600,height=400')
    if (!printWindow) return
    printWindow.document.write(`
      <html>
        <head>
          <title>Phiếu Giao Hàng - ${order.parcel?.trackingCode ?? order.id}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; text-align: center; }
            .box { border: 2px dashed #333; padding: 20px; margin: 0 auto; max-width: 450px; }
            .code { font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 15px 0; }
            .barcode { font-size: 36px; font-weight: 900; letter-spacing: 6px; font-family: monospace; background: #eee; padding: 10px; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>NEX-GEAR FULFILLMENT LABEL</h2>
            <p>Mã đơn hàng: <strong>${order.id}</strong></p>
            <div class="barcode">||| | |||| ||| |||| | |||</div>
            <div class="code">${order.parcel?.trackingCode ?? 'GHTK-EXPRESS'}</div>
            <p>Người nhận: ${order.customerName}</p>
            <p>Địa chỉ: ${order.address}</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="space-y-6">
      <Link to={ROUTES.warehouseOrders} className="inline-flex items-center gap-2 text-sm font-semibold text-text-600">
        <ArrowLeft className="h-4 w-4" /> Danh sách đơn hàng
      </Link>
      <WarehousePageHeader
        eyebrow="Xử lý đơn hàng kho"
        title={order.id}
        description={`Ngày tạo: ${formatDate(order.createdAt)}`}
        actions={<StatusBadge label={orderStateLabels[order.state]} tone={order.state === 'ISSUE' ? 'error' : order.state === 'COMPLETED' ? 'success' : order.state === 'WAITING_GHTK_PICKUP' ? 'info' : 'warning'} />}
      />

      <section className="rounded-md border border-surface-400 bg-white p-5">
        <ProgressStepper steps={progressSteps} currentStep={getOrderProgressIndex(order)} />
        {order.state === 'ISSUE' && (
          <div className="mt-4 flex items-start gap-3 rounded-sm border border-error-200 bg-error-50 p-4 text-sm text-error-700">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div>
              <strong>Sự cố: {order.issue?.title}</strong>
              <p className="mt-1">{order.issue?.message}</p>
            </div>
          </div>
        )}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {/* Section A: Only ID, Status, Assignee */}
          <section className="rounded-md border border-surface-400 bg-white p-5">
            <h2 className="font-heading text-lg font-semibold">A. Thông tin đơn hàng</h2>
            <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
              <div>
                <dt className="text-text-600">Mã đơn hàng</dt>
                <dd className="mt-1 font-semibold">{order.id}</dd>
              </div>
              <div>
                <dt className="text-text-600">Trạng thái xử lý</dt>
                <dd className="mt-1 font-semibold">{orderStateLabels[order.state]}</dd>
              </div>
              <div>
                <dt className="text-text-600">Người phụ trách</dt>
                <dd className="mt-1 font-semibold">{order.assignee ?? 'Chưa tiếp nhận'}</dd>
              </div>
            </dl>
          </section>

          {/* Section D: Products, Thumbnails, Storage Location, Inline Serial Scan */}
          <section className="overflow-hidden rounded-md border border-surface-400 bg-white">
            <div className="flex items-center justify-between p-5">
              <h2 className="font-heading text-lg font-semibold">B. Sản phẩm, Vị trí kho & Quét mã Serial</h2>
              <span className="text-xs text-text-600">{order.items.length} mặt hàng</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-surface-200 text-xs uppercase text-text-600">
                  <tr>
                    <th className="p-4 w-16">Ảnh</th>
                    <th className="p-4">Sản phẩm & SKU</th>
                    <th className="p-4">Vị trí lưu kho</th>
                    <th className="p-4">Yêu cầu</th>
                    <th className="p-4">Đã nhặt</th>
                    <th className="p-4">Quét mã vạch / Serial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-400">
                  {order.items.map((item) => {
                    const variant = store.variants.find((c) => c.id === item.variantId)
                    const product = store.products.find((c) => c.id === variant?.productId)
                    const isSerialTracked = Boolean(variant?.serialTracking)
                    const inputVal = serialInputs[item.id] ?? ''
                    const errorVal = serialErrors[item.id] ?? ''
                    const availableSerialsForItem = store.serials.filter(
                      (s) => s.variantId === item.variantId && (s.status === 'AVAILABLE' || s.status === 'RESERVED') && !item.assignedSerialIds.includes(s.id)
                    )

                    return (
                      <tr key={item.id}>
                        <td className="p-4">
                          <div className="h-12 w-12 rounded border border-surface-300 bg-surface-100 flex items-center justify-center overflow-hidden">
                            {product?.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                            ) : (
                              <Tag className="h-5 w-5 text-text-400" />
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold">{product?.name}</p>
                          <p className="font-mono text-xs font-semibold text-text-700">{variant?.sku}</p>
                          <p className="mt-1 text-xs text-text-600">{variant?.optionValues.map((v) => `${v.option}: ${v.value}`).join(' · ')}</p>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
                            {variant?.storageLocation ?? 'Kệ A - Tầng 1'}
                          </span>
                        </td>
                        <td className="p-4 font-semibold">{item.quantity}</td>
                        <td className="p-4">
                          {order.state === 'WAITING_ACCEPTANCE' ? (
                            <span className="text-text-600">{item.pickedQuantity}/{item.quantity}</span>
                          ) : (
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={item.pickedQuantity === item.quantity}
                                onChange={(e) => store.setPickedQuantity(order.id, item.id, e.target.checked ? item.quantity : 0)}
                                className="h-4 w-4 accent-brand-500"
                              />
                              <span className="font-semibold">{item.pickedQuantity === item.quantity ? 'Đã lấy đủ' : 'Chưa lấy'}</span>
                            </label>
                          )}
                        </td>
                        <td className="p-4 min-w-[280px]">
                          {isSerialTracked ? (
                            <div className="space-y-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Quét mã vạch / serial..."
                                  value={inputVal}
                                  onChange={(e) => setSerialInputs((prev) => ({ ...prev, [item.id]: e.target.value }))}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault()
                                      handleScanSerial(item.id, item.variantId)
                                    }
                                  }}
                                  disabled={item.assignedSerialIds.length >= item.quantity || !isPreparing}
                                  className="input-gaming text-xs py-1.5 px-2 flex-1 font-mono disabled:opacity-50"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleScanSerial(item.id, item.variantId)}
                                  disabled={item.assignedSerialIds.length >= item.quantity || !inputVal.trim() || !isPreparing}
                                  className="btn-outlined text-xs py-1.5 px-2.5 disabled:opacity-40"
                                >
                                  Quét
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCameraScanningItem({
                                      itemId: item.id,
                                      variantId: item.variantId,
                                      productName: product?.name ?? 'Sản phẩm',
                                      sku: variant?.sku ?? '',
                                    })
                                  }
                                  disabled={item.assignedSerialIds.length >= item.quantity || !isPreparing}
                                  className="btn-outlined text-xs py-1.5 px-2 flex items-center gap-1 text-brand-600 border-brand-300 hover:bg-brand-50 disabled:opacity-40"
                                  title="Quét bằng camera điện thoại/laptop"
                                >
                                  <Camera className="h-3.5 w-3.5" />
                                  <span className="hidden sm:inline">Camera</span>
                                </button>
                              </div>
                              {isPreparing && item.assignedSerialIds.length < item.quantity && availableSerialsForItem.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                                  <span className="text-[11px] font-medium text-text-500">Mã kho có sẵn:</span>
                                  {availableSerialsForItem.slice(0, 4).map((s) => (
                                    <button
                                      key={s.id}
                                      type="button"
                                      onClick={() => handleScanSerial(item.id, item.variantId, s.value)}
                                      className="rounded bg-brand-50 border border-brand-200 px-1.5 py-0.5 font-mono text-[11px] text-brand-700 hover:bg-brand-100 hover:border-brand-300 transition-colors"
                                      title={`Bấm để chọn nhanh serial ${s.value}`}
                                    >
                                      +{s.value}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {errorVal && <p className="text-xs text-error-700">{errorVal}</p>}
                              <div className="flex flex-wrap gap-1.5">
                                {item.assignedSerialIds.map((sId) => {
                                  const s = store.serials.find((x) => x.id === sId)
                                  return (
                                    <span key={sId} className="inline-flex items-center gap-1 rounded bg-surface-200 px-2 py-0.5 font-mono text-xs text-text-900 border border-surface-400">
                                      {s?.value ?? sId}
                                      {isPreparing && (
                                        <button
                                          type="button"
                                          className="text-text-400 hover:text-error-700"
                                          onClick={() => handleRemoveSerial(item.id, sId)}
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      )}
                                    </span>
                                  )
                                })}
                                {item.assignedSerialIds.length < item.quantity && (
                                  <span className="text-[11px] text-amber-700 italic">
                                    Cần {item.quantity - item.assignedSerialIds.length} serial nữa
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-text-600">Hàng không quản lý serial</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Summary & Big Red Packing CTA */}
        <aside className="h-fit space-y-4 xl:sticky xl:top-24">
          <section className="rounded-md border border-surface-400 bg-white p-5">
            <h2 className="font-heading font-semibold">Tóm tắt đơn hàng</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-600">Số lượng SKU</dt>
                <dd className="font-semibold">{order.items.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-600">Tổng sản phẩm</dt>
                <dd className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)} chiếc</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-md border border-surface-400 bg-white p-5">
            <h2 className="font-heading font-semibold">Thao tác kho</h2>

            {order.state === 'WAITING_ACCEPTANCE' && (
              <button
                type="button"
                className="btn-primary mt-4 w-full"
                onClick={() => store.acceptOrder(order.id)}
              >
                <PackageCheck className="h-4 w-4" /> Bắt đầu chuẩn bị hàng
              </button>
            )}

            {isPreparing && (
              <div className="mt-4 space-y-4">
                <div className="rounded bg-surface-100 p-3 text-xs text-text-600 space-y-1">
                  <p>✓ Đã nhặt đủ hàng trong kho</p>
                  <p>✓ Đã quét đủ serial từng dòng</p>
                  <p>Hệ thống tự động đồng bộ API đơn vị vận chuyển.</p>
                </div>
                <button
                  type="button"
                  disabled={!canFinalizePack}
                  onClick={handleExecutePacking}
                  className="w-full rounded-md bg-brand-500 py-3 px-4 font-heading font-bold text-white shadow hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
                >
                  Đóng gói & Tạo Vận Đơn
                </button>
                {!canFinalizePack && (
                  <p className="text-center text-xs text-amber-700">
                    Vui lòng tích đủ số lượng nhặt và quét đủ mã serial để tạo vận đơn.
                  </p>
                )}
              </div>
            )}

            {isAwaitingPickup && (
              <div className="mt-4 space-y-4">
                <div className="rounded-md border border-info-200 bg-info-50 p-4">
                  <p className="text-xs text-info-700 font-semibold uppercase">Mã vận đơn đối tác</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-text-900">
                      {order.parcel?.trackingCode ?? `GHN-${order.id.replace(/\D/g, '').slice(-8)}`}
                    </span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-brand-500 hover:underline inline-flex items-center gap-1"
                      onClick={() => {
                        const code = order.parcel?.trackingCode ?? `GHN-${order.id.replace(/\D/g, '').slice(-8)}`
                        navigator.clipboard.writeText(code)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                    >
                      <Copy className="h-3 w-3" /> {copied ? 'Đã copy' : 'Copy'}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-outlined w-full flex items-center justify-center gap-2 border-brand-500 text-brand-500 font-semibold"
                  onClick={handlePrintShippingLabel}
                >
                  <Printer className="h-4 w-4" /> In Phiếu Giao Hàng
                </button>

                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => store.completeOrder(order.id)}
                >
                  Xác nhận Shipper đã lấy hàng
                </button>
              </div>
            )}

            {order.state === 'COMPLETED' && (
              <div className="mt-4 space-y-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-success-500">
                  <CheckCircle2 className="h-5 w-5" /> Đã bàn giao kiện cho vận chuyển.
                </p>
                {order.parcel?.trackingCode && (
                  <p className="font-mono text-xs text-text-600">Vận đơn: {order.parcel.trackingCode}</p>
                )}
                <button
                  type="button"
                  className="btn-outlined w-full flex items-center justify-center gap-2"
                  onClick={handlePrintShippingLabel}
                >
                  <Printer className="h-4 w-4" /> In lại phiếu
                </button>
              </div>
            )}
          </section>
        </aside>
      </div>

      {cameraScanningItem && (
        <CameraScannerModal
          isOpen={true}
          onClose={() => setCameraScanningItem(null)}
          title={`Quét Serial: ${cameraScanningItem.sku}`}
          subtitle={cameraScanningItem.productName}
          availableSerials={store.serials
            .filter((s) => s.variantId === cameraScanningItem.variantId && (s.status === 'AVAILABLE' || s.status === 'RESERVED'))
            .map((s) => s.value)}
          onScan={(scannedVal) => {
            const success = handleScanSerial(cameraScanningItem.itemId, cameraScanningItem.variantId, scannedVal)
            if (success) {
              const updatedItem = order.items.find((i) => i.id === cameraScanningItem.itemId)
              if (updatedItem && updatedItem.assignedSerialIds.length + 1 >= updatedItem.quantity) {
                setTimeout(() => setCameraScanningItem(null), 1200)
              }
            }
          }}
        />
      )}
    </div>
  )
}
