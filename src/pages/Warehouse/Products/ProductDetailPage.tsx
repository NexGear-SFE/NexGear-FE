import { ArrowLeft, Boxes, ClipboardList, Edit3, PackageOpen, ShieldCheck, Tags, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { DataState } from '@/components/warehouse/DataState'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehouseStatCard } from '@/components/warehouse/WarehouseStatCard'
import { ROUTES, warehouseProductEditPath } from '@/constants/routes'
import { useWarehouseStore, warehouseSelectors } from '@/stores/warehouseStore'
import { buildCategoryBreadcrumb } from '@/utils/buildCategoryTree'
import { cn } from '@/utils/cn'
import { formatDate as formatDateTime } from '@/utils/formatDate'

import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { getAvailableStock } from '@/utils/inventory'

const tabs = ['Tổng quan', 'SKU & Tồn kho', 'Thông số kỹ thuật', 'Lịch sử nhập/xuất', 'Audit log'] as const
type Tab = typeof tabs[number]

export function ProductDetailPage() {
  const { productId = '' } = useParams()
  const { products, variants, inventory, serials, movements, skuAudit, categories } = useWarehouseStore(useShallow(warehouseSelectors.catalog))
  const [tab, setTab] = useState<Tab>('Tổng quan')
  const [viewingSerialsVariantId, setViewingSerialsVariantId] = useState<string | null>(null)
  const [viewingAuditEntry, setViewingAuditEntry] = useState<typeof skuAudit[number] | null>(null)
  const product = products.find((item) => item.id === productId)
  if (!product) return <DataState type="empty" title="Không tìm thấy sản phẩm" description="Product ID không tồn tại hoặc đã bị ẩn khỏi dữ liệu mock." />
  const productVariants = variants.filter((variant) => variant.productId === product.id)
  const variantIds = new Set(productVariants.map((variant) => variant.id))
  const productInventory = inventory.filter((item) => variantIds.has(item.variantId))
  const productSerials = serials.filter((serial) => variantIds.has(serial.variantId))
  const productMovements = movements.filter((movement) => variantIds.has(movement.variantId))
  const productAudit = skuAudit.filter((entry) => (entry.variantId && variantIds.has(entry.variantId)) || productVariants.some((variant) => variant.sku === entry.sku))
  const onHand = productInventory.reduce((sum, item) => sum + item.onHand, 0)
  const reserved = productInventory.reduce((sum, item) => sum + item.reserved, 0)

  const viewingVariant = variants.find((v) => v.id === viewingSerialsVariantId)
  const viewingSerialsList = viewingVariant ? serials.filter((s) => s.variantId === viewingVariant.id) : []

  return <div className="space-y-6">
    <Link to={ROUTES.warehouseProducts} className="inline-flex items-center gap-2 text-sm font-semibold text-text-600 hover:text-brand-500"><ArrowLeft className="h-4 w-4" /> Danh sách sản phẩm</Link>
    <header className="rounded-md border border-surface-400 bg-white p-5 md:p-6"><div className="flex flex-col gap-5 md:flex-row md:items-center"><span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-warehouse-950 font-heading text-xl font-bold text-white">{product.brandCode}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><StatusBadge label={product.status} tone={product.status === 'ACTIVE' ? 'success' : product.status === 'DRAFT' ? 'warning' : 'neutral'} /><span className="text-xs text-text-600">{buildCategoryBreadcrumb(categories, product.categoryId)}</span></div><h1 className="mt-3 font-heading text-2xl font-bold md:text-3xl">{product.name}</h1><p className="mt-2 text-sm text-text-600">{product.productCode} · {product.modelCode} · {product.brand}</p></div><Link to={warehouseProductEditPath(product.id)} className="btn-primary"><Edit3 className="h-4 w-4" /> Chỉnh sửa</Link></div></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><WarehouseStatCard icon={Tags} label="Tổng SKU" value={productVariants.length} /><WarehouseStatCard icon={PackageOpen} label="On hand" value={onHand} /><WarehouseStatCard icon={ClipboardList} label="Reserved" value={reserved} /><WarehouseStatCard icon={Boxes} label="Available" value={Math.max(0, onHand - reserved)} /><WarehouseStatCard icon={ShieldCheck} label="Serial" value={productSerials.length} /></div>
    <section className="rounded-md border border-surface-400 bg-white"><div className="overflow-x-auto border-b border-surface-400" role="tablist" aria-label="Chi tiết sản phẩm">{tabs.map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={cn('min-h-12 whitespace-nowrap border-b-2 px-4 text-sm font-semibold', tab === item ? 'border-brand-500 text-brand-500' : 'border-transparent text-text-600')}>{item}</button>)}</div><div className="p-5 md:p-6">
      {tab === 'Tổng quan' && <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[['Product ID', product.id], ['Model code', product.modelCode], ['Slug', product.slug], ['Brand', `${product.brand} (${product.brandCode})`], ['Category ID', product.categoryId], ['Đơn vị', product.unit], ['Xuất xứ', product.origin], ['Bảo hành', `${product.warrantyMonths} tháng`], ['Khối lượng', `${product.weightGrams} g`], ['Kích thước', `${product.dimensions.lengthMm} × ${product.dimensions.widthMm} × ${product.dimensions.heightMm} mm`], ['Mô tả', product.shortDescription]].map(([label, value]) => <div key={label} className="rounded-sm bg-surface-200 p-3"><dt className="text-xs font-semibold uppercase text-text-600">{label}</dt><dd className="mt-1 text-sm font-medium">{value}</dd></div>)}</dl>}
      {tab === 'SKU & Tồn kho' && <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-surface-200 text-xs uppercase text-text-600"><tr><th className="p-3">SKU</th><th className="p-3">Cấu hình tóm tắt</th><th className="p-3">Tồn kho thực (On Hand)</th><th className="p-3">Có thể bán (Available)</th><th className="p-3">Serial khả dụng</th><th className="p-3">Trạng thái</th><th className="p-3">Thao tác</th></tr></thead><tbody className="divide-y divide-surface-400">{productVariants.map((variant) => {
        const stock = productInventory.find((item) => item.variantId === variant.id)
        const vOnHand = stock?.onHand ?? 0
        const vReserved = stock?.reserved ?? 0
        const vAvailable = getAvailableStock(vOnHand, vReserved)
        const vSerials = productSerials.filter((s) => s.variantId === variant.id)
        const vAvailableSerials = vSerials.filter((s) => s.status === 'AVAILABLE').length
        return <tr key={variant.id} className="border-b border-surface-400">
          <td className="p-3 font-mono font-semibold">{variant.sku}</td>
          <td className="p-3 text-xs">{variant.optionValues.map((item) => `${item.option}: ${item.value}`).join(' · ') || 'Mặc định'}</td>
          <td className="p-3">{vOnHand}</td>
          <td className="p-3 font-semibold">{vAvailable}</td>
          <td className="p-3">
            {variant.serialTracking ? (
              <button type="button" className="text-brand-500 font-semibold underline text-xs" onClick={() => setViewingSerialsVariantId(variant.id)}>
                {vAvailableSerials}/{vSerials.length} serial
              </button>
            ) : <span className="text-xs text-text-600">Theo số lượng</span>}
          </td>
          <td className="p-3"><StatusBadge label={variant.status === 'ACTIVE' ? 'Active' : 'Inactive'} tone={variant.status === 'ACTIVE' ? 'success' : 'neutral'} /></td>
          <td className="p-3"><Link to={warehouseProductEditPath(product.id)} className="text-xs font-semibold text-brand-500 hover:underline">Chỉnh sửa</Link></td>
        </tr>
      })}</tbody></table></div>}
      {tab === 'Thông số kỹ thuật' && <dl className="divide-y divide-surface-400 rounded-md border border-surface-400">{product.specifications.map((spec) => <div key={spec.key} className="grid grid-cols-2 gap-3 p-3 text-sm"><dt className="font-semibold">{spec.key}</dt><dd>{spec.value}</dd></div>)}</dl>}
      {tab === 'Lịch sử nhập/xuất' && <div className="space-y-3">{productMovements.map((movement) => {
        const variant = productVariants.find((v) => v.id === movement.variantId)
        const isReceipt = movement.reference.startsWith('PN-')
        const isOrder = movement.reference.startsWith('#GG-')
        const linkTarget = isReceipt
          ? `/admin/warehouse/receipts/${encodeURIComponent(movement.reference)}`
          : isOrder
            ? `/admin/warehouse/orders/${encodeURIComponent(movement.reference)}`
            : null

        return <article key={movement.id} className="flex items-center justify-between rounded-sm border border-surface-400 p-3 text-sm">
          <div>
            <div className="flex items-center gap-2">
              {linkTarget ? (
                <Link to={linkTarget} className="font-semibold text-brand-500 hover:underline">{movement.reference}</Link>
              ) : <strong>{movement.reference}</strong>}
              {variant && <span className="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">{variant.sku}</span>}
            </div>
            <p className="mt-1 text-xs text-text-600">{movement.reason} · {formatDateTime(movement.occurredAt)}</p>
          </div>
          <strong className={movement.quantityDelta > 0 ? 'text-success-500' : 'text-error-700'}>{movement.quantityDelta > 0 ? '+' : ''}{movement.quantityDelta}</strong>
        </article>
      })}{!productMovements.length && <p className="text-sm text-text-600">Chưa có biến động kho.</p>}</div>}
      {tab === 'Audit log' && (() => {
        const masterAuditEntry = {
          id: 'AUD-MASTER',
          action: 'Cập nhật master data',
          sku: '—',
          actor: 'Nguyễn Bảo (WS-002)',
          occurredAt: product.updatedAt,
          detail: 'Cập nhật tên model 2024, thông số hiển thị và thời gian bảo hành',
          diff: [
            { field: 'Tên sản phẩm', before: 'ASUS ROG Strix G16', after: product.name },
            { field: 'Thời hạn bảo hành', before: '12 tháng', after: `${product.warrantyMonths} tháng` },
            { field: 'Khối lượng máy', before: '2.400 gram', after: `${product.weightGrams} gram` },
          ],
        }
        return (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-surface-200 text-xs uppercase text-text-600">
                <tr>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Người thực hiện</th>
                  <th className="p-3">Hành động</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Chi tiết thay đổi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-400">
                <tr className="border-b border-surface-400">
                  <td className="p-3 font-mono text-xs">{formatDateTime(product.createdAt)}</td>
                  <td className="p-3 font-medium">Hệ thống</td>
                  <td className="p-3 font-semibold">Tạo product master</td>
                  <td className="p-3 text-xs text-text-600">—</td>
                  <td className="p-3 text-xs text-text-600">Khởi tạo dữ liệu ban đầu</td>
                </tr>
                <tr className="border-b border-surface-400">
                  <td className="p-3 font-mono text-xs">{formatDateTime(product.updatedAt)}</td>
                  <td className="p-3 font-medium">Nguyễn Bảo</td>
                  <td className="p-3 font-semibold">Cập nhật gần nhất</td>
                  <td className="p-3 text-xs text-text-600">—</td>
                  <td className="p-3 text-xs">
                    <button type="button" className="font-semibold text-brand-500 hover:underline" onClick={() => setViewingAuditEntry(masterAuditEntry)}>
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
                {productAudit.map((entry) => (
                  <tr key={entry.id} className="border-b border-surface-400">
                    <td className="p-3 font-mono text-xs">{formatDateTime(entry.occurredAt)}</td>
                    <td className="p-3 font-medium">{entry.actor}</td>
                    <td className="p-3 font-semibold">{entry.action}</td>
                    <td className="p-3 font-mono text-xs">{entry.sku}</td>
                    <td className="p-3 text-xs">
                      {entry.detail ? (
                        <button type="button" className="font-semibold text-brand-500 hover:underline" onClick={() => setViewingAuditEntry(entry)}>
                          Xem chi tiết
                        </button>
                      ) : (
                        <span className="text-text-600">Ghi nhận sự kiện SKU</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })()}
    </div></section>

    {viewingVariant && (
      <ConfirmDialog isOpen={true} title={`Danh sách Serial: ${viewingVariant.sku}`} description={viewingSerialsList.length > 0 ? viewingSerialsList.map((s) => `${s.value} (${s.status})`).join('\n') : 'Chưa có serial nào trong hệ thống.'} confirmLabel="Đóng" cancelLabel="" onCancel={() => setViewingSerialsVariantId(null)} onConfirm={() => setViewingSerialsVariantId(null)} />
    )}
    {viewingAuditEntry && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
        <div className="w-full max-w-lg rounded-md border border-surface-400 bg-white p-6 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-surface-400 pb-3">
            <div>
              <h3 className="font-heading text-lg font-semibold">{viewingAuditEntry.action}</h3>
              <p className="text-xs text-text-600 font-mono mt-0.5">
                {viewingAuditEntry.sku !== '—' ? viewingAuditEntry.sku : product.name} · {viewingAuditEntry.actor} · {formatDateTime(viewingAuditEntry.occurredAt)}
              </p>
            </div>
            <button type="button" aria-label="Đóng" onClick={() => setViewingAuditEntry(null)} className="rounded p-1 text-text-600 hover:bg-surface-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {viewingAuditEntry.detail && <p className="text-sm font-medium text-text-900">{viewingAuditEntry.detail}</p>}
            {viewingAuditEntry.diff && viewingAuditEntry.diff.length > 0 ? (
              <div className="overflow-hidden rounded border border-surface-400">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-200 text-xs font-semibold uppercase text-text-600">
                    <tr>
                      <th className="p-2.5">Trường thông tin</th>
                      <th className="p-2.5 text-error-700">Trước (Before)</th>
                      <th className="p-2.5 text-success-700">Sau (After)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-400 font-mono text-xs">
                    {viewingAuditEntry.diff.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface-50">
                        <td className="p-2.5 font-sans font-medium text-text-900">{item.field}</td>
                        <td className="p-2.5 text-error-700 bg-error-50/40 line-through">{item.before}</td>
                        <td className="p-2.5 text-success-700 bg-success-50/40 font-semibold">{item.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded border border-surface-300 bg-surface-100 p-4 text-xs text-text-600">
                Sự kiện này chỉ ghi nhận trạng thái, không có trường thay đổi đối chiếu.
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="btn-primary" onClick={() => setViewingAuditEntry(null)}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
}
