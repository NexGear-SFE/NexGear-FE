import { ArrowLeft, ArrowRight, Save, ScanLine, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { ProgressStepper } from '@/components/warehouse/ProgressStepper'
import { ReceiptSerialDialog } from '@/components/warehouse/ReceiptSerialDialog'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { ROUTES, warehouseReceiptDetailPath, warehouseReceiptEditPath } from '@/constants/routes'
import { useWarehouseStore } from '@/stores/warehouseStore'
import type { ReceiptLine, StockReceipt } from '@/types/receipt.type'
import { buildCategoryBreadcrumb } from '@/utils/buildCategoryTree'
import { formatCurrency } from '@/utils/formatters'
import { calculateReceiptTotal, getReceiptValidationIssues } from '@/utils/receipt'

const STEPS = ['Thông tin phiếu', 'Sản phẩm & SKU', 'Số lượng, giá & serial', 'Xác nhận']
const TODAY = new Date().toISOString().slice(0, 10)

export function ReceiptWizardPage() {
  const { receiptId } = useParams()
  const navigate = useNavigate()
  const store = useWarehouseStore()
  const existing = store.receipts.find((receipt) => receipt.id === receiptId)
  const [currentId, setCurrentId] = useState(receiptId ?? '')
  const [step, setStep] = useState(0)
  const [supplier, setSupplier] = useState(existing?.supplier ?? '')
  const [warehouseName, setWarehouseName] = useState(existing?.warehouseName ?? 'Kho trung tâm TP.HCM')
  const [receiptDate, setReceiptDate] = useState(existing?.receiptDate ?? TODAY)
  const [invoiceCode, setInvoiceCode] = useState(existing?.invoiceCode ?? '')
  const [notes, setNotes] = useState(existing?.notes ?? '')
  const [lines, setLines] = useState<ReceiptLine[]>(existing?.lines ?? [])
  const [selectedVariantId, setSelectedVariantId] = useState('')
  const [variantQuery, setVariantQuery] = useState('')
  const [editingSerialLineId, setEditingSerialLineId] = useState<string | null>(null)
  const [issues, setIssues] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const activeVariants = store.variants.filter((variant) => variant.status === 'ACTIVE' && store.products.find((product) => product.id === variant.productId)?.status === 'ACTIVE')
  const matchingVariantIds = new Set(activeVariants.filter((variant) => {
    const product = store.products.find((item) => item.id === variant.productId)
    return `${product?.name ?? ''} ${variant.sku}`.toLocaleLowerCase('vi').includes(variantQuery.trim().toLocaleLowerCase('vi'))
  }).map((variant) => variant.id))
  const editingLine = lines.find((line) => line.id === editingSerialLineId)
  const editingVariant = store.variants.find((variant) => variant.id === editingLine?.variantId)
  const editingProduct = store.products.find((product) => product.id === editingVariant?.productId)
  const totalQuantity = lines.reduce((sum, line) => sum + (Number.isFinite(line.quantity) ? line.quantity : 0), 0)
  const receipt = useMemo<StockReceipt>(() => ({ id: currentId || 'UNSAVED', supplier, warehouseName, receiptDate, invoiceCode, notes, creator: existing?.creator ?? 'Nguyễn Bảo', status: 'DRAFT', lines, createdAt: existing?.createdAt ?? new Date().toISOString(), updatedAt: new Date().toISOString() }), [currentId, existing?.createdAt, existing?.creator, invoiceCode, lines, notes, receiptDate, supplier, warehouseName])

  if (existing?.status === 'CONFIRMED') return <div className="space-y-4"><WarehousePageHeader title="Phiếu đã được xác nhận" description="Phiếu này đã khóa và không thể chỉnh sửa trực tiếp." /><Link className="btn-primary" to={warehouseReceiptDetailPath(existing.id)}>Xem chi tiết phiếu</Link></div>
  const saveDraft = (): StockReceipt => {
    const id = currentId || `PN-${TODAY.replaceAll('-', '')}-${String(store.receipts.length + 1).padStart(3, '0')}`
    const saved = { ...receipt, id, updatedAt: new Date().toISOString() }
    store.saveReceipt(saved); setCurrentId(id); setMessage('Đã lưu bản nháp')
    if (!currentId) navigate(warehouseReceiptEditPath(id), { replace: true })
    return saved
  }
  const addVariant = () => {
    if (!selectedVariantId) return
    const duplicateIndex = lines.findIndex((line) => line.variantId === selectedVariantId)
    if (duplicateIndex >= 0) { setStep(2); setMessage('SKU đã có trong phiếu; hãy cập nhật dòng hiện có.'); return }
    setLines((current) => [...current, { id: crypto.randomUUID(), variantId: selectedVariantId, quantity: 1, unitCost: 0, serials: [] }]); setSelectedVariantId(''); setMessage('Đã thêm SKU vào phiếu.')
  }
  const requestConfirm = () => { const nextIssues = getReceiptValidationIssues(receipt, store.variants, store.serials); setIssues(nextIssues); if (nextIssues.length === 0) setConfirmOpen(true) }
  const confirm = () => {
    if (submitting) return
    setSubmitting(true); const saved = saveDraft(); const success = store.confirmReceipt(saved.id)
    setConfirmOpen(false); setSubmitting(false)
    if (success) navigate(warehouseReceiptDetailPath(saved.id)); else setIssues(getReceiptValidationIssues(saved, store.variants, store.serials))
  }

  return <div className="space-y-6"><Link to={ROUTES.warehouseReceipts} className="inline-flex items-center gap-2 text-sm font-semibold text-text-600"><ArrowLeft className="h-4 w-4" /> Danh sách phiếu nhập</Link><WarehousePageHeader eyebrow="Inbound wizard" title={currentId || 'Tạo phiếu nhập kho'} description="Lưu nháp bất cứ lúc nào; tồn kho chỉ tăng sau bước xác nhận cuối." /><ProgressStepper steps={STEPS} currentStep={step} />
    <div aria-live="polite">{message && <p className="rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-success-500">{message}</p>}{issues.length > 0 && <div className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-warning-500"><strong>Còn {issues.length} vấn đề cần xử lý trước khi xác nhận:</strong><ul className="mt-2 list-disc space-y-1 pl-5">{issues.map((issue) => <li key={issue}>{issue}</li>)}</ul></div>}</div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"><section className="rounded-md border border-surface-400 bg-white p-5">
      {step === 0 && <div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold">Nhà cung cấp<input value={supplier} onChange={(event) => setSupplier(event.target.value)} className="input-gaming mt-2 w-full" /></label><label className="text-sm font-semibold">Kho nhận<select value={warehouseName} onChange={(event) => setWarehouseName(event.target.value)} className="input-gaming mt-2 w-full"><option>Kho trung tâm TP.HCM</option><option>Kho Hà Nội</option></select></label><label className="text-sm font-semibold">Ngày nhập<input type="date" value={receiptDate} onChange={(event) => setReceiptDate(event.target.value)} className="input-gaming mt-2 w-full" /></label><label className="text-sm font-semibold">Mã hóa đơn/chứng từ<input value={invoiceCode} onChange={(event) => setInvoiceCode(event.target.value)} className="input-gaming mt-2 w-full" /></label><label className="text-sm font-semibold md:col-span-2">Ghi chú<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} className="input-gaming mt-2 w-full" /></label></div>}
      {step === 1 && <div className="space-y-5"><div><label className="text-sm font-semibold">Tìm Product hoặc SKU<input value={variantQuery} onChange={(event) => setVariantQuery(event.target.value)} className="input-gaming mt-2 w-full" placeholder="Tên sản phẩm hoặc SKU…" /></label><label className="mt-3 block text-sm font-semibold">Chọn đúng biến thể<select value={selectedVariantId} onChange={(event) => setSelectedVariantId(event.target.value)} className="input-gaming mt-2 w-full"><option value="">Chọn SKU đang hoạt động…</option>{store.products.filter((product) => product.status === 'ACTIVE' && activeVariants.some((variant) => variant.productId === product.id && matchingVariantIds.has(variant.id))).map((product) => <optgroup key={product.id} label={`${product.name} · ${buildCategoryBreadcrumb(store.categories, product.categoryId)}`}>{activeVariants.filter((variant) => variant.productId === product.id && matchingVariantIds.has(variant.id)).map((variant) => <option key={variant.id} value={variant.id}>{variant.sku} — {variant.optionValues.map((item) => item.value).join(' / ') || 'Mặc định'}</option>)}</optgroup>)}</select></label><button type="button" className="btn-primary mt-3" onClick={addVariant}>Thêm SKU</button></div>{lines.length === 0 ? <p className="text-sm text-text-600">Chưa có SKU trong phiếu.</p> : lines.map((line) => { const variant = store.variants.find((item) => item.id === line.variantId); const product = store.products.find((item) => item.id === variant?.productId); return <div key={line.id} className="flex items-center justify-between rounded-sm border border-surface-400 p-4"><div><p className="font-semibold">{product?.name}</p><p className="mt-1 font-mono text-xs">{variant?.sku} · {variant?.optionValues.map((item) => item.value).join(' / ')}</p></div><button type="button" aria-label={`Xóa ${variant?.sku}`} className="btn-outlined px-3" onClick={() => setLines((current) => current.filter((item) => item.id !== line.id))}><Trash2 className="h-4 w-4" /></button></div> })}</div>}
      {step === 2 && <div className="space-y-4">{lines.length === 0 ? <p className="text-sm text-text-600">Quay lại bước trước để thêm SKU.</p> : lines.map((line) => { const variant = store.variants.find((item) => item.id === line.variantId); const product = store.products.find((item) => item.id === variant?.productId); return <article key={line.id} className="rounded-sm border border-surface-400 p-4"><div className="flex flex-wrap justify-between gap-3"><div><p className="font-semibold">{product?.name}</p><p className="font-mono text-xs text-text-600">{variant?.sku}</p></div>{variant?.serialTracking && <StatusBadge label={line.serials.length === line.quantity ? 'Serial hợp lệ' : `Đã nhập ${line.serials.length}/${line.quantity}`} tone={line.serials.length === line.quantity ? 'success' : 'warning'} />}</div><div className="mt-4 grid gap-3 md:grid-cols-3"><label className="text-sm font-semibold">Số lượng<input type="number" min="1" step="1" value={line.quantity} onChange={(event) => setLines((current) => current.map((item) => item.id === line.id ? { ...item, quantity: Number(event.target.value) } : item))} className="input-gaming mt-2 w-full tabular-nums" /></label><label className="text-sm font-semibold">Giá nhập<input type="number" min="1" value={line.unitCost} onChange={(event) => setLines((current) => current.map((item) => item.id === line.id ? { ...item, unitCost: Number(event.target.value) } : item))} className="input-gaming mt-2 w-full tabular-nums" /></label><div><p className="text-sm font-semibold">Thành tiền</p><p className="mt-4 font-semibold tabular-nums">{formatCurrency(line.quantity * line.unitCost)}</p></div></div>{variant?.serialTracking && <button type="button" className="btn-outlined mt-4" onClick={() => setEditingSerialLineId(line.id)}><ScanLine className="h-4 w-4" /> Nhập / Quét serial</button>}</article>})}</div>}
      {step === 3 && <div className="space-y-5"><div className="grid gap-3 md:grid-cols-2"><p><span className="text-xs text-text-600">Nhà cung cấp</span><strong className="block">{supplier || 'Chưa chọn'}</strong></p><p><span className="text-xs text-text-600">Kho nhận</span><strong className="block">{warehouseName || 'Chưa chọn'}</strong></p><p><span className="text-xs text-text-600">Ngày nhập</span><strong className="block">{receiptDate || 'Chưa chọn'}</strong></p><p><span className="text-xs text-text-600">Chứng từ</span><strong className="block">{invoiceCode || 'Chưa nhập'}</strong></p></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-surface-200"><tr><th className="p-3">SKU</th><th className="p-3">Số lượng</th><th className="p-3">Giá nhập</th><th className="p-3">Serial</th></tr></thead><tbody>{lines.map((line) => { const variant = store.variants.find((item) => item.id === line.variantId); return <tr key={line.id} className="border-b border-surface-400"><td className="p-3 font-mono">{variant?.sku}</td><td className="p-3">{line.quantity}</td><td className="p-3">{formatCurrency(line.unitCost)}</td><td className="p-3">{variant?.serialTracking ? `${line.serials.length}/${line.quantity}` : '—'}</td></tr> })}</tbody></table></div><button type="button" className="btn-primary" onClick={requestConfirm}>Xác nhận phiếu nhập</button></div>}
    </section><aside className="h-fit rounded-md border border-surface-400 bg-white p-5 xl:sticky xl:top-24"><h2 className="font-heading font-semibold">Tóm tắt phiếu</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt>SKU</dt><dd className="font-semibold">{lines.length}</dd></div><div className="flex justify-between"><dt>Tổng số lượng</dt><dd className="font-semibold">{totalQuantity}</dd></div><div className="flex justify-between"><dt>Serial đăng ký</dt><dd className="font-semibold">{lines.reduce((sum, line) => sum + line.serials.length, 0)}</dd></div><div className="flex justify-between border-t border-surface-400 pt-3"><dt>Tổng giá trị</dt><dd className="font-semibold text-brand-500">{formatCurrency(calculateReceiptTotal(lines))}</dd></div></dl><button type="button" className="btn-outlined mt-5 w-full" onClick={saveDraft}><Save className="h-4 w-4" /> Lưu bản nháp</button></aside></div>
    <div className="flex justify-between"><button type="button" className="btn-outlined" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}><ArrowLeft className="h-4 w-4" /> Quay lại</button>{step < STEPS.length - 1 && <button type="button" className="btn-primary" onClick={() => setStep((current) => Math.min(STEPS.length - 1, current + 1))}>Tiếp tục <ArrowRight className="h-4 w-4" /></button>}</div>
    <ReceiptSerialDialog isOpen={Boolean(editingLine && editingVariant)} inventorySerials={store.serials} productName={editingProduct?.name ?? ''} sku={editingVariant?.sku ?? ''} quantity={editingLine?.quantity ?? 0} serials={editingLine?.serials ?? []} onCancel={() => setEditingSerialLineId(null)} onSave={(serialValues) => { if (editingLine) setLines((current) => current.map((line) => line.id === editingLine.id ? { ...line, serials: serialValues } : line)); setEditingSerialLineId(null) }} />
    <ConfirmDialog isOpen={confirmOpen} isConfirming={submitting} title="Xác nhận phiếu nhập" description={`Dữ liệu hợp lệ. Sau khi xác nhận, tồn kho sẽ tăng ${totalQuantity} sản phẩm, đăng ký ${lines.reduce((sum, line) => sum + line.serials.length, 0)} serial với tổng giá trị ${formatCurrency(calculateReceiptTotal(lines))}. Phiếu không thể chỉnh sửa trực tiếp.`} cancelLabel="Quay lại kiểm tra" confirmLabel={submitting ? 'Đang cập nhật…' : 'Xác nhận & cập nhật tồn kho'} onCancel={() => !submitting && setConfirmOpen(false)} onConfirm={confirm} />
  </div>
}
