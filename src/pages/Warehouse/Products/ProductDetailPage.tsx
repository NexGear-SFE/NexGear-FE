import { ArrowLeft, Boxes, ClipboardList, Edit3, PackageOpen, ShieldCheck, Tags } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { DataState } from '@/components/warehouse/DataState'
import { ProductInventoryPanel } from '@/components/warehouse/ProductInventoryPanel'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehouseStatCard } from '@/components/warehouse/WarehouseStatCard'
import { ROUTES, warehouseProductEditPath } from '@/constants/routes'
import { useWarehouseStore, warehouseSelectors } from '@/stores/warehouseStore'
import { buildCategoryBreadcrumb } from '@/utils/buildCategoryTree'
import { cn } from '@/utils/cn'
import { formatDate as formatDateTime } from '@/utils/formatDate'

const tabs = ['Tổng quan', 'Biến thể/SKU', 'Thông số kỹ thuật', 'Tồn kho & Serial', 'Lịch sử nhập/xuất', 'Audit log'] as const
type Tab = typeof tabs[number]

export function ProductDetailPage() {
  const { productId = '' } = useParams()
  const { products, variants, inventory, serials, movements, skuAudit, categories } = useWarehouseStore(useShallow(warehouseSelectors.catalog))
  const [tab, setTab] = useState<Tab>('Tổng quan')
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

  return <div className="space-y-6">
    <Link to={ROUTES.warehouseProducts} className="inline-flex items-center gap-2 text-sm font-semibold text-text-600 hover:text-brand-500"><ArrowLeft className="h-4 w-4" /> Danh sách sản phẩm</Link>
    <header className="rounded-md border border-surface-400 bg-white p-5 md:p-6"><div className="flex flex-col gap-5 md:flex-row md:items-center"><span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-warehouse-950 font-heading text-xl font-bold text-white">{product.brandCode}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><StatusBadge label={product.status} tone={product.status === 'ACTIVE' ? 'success' : product.status === 'DRAFT' ? 'warning' : 'neutral'} /><span className="text-xs text-text-600">{buildCategoryBreadcrumb(categories, product.categoryId)}</span></div><h1 className="mt-3 font-heading text-2xl font-bold md:text-3xl">{product.name}</h1><p className="mt-2 text-sm text-text-600">{product.productCode} · {product.modelCode} · {product.brand}</p></div><Link to={warehouseProductEditPath(product.id)} className="btn-primary"><Edit3 className="h-4 w-4" /> Chỉnh sửa</Link></div></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><WarehouseStatCard icon={Tags} label="Tổng SKU" value={productVariants.length} /><WarehouseStatCard icon={PackageOpen} label="On hand" value={onHand} /><WarehouseStatCard icon={ClipboardList} label="Reserved" value={reserved} /><WarehouseStatCard icon={Boxes} label="Available" value={Math.max(0, onHand - reserved)} /><WarehouseStatCard icon={ShieldCheck} label="Serial" value={productSerials.length} /></div>
    <section className="rounded-md border border-surface-400 bg-white"><div className="overflow-x-auto border-b border-surface-400" role="tablist" aria-label="Chi tiết sản phẩm">{tabs.map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={cn('min-h-12 whitespace-nowrap border-b-2 px-4 text-sm font-semibold', tab === item ? 'border-brand-500 text-brand-500' : 'border-transparent text-text-600')}>{item}</button>)}</div><div className="p-5 md:p-6">
      {tab === 'Tổng quan' && <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[['Product ID', product.id], ['Product code', product.productCode], ['Model code', product.modelCode], ['Slug', product.slug], ['Brand', `${product.brand} (${product.brandCode})`], ['Category ID', product.categoryId], ['Đơn vị', product.unit], ['Xuất xứ', product.origin], ['Bảo hành', `${product.warrantyMonths} tháng`], ['Khối lượng', `${product.weightGrams} g`], ['Kích thước', `${product.dimensions.lengthMm} × ${product.dimensions.widthMm} × ${product.dimensions.heightMm} mm`], ['Mô tả', product.shortDescription]].map(([label, value]) => <div key={label} className="rounded-sm bg-surface-200 p-3"><dt className="text-xs font-semibold uppercase text-text-600">{label}</dt><dd className="mt-1 text-sm font-medium">{value}</dd></div>)}</dl>}
      {tab === 'Biến thể/SKU' && <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-surface-200"><tr><th className="p-3">SKU</th><th className="p-3">Options</th><th className="p-3">Barcode / GTIN</th><th className="p-3">Tracking</th><th className="p-3">SKU lock</th><th className="p-3">Trạng thái</th></tr></thead><tbody>{productVariants.map((variant) => <tr key={variant.id} className="border-b border-surface-400"><td className="p-3 font-mono font-semibold">{variant.sku}</td><td className="p-3">{variant.optionValues.map((item) => `${item.option}: ${item.value}`).join(' · ') || 'Default'}</td><td className="p-3">{variant.barcode || variant.gtin || '—'}</td><td className="p-3">{variant.serialTracking ? 'Serial' : 'Số lượng'}</td><td className="p-3">{variant.skuLocked ? 'Đã khóa' : 'Có thể sửa'}</td><td className="p-3"><StatusBadge label={variant.status} tone={variant.status === 'ACTIVE' ? 'success' : 'neutral'} /></td></tr>)}</tbody></table></div>}
      {tab === 'Thông số kỹ thuật' && <dl className="divide-y divide-surface-400 rounded-md border border-surface-400">{product.specifications.map((spec) => <div key={spec.key} className="grid grid-cols-2 gap-3 p-3 text-sm"><dt className="font-semibold">{spec.key}</dt><dd>{spec.value}</dd></div>)}</dl>}
      {tab === 'Tồn kho & Serial' && <ProductInventoryPanel variants={productVariants} inventory={productInventory} serials={productSerials} />}
      {tab === 'Lịch sử nhập/xuất' && <div className="space-y-3">{productMovements.map((movement) => <article key={movement.id} className="flex items-center justify-between rounded-sm border border-surface-400 p-3 text-sm"><div><strong>{movement.reference}</strong><p className="text-xs text-text-600">{movement.reason} · {formatDateTime(movement.occurredAt)}</p></div><strong className={movement.quantityDelta > 0 ? 'text-success-500' : 'text-error-700'}>{movement.quantityDelta > 0 ? '+' : ''}{movement.quantityDelta}</strong></article>)}{!productMovements.length && <p className="text-sm text-text-600">Chưa có biến động kho.</p>}</div>}
      {tab === 'Audit log' && <div className="space-y-3 text-sm"><p className="rounded-sm border border-surface-400 p-3"><strong>Tạo product master</strong><span className="ml-2 text-text-600">{formatDateTime(product.createdAt)}</span></p><p className="rounded-sm border border-surface-400 p-3"><strong>Cập nhật gần nhất</strong><span className="ml-2 text-text-600">{formatDateTime(product.updatedAt)}</span></p>{productAudit.map((entry) => <p key={entry.id} className="rounded-sm border border-surface-400 p-3"><strong>{entry.action}</strong><span className="ml-2 font-mono">{entry.sku}</span><span className="ml-2 text-text-600">{entry.actor} · {formatDateTime(entry.occurredAt)}</span></p>)}</div>}
    </div></section>
  </div>
}
