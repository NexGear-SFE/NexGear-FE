import { Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import type { ProductVariant, VariantOption, VariantOptionValue } from '@/types/variant.type'
import { formatCurrency } from '@/utils/formatCurrency'
import { generateSkuPreview, normalizeSkuInput, normalizeSkuSegment } from '@/utils/generateSkuPreview'
import { findDuplicateSkus } from '@/utils/skuRules'

export type VariantDraft = Omit<ProductVariant, 'id' | 'productId' | 'createdAt' | 'updatedAt'>

type Props = {
  brandCode: string
  existingSkus?: string[]
  modelCode: string
  onAudit?: (action: 'MANUAL_OVERRIDE' | 'REGENERATE' | 'DEACTIVATE', sku: string) => void
  onChange: (variants: VariantDraft[]) => void
  variants: VariantDraft[]
}

type PendingDelete = { index: number; label: string } | null

function combinationKey(values: VariantOptionValue[]): string {
  return values.map((item) => `${item.optionCode ?? item.option}:${item.code}`).sort().join('|')
}

function deriveOptions(variants: VariantDraft[]): VariantOption[] {
  const byOption = new Map<string, { name: string; code: string; values: Map<string, string> }>()
  variants.forEach((variant) => variant.optionValues.forEach((item) => {
    const optionCode = item.optionCode ?? normalizeSkuSegment(item.option)
    const option = byOption.get(optionCode) ?? { name: item.option, code: optionCode, values: new Map<string, string>() }
    option.values.set(item.code, item.value)
    byOption.set(optionCode, option)
  }))
  return [...byOption.values()].map((option) => ({ ...option, values: [...option.values].map(([code, value]) => ({ code, value })) }))
}

function createDefaultVariant(brandCode: string, modelCode: string, serialTracking: boolean): VariantDraft {
  return {
    sku: generateSkuPreview(brandCode, modelCode, []), skuSource: 'AUTO', optionValues: [], barcode: '', gtin: '',
    purchasePrice: 0, serialTracking, reorderLevel: 0, status: 'ACTIVE', skuLocked: false,
  }
}

export function VariantMatrixEditor({ brandCode, existingSkus = [], modelCode, onAudit, onChange, variants }: Props) {
  const initialOptions = useMemo(() => deriveOptions(variants), [])
  const [hasConfigurations, setHasConfigurations] = useState(initialOptions.length > 0)
  const [options, setOptions] = useState<VariantOption[]>(initialOptions)
  const [selection, setSelection] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null)
  const serialTracking = variants[0]?.serialTracking ?? false
  const lockedVariants = variants.filter((variant) => variant.skuLocked)
  const duplicateSkus = findDuplicateSkus(variants.map((variant) => variant.sku), existingSkus)
  const optionNames = options.map((option) => option.name.trim().toLocaleLowerCase('vi'))
  const duplicateOptionNames = new Set(optionNames).size !== optionNames.length
  const incompleteOptions = options.some((option) => !option.name.trim() || option.values.length === 0 || option.values.some((value) => !value.value.trim()))

  function updateOption(index: number, patch: Partial<VariantOption>) {
    setOptions((current) => current.map((option, itemIndex) => itemIndex === index ? { ...option, ...patch } : option))
    setMessage('')
  }

  function updateTracking(nextValue: boolean) {
    onChange(variants.map((variant) => variant.skuLocked ? variant : { ...variant, serialTracking: nextValue }))
  }

  function selectConfigurationMode(nextValue: boolean) {
    if (lockedVariants.length) return
    setHasConfigurations(nextValue)
    setMessage('')
    if (nextValue) {
      setOptions((current) => current.length ? current : [{ name: '', code: '', values: [{ value: '', code: '' }] }])
      onChange([])
      return
    }
    setOptions([])
    setSelection({})
    onChange([createDefaultVariant(brandCode, modelCode, serialTracking)])
  }

  function addConfiguration() {
    if (!options.length || incompleteOptions || duplicateOptionNames) {
      setMessage('Hãy nhập đủ tên thuộc tính và các giá trị trước khi thêm cấu hình.')
      return
    }
    const optionValues = options.map<VariantOptionValue>((option) => {
      const optionCode = option.code || normalizeSkuSegment(option.name)
      const selectedValue = option.values.find((value) => value.code === selection[optionCode])
      return { option: option.name.trim(), optionCode, value: selectedValue?.value.trim() ?? '', code: selectedValue?.code ?? '' }
    })
    if (optionValues.some((value) => !value.code)) {
      setMessage('Mỗi thuộc tính đều phải được chọn khi tạo cấu hình.')
      return
    }
    const key = combinationKey(optionValues)
    if (variants.some((variant) => combinationKey(variant.optionValues) === key)) {
      setMessage('Cấu hình này đã có trong danh sách.')
      return
    }
    onChange([...variants, { ...createDefaultVariant(brandCode, modelCode, serialTracking), sku: generateSkuPreview(brandCode, modelCode, optionValues), optionValues }])
    setSelection({})
    setMessage('Đã thêm cấu hình. Hãy nhập giá nhập và kiểm tra SKU bên dưới.')
  }

  function updateVariant(index: number, patch: Partial<VariantDraft>) {
    onChange(variants.map((variant, itemIndex) => itemIndex === index ? { ...variant, ...patch } : variant))
  }

  function confirmDelete() {
    if (!pendingDelete) return
    onChange(variants.filter((_, index) => index !== pendingDelete.index))
    setPendingDelete(null)
  }

  return <div className="space-y-5">
    <fieldset className="rounded-md border border-surface-400 p-4">
      <legend className="px-1 font-heading text-lg font-semibold">Sản phẩm có nhiều cấu hình không?</legend>
      <p className="mb-4 text-sm text-text-600">Chỉ tạo những cấu hình thực tế đang nhập và bán. Hệ thống không tự sinh tổ hợp.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <ModeCard checked={!hasConfigurations} disabled={lockedVariants.length > 0} name="configuration-mode" title="Không, chỉ có một SKU" description="Phù hợp sản phẩm không phân chia CPU, màu hoặc dung lượng." onChange={() => selectConfigurationMode(false)} />
        <ModeCard checked={hasConfigurations} disabled={lockedVariants.length > 0} name="configuration-mode" title="Có, tự ghép từng cấu hình" description="Ví dụ CPU + GPU + RAM + dung lượng." onChange={() => selectConfigurationMode(true)} />
      </div>
      {lockedVariants.length > 0 && <p className="mt-3 text-xs font-medium text-warning-700">Không thể đổi loại sản phẩm vì đã có SKU phát sinh giao dịch kho.</p>}
    </fieldset>

    {hasConfigurations && <section className="rounded-md border border-surface-400 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-heading text-lg font-semibold">1. Khai báo thuộc tính cấu hình</h2><p className="mt-1 text-sm text-text-600">Mọi thuộc tính ở đây đều bắt buộc phải chọn khi thêm SKU.</p></div><button type="button" className="btn-outlined" onClick={() => setOptions((current) => [...current, { name: '', code: '', values: [{ value: '', code: '' }] }])}><Plus className="h-4 w-4" /> Thêm thuộc tính</button></div>
      <div className="mt-4 space-y-4">{options.map((option, optionIndex) => {
        const optionInUse = variants.some((variant) => variant.optionValues.some((value) => (value.optionCode ?? normalizeSkuSegment(value.option)) === option.code))
        return <div key={`option-${optionIndex}`} className="rounded-sm border border-surface-400 bg-surface-100 p-4">
          <div className="flex gap-2"><label className="min-w-0 flex-1 text-sm font-medium">Tên thuộc tính<input aria-label={`Tên thuộc tính ${optionIndex + 1}`} value={option.name} onChange={(event) => updateOption(optionIndex, { name: event.target.value, code: normalizeSkuSegment(event.target.value) })} className="input-gaming mt-2 w-full" placeholder="CPU, GPU, RAM, dung lượng…" /></label><DeleteButton label={`Xóa thuộc tính ${optionIndex + 1}`} disabled={optionInUse} onClick={() => setOptions((current) => current.filter((_, index) => index !== optionIndex))} /></div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">{option.values.map((value, valueIndex) => {
            const valueInUse = variants.some((variant) => variant.optionValues.some((item) => item.optionCode === option.code && item.code === value.code))
            return <div key={`value-${valueIndex}`} className="flex gap-2"><input aria-label={`Giá trị ${optionIndex + 1}-${valueIndex + 1}`} value={value.value} onChange={(event) => updateOption(optionIndex, { values: option.values.map((item, index) => index === valueIndex ? { value: event.target.value, code: normalizeSkuSegment(event.target.value) } : item) })} className="input-gaming min-w-0 flex-1" placeholder="Nhập một giá trị…" /><DeleteButton label={`Xóa giá trị ${optionIndex + 1}-${valueIndex + 1}`} disabled={valueInUse || option.values.length === 1} onClick={() => updateOption(optionIndex, { values: option.values.filter((_, index) => index !== valueIndex) })} /></div>
          })}</div>
          <button type="button" className="mt-2 min-h-11 text-sm font-semibold text-brand-500 hover:underline" onClick={() => updateOption(optionIndex, { values: [...option.values, { value: '', code: '' }] })}>+ Thêm giá trị</button>
        </div>
      })}</div>
      {duplicateOptionNames && <p role="alert" className="mt-3 text-sm text-error-700">Tên thuộc tính không được trùng.</p>}
    </section>}

    {hasConfigurations && <section className="rounded-md border border-surface-400 p-4">
      <h2 className="font-heading text-lg font-semibold">2. Tự ghép cấu hình bán được</h2><p className="mt-1 text-sm text-text-600">Chọn đủ một giá trị ở mỗi thuộc tính rồi thêm vào danh sách.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{options.map((option) => <label key={option.code} className="text-sm font-medium">{option.name || 'Thuộc tính chưa đặt tên'}<select aria-label={`Chọn ${option.name || 'thuộc tính'}`} value={selection[option.code ?? ''] ?? ''} onChange={(event) => setSelection((current) => ({ ...current, [option.code ?? '']: event.target.value }))} className="input-gaming mt-2 w-full"><option value="">Chọn giá trị</option>{option.values.filter((value) => value.value.trim()).map((value) => <option key={value.code} value={value.code}>{value.value}</option>)}</select></label>)}</div>
      <button type="button" disabled={!options.length || incompleteOptions || duplicateOptionNames} className="btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-40" onClick={addConfiguration}><Plus className="h-4 w-4" /> Thêm cấu hình</button>
      {message && <p aria-live="polite" className={`mt-3 rounded-sm border p-3 text-sm ${message.startsWith('Đã thêm') ? 'border-info-200 bg-info-50 text-info-700' : 'border-error-200 bg-error-50 text-error-700'}`}>{message}</p>}
    </section>}

    <fieldset className="rounded-md border border-surface-400 p-4">
      <legend className="px-1 font-heading text-lg font-semibold">Cách quản lý tồn kho</legend><p className="mb-4 text-sm text-text-600">Áp dụng chung cho các SKU chưa phát sinh giao dịch.</p>
      <div className="grid gap-3 md:grid-cols-2"><ModeCard checked={!serialTracking} name="tracking-mode" title="Theo số lượng" description="Dành cho phụ kiện hoặc hàng hóa đồng nhất." onChange={() => updateTracking(false)} /><ModeCard checked={serialTracking} name="tracking-mode" title="Theo từng serial" description="Khi nhập kho phải khai báo đủ serial đúng với số lượng." onChange={() => updateTracking(true)} /></div>
    </fieldset>

    <section className="rounded-md border border-surface-400 bg-white">
      <div className="border-b border-surface-400 p-4"><h2 className="font-heading text-lg font-semibold">{hasConfigurations ? '3. Danh sách cấu hình' : 'Thông tin SKU'}</h2><p className="mt-1 text-sm text-text-600">{variants.length} SKU · Giá nhập được lưu theo từng SKU.</p></div>
      {!variants.length && <p className="p-8 text-center text-sm text-text-600">Chưa có cấu hình. Hãy chọn thuộc tính ở trên để thêm.</p>}
      <div className="divide-y divide-surface-400">{variants.map((variant, index) => <VariantRow key={`${combinationKey(variant.optionValues)}-${index}`} variant={variant} index={index} hasConfigurations={hasConfigurations} collision={duplicateSkus.has(variant.sku)} onUpdate={(patch) => updateVariant(index, patch)} onAudit={onAudit} onDelete={() => setPendingDelete({ index, label: variant.optionValues.map((item) => `${item.option}: ${item.value}`).join(' · ') })} />)}</div>
    </section>
    <ConfirmDialog isOpen={Boolean(pendingDelete)} title="Xóa cấu hình này?" description={pendingDelete ? `${pendingDelete.label} sẽ bị xóa khỏi danh sách SKU đang tạo.` : ''} confirmLabel="Xóa cấu hình" onCancel={() => setPendingDelete(null)} onConfirm={confirmDelete} />
  </div>
}

function ModeCard({ checked, description, disabled = false, name, onChange, title }: { checked: boolean; description: string; disabled?: boolean; name: string; onChange: () => void; title: string }) {
  return <label className={`flex min-h-20 cursor-pointer gap-3 rounded-sm border p-4 ${checked ? 'border-brand-500 bg-brand-50' : 'border-surface-400 bg-white'} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}><input type="radio" name={name} checked={checked} disabled={disabled} onChange={onChange} className="mt-0.5 h-5 w-5 accent-brand-500" /><span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs text-text-600">{description}</span></span></label>
}

function DeleteButton({ disabled, label, onClick }: { disabled: boolean; label: string; onClick: () => void }) {
  return <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="mt-7 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-error-700 hover:bg-error-50 disabled:cursor-not-allowed disabled:text-text-600 disabled:opacity-40"><Trash2 className="h-4 w-4" /></button>
}

function VariantRow({ collision, hasConfigurations, index, onAudit, onDelete, onUpdate, variant }: { collision: boolean; hasConfigurations: boolean; index: number; onAudit?: Props['onAudit']; onDelete: () => void; onUpdate: (patch: Partial<VariantDraft>) => void; variant: VariantDraft }) {
  const label = variant.optionValues.map((item) => `${item.option}: ${item.value}`).join(' · ') || 'Cấu hình mặc định'
  return <article className="grid gap-4 p-4 xl:grid-cols-[minmax(220px,1.2fr)_minmax(200px,1fr)_180px_160px_auto] xl:items-start">
    <div><strong className="text-sm">{label}</strong><span className="mt-2 block"><StatusBadge label={variant.serialTracking ? 'Theo serial' : 'Theo số lượng'} tone="info" /></span>{variant.skuLocked && <p className="mt-2 text-xs font-semibold text-warning-700">Đã khóa do có giao dịch kho</p>}</div>
    <label className="text-sm font-medium">SKU<input aria-label={`SKU ${index + 1}`} disabled={variant.skuLocked} value={variant.sku} onChange={(event) => { const sku = normalizeSkuInput(event.target.value); onUpdate({ sku, skuSource: 'MANUAL' }); onAudit?.('MANUAL_OVERRIDE', sku) }} onBlur={(event) => onUpdate({ sku: normalizeSkuSegment(event.target.value) })} className="input-gaming mt-2 w-full font-mono disabled:bg-surface-200" />{collision && <span className="mt-1 block text-xs text-error-700">SKU đã tồn tại.</span>}</label>
    <label className="text-sm font-medium">Giá nhập<input aria-label={`Giá nhập ${index + 1}`} type="number" min="1" step="1000" value={variant.purchasePrice || ''} onChange={(event) => onUpdate({ purchasePrice: Number(event.target.value) })} className="input-gaming mt-2 w-full tabular-nums" placeholder="0" /><span className="mt-1 block text-xs text-text-600">{variant.purchasePrice > 0 ? formatCurrency(variant.purchasePrice) : 'Bắt buộc'}</span></label>
    <label className="text-sm font-medium">Sắp hết khi còn<input aria-label={`Ngưỡng sắp hết ${index + 1}`} type="number" min="0" step="1" value={variant.reorderLevel} onChange={(event) => onUpdate({ reorderLevel: Math.max(0, Number(event.target.value)) })} className="input-gaming mt-2 w-full tabular-nums" /></label>
    <div className="flex justify-end">{hasConfigurations && <button type="button" aria-label={`Xóa cấu hình ${index + 1}`} disabled={variant.skuLocked} onClick={onDelete} className="flex h-11 w-11 items-center justify-center rounded-sm border border-error-200 text-error-700 hover:bg-error-50 disabled:cursor-not-allowed disabled:opacity-40"><Trash2 className="h-4 w-4" /></button>}</div>
    <details className="xl:col-span-5"><summary className="cursor-pointer py-2 text-sm font-semibold text-text-600">Thông tin nâng cao</summary><div className="mt-2 grid gap-3 rounded-sm bg-surface-100 p-4 sm:grid-cols-3"><label className="text-sm font-medium">Mã vạch<input value={variant.barcode ?? ''} onChange={(event) => onUpdate({ barcode: event.target.value })} className="input-gaming mt-2 w-full" /></label><label className="text-sm font-medium">GTIN<input value={variant.gtin ?? ''} onChange={(event) => onUpdate({ gtin: event.target.value })} className="input-gaming mt-2 w-full" /></label><label className="text-sm font-medium">Trạng thái<select value={variant.status} onChange={(event) => { const status = event.target.value as VariantDraft['status']; onUpdate({ status }); if (status === 'INACTIVE') onAudit?.('DEACTIVATE', variant.sku) }} className="input-gaming mt-2 w-full"><option value="ACTIVE">Đang dùng</option><option value="INACTIVE">Ngừng dùng</option></select></label></div></details>
  </article>
}
