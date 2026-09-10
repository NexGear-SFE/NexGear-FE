import { ArrowLeft, ArrowRight, Check, Minus, MoveDown, MoveUp, Plus, Save } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CategorySelect } from '@/components/warehouse/CategorySelect'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { ProgressStepper } from '@/components/warehouse/ProgressStepper'
import { WarehousePageHeader } from '@/components/warehouse/WarehousePageHeader'
import { VariantMatrixEditor, type VariantDraft } from '@/components/warehouse/VariantMatrixEditor'
import { ROUTES, warehouseProductDetailPath } from '@/constants/routes'
import { productSchema, type ProductFormValues } from '@/schemas/product.schema'
import { variantCollectionSchema } from '@/schemas/variant.schema'
import { useWarehouseStore } from '@/stores/warehouseStore'
import type { ProductSpecification } from '@/types/product.type'
import { buildCategoryBreadcrumb } from '@/utils/buildCategoryTree'
import { generateSkuPreview, normalizeSkuSegment } from '@/utils/generateSkuPreview'
import { findDuplicateSkus } from '@/utils/skuRules'

const steps = ['Thông tin cơ bản', 'Thông số', 'Biến thể & SKU', 'Xác nhận']
const specificationSuggestions = ['CPU', 'GPU', 'RAM', 'Storage', 'Màn hình', 'Switch', 'DPI', 'Chipset', 'VRAM']

const emptyProduct: ProductFormValues = { name: '', slug: '', productCode: '', modelCode: '', brand: '', brandCode: '', categoryId: '', shortDescription: '', warrantyMonths: 24, unit: 'Chiếc', origin: '', weightGrams: 0, dimensions: { lengthMm: 0, widthMm: 0, heightMm: 0 }, status: 'DRAFT' }

export function ProductWizardPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { categories, products, variants, saveProduct, logSkuAudit } = useWarehouseStore()
  const existing = products.find((product) => product.id === productId)
  const [step, setStep] = useState(0)
  const [product, setProduct] = useState<ProductFormValues>(() => existing ? { name: existing.name, slug: existing.slug, productCode: existing.productCode, modelCode: existing.modelCode, brand: existing.brand, brandCode: existing.brandCode, categoryId: existing.categoryId, shortDescription: existing.shortDescription, warrantyMonths: existing.warrantyMonths, unit: existing.unit, origin: existing.origin, weightGrams: existing.weightGrams, dimensions: existing.dimensions, status: existing.status } : emptyProduct)
  const [specifications, setSpecifications] = useState<ProductSpecification[]>(() => existing?.specifications ?? [{ key: '', value: '' }])
  const [variantDrafts, setVariantDrafts] = useState<VariantDraft[]>(() => {
    const current = variants.filter((variant) => variant.productId === productId).map(({ id: _id, productId: _productId, createdAt: _createdAt, updatedAt: _updatedAt, ...variant }) => variant)
    return current.length ? current : [{ sku: '', skuSource: 'AUTO', optionValues: [], barcode: '', gtin: '', serialTracking: false, reorderLevel: 0, status: 'ACTIVE', skuLocked: false }]
  })
  const [error, setError] = useState('')
  const [errorStep, setErrorStep] = useState<number | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)
  const formSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (isDirty) event.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [isDirty])

  const cleanSpecifications = specifications.filter((item) => item.key.trim() || item.value.trim())
  const effectiveVariants = useMemo(() => variantDrafts.map((variant) => ({ ...variant, sku: variant.sku || (variant.skuSource === 'AUTO' ? generateSkuPreview(product.brandCode, product.modelCode, variant.optionValues) : '') })), [product.brandCode, product.modelCode, variantDrafts])
  const categoryBreadcrumb = buildCategoryBreadcrumb(categories, product.categoryId)
  const updateProduct = <Key extends keyof ProductFormValues>(key: Key, value: ProductFormValues[Key]) => { setProduct((current) => ({ ...current, [key]: value })); setIsDirty(true); setError('') }

  function validateStep(index: number): boolean {
    setError('')
    setErrorStep(null)
    const fail = (message: string) => { setError(message); setErrorStep(index); return false }
    if (index === 0) {
      const result = productSchema.safeParse(product)
      if (!result.success) return fail(result.error.issues[0]?.message ?? 'Thông tin cơ bản chưa hợp lệ.')
    }
    if (index === 1) {
      const keys = cleanSpecifications.map((item) => item.key.trim().toLocaleLowerCase('vi'))
      if (cleanSpecifications.some((item) => !item.key.trim() || !item.value.trim())) return fail('Mỗi thông số cần đủ tên và giá trị.')
      if (new Set(keys).size !== keys.length) return fail('Tên thông số không được trùng trong cùng sản phẩm.')
    }
    if (index === 2) {
      if (!effectiveVariants.length) return fail('Sản phẩm cần ít nhất một biến thể.')
      const result = variantCollectionSchema.safeParse(effectiveVariants)
      if (!result.success) return fail(result.error.issues[0]?.message ?? 'Biến thể/SKU chưa hợp lệ.')
      const catalogSkus = variants.filter((item) => item.productId !== productId).map((item) => item.sku)
      if (findDuplicateSkus(effectiveVariants.map((variant) => variant.sku), catalogSkus).size) return fail('SKU phải duy nhất trong toàn catalog, kể cả variant inactive.')
    }
    return true
  }

  function nextStep() { if (validateStep(step)) setStep((current) => Math.min(current + 1, steps.length - 1)) }

  async function submit(status: ProductFormValues['status']) {
    if (![0, 1, 2].every(validateStep)) return
    setIsSubmitting(true)
    try {
      const id = saveProduct({ ...product, status, specifications: cleanSpecifications }, effectiveVariants, productId)
      setIsDirty(false)
      navigate(warehouseProductDetailPath(id), { replace: true })
    } finally { setIsSubmitting(false) }
  }

  function goToErrorStep() {
    if (errorStep === null) return
    setStep(errorStep)
    window.setTimeout(() => {
      formSectionRef.current?.querySelector<HTMLElement>('input, select, textarea, button')?.focus()
    })
  }

  return <div className="space-y-6">
    <WarehousePageHeader eyebrow="Product master" title={existing ? `Chỉnh sửa ${existing.name}` : 'Tạo sản phẩm'} description="Flow bốn bước giữ nguyên dữ liệu khi quay lại và chỉ cho tiếp tục khi bước hiện tại hợp lệ." actions={<button type="button" className="btn-outlined" onClick={() => isDirty ? setShowLeaveDialog(true) : navigate(ROUTES.warehouseProducts)}><ArrowLeft className="h-4 w-4" /> Danh sách</button>} />
    <div className="sticky top-20 z-10 rounded-md border border-surface-400 bg-white p-3 shadow-clay-sm"><ProgressStepper steps={steps} currentStep={step} errorStep={errorStep} /></div>
    <section ref={formSectionRef} className="card-gaming p-5 md:p-7">
      {step === 0 && <div className="grid gap-4 md:grid-cols-2"><Field label="Tên sản phẩm"><input value={product.name} onChange={(event) => { const previousSlug = normalizeSkuSegment(product.name).toLowerCase(); updateProduct('name', event.target.value); if (!product.slug || product.slug === previousSlug) setProduct((current) => ({ ...current, slug: normalizeSkuSegment(event.target.value).toLowerCase() })) }} className="input-gaming mt-2 w-full" /></Field><Field label="Product code"><input value={product.productCode} onChange={(event) => updateProduct('productCode', normalizeSkuSegment(event.target.value))} className="input-gaming mt-2 w-full" /></Field><Field label="Model code"><input value={product.modelCode} onChange={(event) => updateProduct('modelCode', event.target.value)} className="input-gaming mt-2 w-full" /></Field><Field label="Slug"><input value={product.slug} onChange={(event) => updateProduct('slug', event.target.value)} className="input-gaming mt-2 w-full" /></Field><Field label="Thương hiệu"><input value={product.brand} onChange={(event) => updateProduct('brand', event.target.value)} className="input-gaming mt-2 w-full" list="brand-list" /><datalist id="brand-list"><option>ASUS</option><option>MSI</option><option>Logitech</option><option>Corsair</option><option>Samsung</option></datalist></Field><Field label="Brand code"><input value={product.brandCode} onChange={(event) => updateProduct('brandCode', normalizeSkuSegment(event.target.value).replaceAll('-', ''))} className="input-gaming mt-2 w-full" /></Field><CategorySelect categories={categories} value={product.categoryId} onChange={(value) => updateProduct('categoryId', value)} /><Field label="Đơn vị"><input value={product.unit} onChange={(event) => updateProduct('unit', event.target.value)} className="input-gaming mt-2 w-full" /></Field><Field label="Xuất xứ"><input value={product.origin} onChange={(event) => updateProduct('origin', event.target.value)} className="input-gaming mt-2 w-full" /></Field><Field label="Bảo hành (tháng)"><input type="number" min="0" value={product.warrantyMonths} onChange={(event) => updateProduct('warrantyMonths', Number(event.target.value))} className="input-gaming mt-2 w-full" /></Field><Field label="Khối lượng (gram)"><input type="number" min="0" value={product.weightGrams} onChange={(event) => updateProduct('weightGrams', Number(event.target.value))} className="input-gaming mt-2 w-full" /></Field><Field label="Trạng thái"><select value={product.status} onChange={(event) => updateProduct('status', event.target.value as ProductFormValues['status'])} className="input-gaming mt-2 w-full"><option value="DRAFT">Draft</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></Field><Field label="Kích thước D × R × C (mm)"><div className="mt-2 grid grid-cols-3 gap-2">{(['lengthMm', 'widthMm', 'heightMm'] as const).map((key) => <input key={key} aria-label={key} type="number" min="0" value={product.dimensions[key]} onChange={(event) => updateProduct('dimensions', { ...product.dimensions, [key]: Number(event.target.value) })} className="input-gaming w-full" />)}</div></Field><Field label="Mô tả vận hành" wide><textarea value={product.shortDescription} onChange={(event) => updateProduct('shortDescription', event.target.value)} rows={4} className="input-gaming mt-2 w-full" /></Field></div>}
      {step === 1 && <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]"><div><div className="mb-4 flex items-center justify-between"><h2 className="font-heading text-lg font-semibold">Thông số key/value</h2><button type="button" className="btn-outlined" onClick={() => setSpecifications((current) => [...current, { key: '', value: '' }])}><Plus className="h-4 w-4" /> Thêm dòng</button></div><datalist id="spec-suggestions">{specificationSuggestions.map((item) => <option key={item}>{item}</option>)}</datalist><div className="space-y-3">{specifications.map((spec, index) => <div key={index} className="grid gap-2 rounded-sm border border-surface-400 p-3 sm:grid-cols-[1fr_1.5fr_auto]"><input aria-label={`Tên thông số ${index + 1}`} list="spec-suggestions" value={spec.key} onChange={(event) => { setSpecifications((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, key: event.target.value } : item)); setIsDirty(true) }} className="input-gaming" placeholder="CPU, GPU…" /><input aria-label={`Giá trị thông số ${index + 1}`} value={spec.value} onChange={(event) => { setSpecifications((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item)); setIsDirty(true) }} className="input-gaming" placeholder="Giá trị" /><div className="flex"><IconButton label="Lên" onClick={() => setSpecifications((current) => moveItem(current, index, -1))}><MoveUp /></IconButton><IconButton label="Xuống" onClick={() => setSpecifications((current) => moveItem(current, index, 1))}><MoveDown /></IconButton><IconButton label="Xóa" onClick={() => setSpecifications((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Minus /></IconButton></div></div>)}</div></div><div><h2 className="mb-4 font-heading text-lg font-semibold">Preview</h2><dl className="divide-y divide-surface-400 rounded-md border border-surface-400">{cleanSpecifications.map((spec) => <div key={spec.key} className="grid grid-cols-2 gap-3 p-3 text-sm"><dt className="font-semibold">{spec.key}</dt><dd>{spec.value}</dd></div>)}{!cleanSpecifications.length && <p className="p-6 text-center text-sm text-text-600">Chưa có thông số.</p>}</dl></div></div>}
      {step === 2 && <VariantMatrixEditor brandCode={product.brandCode} modelCode={product.modelCode} variants={variantDrafts} existingSkus={variants.filter((variant) => variant.productId !== productId).map((variant) => variant.sku)} onAudit={(action, sku) => logSkuAudit(action, sku)} onChange={(next) => { setVariantDrafts(next); setIsDirty(true) }} />}
      {step === 3 && <div className="grid gap-6 lg:grid-cols-2"><Summary title="Product master" rows={[['Tên', product.name], ['Product code', product.productCode], ['Model', product.modelCode], ['Brand', product.brand], ['Danh mục', categoryBreadcrumb], ['Trạng thái', product.status], ['Bảo hành', `${product.warrantyMonths} tháng`]]} /><Summary title="Biến thể / SKU" rows={effectiveVariants.map((variant) => [variant.sku, `${variant.serialTracking ? 'Có' : 'Không'} serial tracking`])} /><Summary title="Thông số kỹ thuật" rows={cleanSpecifications.map((spec) => [spec.key, spec.value])} /><div className="rounded-md border border-warning-500 bg-amber-50 p-4 text-sm"><strong>Kiểm tra trước khi lưu</strong><p className="mt-2 text-text-600">Product cần category hợp lệ, specification không trùng và tối thiểu một SKU duy nhất.</p></div></div>}
      {error && <div role="alert" className="mt-5 rounded-sm bg-error-50 p-3 text-sm text-error-700"><strong>Không thể tiếp tục</strong><p className="mt-1">{error}</p>{errorStep !== null && errorStep !== step && <button type="button" className="mt-2 font-semibold underline" onClick={goToErrorStep}>Đi tới bước {errorStep + 1}: {steps[errorStep]}</button>}</div>}
      <div className="mt-6 flex flex-wrap justify-between gap-3"><button type="button" disabled={step === 0} className="btn-outlined disabled:opacity-50" onClick={() => { setStep((current) => Math.max(0, current - 1)); setError('') }}><ArrowLeft className="h-4 w-4" /> Quay lại</button><div className="flex gap-2">{step === 3 && <><button type="button" disabled={isSubmitting} className="btn-outlined" onClick={() => submit('DRAFT')}><Save className="h-4 w-4" /> Lưu nháp</button><button type="button" disabled={isSubmitting} className="btn-primary" onClick={() => submit('ACTIVE')}><Check className="h-4 w-4" /> {isSubmitting ? 'Đang lưu…' : 'Lưu và kích hoạt'}</button></>}{step < 3 && <button type="button" className="btn-primary" onClick={nextStep}>Tiếp tục <ArrowRight className="h-4 w-4" /></button>}</div></div>
    </section>
    <ConfirmDialog isOpen={showLeaveDialog} title="Rời khi chưa lưu?" description="Các thay đổi trong flow sản phẩm sẽ bị mất." confirmLabel="Rời trang" onCancel={() => setShowLeaveDialog(false)} onConfirm={() => navigate(ROUTES.warehouseProducts)} />
  </div>
}

function Field({ children, label, wide = false }: { children: ReactNode; label: string; wide?: boolean }) { return <label className={wide ? 'text-sm font-medium md:col-span-2' : 'text-sm font-medium'}>{label}{children}</label> }
function IconButton({ children, label, onClick }: { children: ReactElement; label: string; onClick: () => void }) { return <button type="button" aria-label={label} onClick={onClick} className="flex h-11 w-11 items-center justify-center rounded-sm hover:bg-surface-200 [&_svg]:h-4 [&_svg]:w-4">{children}</button> }
function moveItem<T>(items: T[], index: number, delta: number): T[] { const target = index + delta; if (target < 0 || target >= items.length) return items; const next = [...items]; [next[index], next[target]] = [next[target], next[index]]; return next }
function Summary({ rows, title }: { rows: string[][]; title: string }) { return <section className="rounded-md border border-surface-400"><h2 className="border-b border-surface-400 bg-surface-200 p-3 font-heading text-base font-semibold">{title}</h2><dl className="divide-y divide-surface-400">{rows.map(([label, value], index) => <div key={`${label}-${index}`} className="grid grid-cols-2 gap-3 p-3 text-sm"><dt className="font-semibold">{label}</dt><dd>{value}</dd></div>)}</dl></section> }
