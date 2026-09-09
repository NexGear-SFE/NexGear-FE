import { AlertTriangle, Minus, MoveDown, MoveUp, Plus, RefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import type { ProductVariant } from '@/types/product.type'
import { generateSkuPreview, normalizeSkuInput, normalizeSkuSegment } from '@/utils/generateSkuPreview'
import { generateVariantCombinations, type VariantOptionInput } from '@/utils/generateVariantCombinations'
import { findDuplicateSkus } from '@/utils/skuRules'

export type VariantDraft = Omit<ProductVariant, 'id' | 'productId' | 'createdAt' | 'updatedAt'>

type VariantMatrixEditorProps = {
  brandCode: string
  existingSkus?: string[]
  modelCode: string
  onAudit?: (action: 'MANUAL_OVERRIDE' | 'REGENERATE' | 'DEACTIVATE', sku: string) => void
  onChange: (variants: VariantDraft[]) => void
  variants: VariantDraft[]
}

type PendingAction =
  | { type: 'options'; nextOptions: VariantOptionInput[]; description: string }
  | { type: 'regenerate-all'; description: string }
  | null

const MATRIX_WARNING_THRESHOLD = 50

function combinationKey(values: VariantDraft['optionValues']): string {
  return values.map((item) => `${item.optionCode ?? item.option}:${item.code}`).sort().join('|')
}

function deriveOptions(variants: VariantDraft[]): VariantOptionInput[] {
  const byOption = new Map<string, { name: string; code: string; values: Map<string, string> }>()
  variants.forEach((variant) => variant.optionValues.forEach((item) => {
    const optionCode = item.optionCode ?? normalizeSkuSegment(item.option)
    const option = byOption.get(optionCode) ?? { name: item.option, code: optionCode, values: new Map<string, string>() }
    option.values.set(item.code, item.value)
    byOption.set(optionCode, option)
  }))
  return [...byOption.values()].map((option) => ({ ...option, values: [...option.values].map(([code, value]) => ({ code, value })) }))
}

export function VariantMatrixEditor({ brandCode, existingSkus = [], modelCode, onAudit, onChange, variants }: VariantMatrixEditorProps) {
  const [options, setOptions] = useState<VariantOptionInput[]>(() => deriveOptions(variants))
  const [pending, setPending] = useState<PendingAction>(null)
  const combinations = useMemo(() => generateVariantCombinations(options), [options])
  const duplicateOptionCode = new Set(options.map((option) => normalizeSkuSegment(option.code ?? ''))).size !== options.length
  const duplicateOptionName = new Set(options.map((option) => option.name.trim().toLocaleLowerCase('vi'))).size !== options.length
  const duplicateValue = options.some((option) => {
    const codes = option.values.map((value) => normalizeSkuSegment(value.code))
    const names = option.values.map((value) => value.value.trim().toLocaleLowerCase('vi'))
    return new Set(codes).size !== codes.length || new Set(names).size !== names.length
  })
  const hasIncompleteOption = options.some((option) => !option.name.trim() || !option.code?.trim() || option.values.length === 0 || option.values.some((value) => !value.value.trim() || !value.code.trim()))
  const duplicateSkus = findDuplicateSkus(variants.map((variant) => variant.sku || (variant.skuSource === 'AUTO' ? generateSkuPreview(brandCode, modelCode, variant.optionValues) : '')), existingSkus)

  function applyOptions(nextOptions: VariantOptionInput[]) {
    const previousRows = new Map(variants.map((variant) => [combinationKey(variant.optionValues), variant]))
    const nextCombinations = generateVariantCombinations(nextOptions)
    const source = nextOptions.length === 0 ? [[]] : nextCombinations
    const nextVariants = source.map<VariantDraft>((values) => {
      const previous = previousRows.get(combinationKey(values))
      if (!previous) return { sku: generateSkuPreview(brandCode, modelCode, values), skuSource: 'AUTO', optionValues: values, barcode: '', gtin: '', serialTracking: false, reorderLevel: 0, status: 'ACTIVE', skuLocked: false }
      return { ...previous, optionValues: values, sku: previous.skuSource === 'AUTO' && !previous.skuLocked ? generateSkuPreview(brandCode, modelCode, values) : previous.sku }
    })
    setOptions(nextOptions)
    onChange(nextVariants)
  }

  function changeOption(index: number, patch: Partial<VariantOptionInput>) {
    setOptions((current) => current.map((option, itemIndex) => itemIndex === index ? { ...option, ...patch } : option))
  }

  function moveOption(index: number, delta: number) {
    const targetIndex = index + delta
    if (targetIndex < 0 || targetIndex >= options.length) return
    const next = [...options]
    ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
    setPending({ type: 'options', nextOptions: next, description: 'Đổi thứ tự option sẽ đổi thứ tự segment của các SKU tự động.' })
  }

  function updateVariant(index: number, patch: Partial<VariantDraft>) {
    onChange(variants.map((variant, itemIndex) => itemIndex === index ? { ...variant, ...patch } : variant))
  }

  function regenerateRow(index: number) {
    const variant = variants[index]
    if (!variant || variant.skuLocked) return
    const sku = generateSkuPreview(brandCode, modelCode, variant.optionValues)
    updateVariant(index, { sku, skuSource: 'AUTO' })
    onAudit?.('REGENERATE', sku)
  }

  function regenerateAll() {
    onChange(variants.map((variant) => variant.skuLocked ? variant : { ...variant, sku: generateSkuPreview(brandCode, modelCode, variant.optionValues), skuSource: 'AUTO' }))
    variants.filter((variant) => !variant.skuLocked).forEach((variant) => onAudit?.('REGENERATE', variant.sku))
  }

  function confirmPending() {
    if (pending?.type === 'options') applyOptions(pending.nextOptions)
    if (pending?.type === 'regenerate-all') regenerateAll()
    setPending(null)
  }

  return <div className="space-y-5">
    <section className="rounded-md border border-surface-400 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-heading text-lg font-semibold">Option editor</h2><p className="text-sm text-text-600">Display name và stable code được lưu riêng; thứ tự option quyết định thứ tự SKU.</p></div><button type="button" className="btn-outlined" onClick={() => setOptions((current) => [...current, { name: '', code: '', values: [{ value: '', code: '' }] }])}><Plus className="h-4 w-4" /> Thêm option</button></div>
      <div className="mt-4 space-y-3">{options.map((option, optionIndex) => <div key={`option-${optionIndex}`} className="rounded-sm bg-surface-200 p-3">
        <div className="grid gap-2 md:grid-cols-[1fr_140px_auto]"><input aria-label={`Tên option ${optionIndex + 1}`} value={option.name} onChange={(event) => changeOption(optionIndex, { name: event.target.value })} className="input-gaming" placeholder="CPU, GPU, RAM, Storage, Color, Switch…" /><input aria-label={`Code option ${optionIndex + 1}`} value={option.code ?? ''} onChange={(event) => changeOption(optionIndex, { code: normalizeSkuSegment(event.target.value) })} className="input-gaming font-mono" placeholder="CPU" /><div className="flex"><SmallButton label="Đưa option lên" onClick={() => moveOption(optionIndex, -1)}><MoveUp /></SmallButton><SmallButton label="Đưa option xuống" onClick={() => moveOption(optionIndex, 1)}><MoveDown /></SmallButton><SmallButton label="Xóa option" onClick={() => setPending({ type: 'options', nextOptions: options.filter((_, index) => index !== optionIndex), description: `Xóa option ${option.name || optionIndex + 1} sẽ loại các combination liên quan.` })}><Minus /></SmallButton></div></div>
        <div className="mt-3 space-y-2">{option.values.map((value, valueIndex) => <div key={`value-${valueIndex}`} className="grid grid-cols-[1fr_140px_auto] gap-2"><input aria-label={`Giá trị ${optionIndex + 1}-${valueIndex + 1}`} value={value.value} onChange={(event) => changeOption(optionIndex, { values: option.values.map((item, index) => index === valueIndex ? { ...item, value: event.target.value } : item) })} className="input-gaming" placeholder="Display value" /><input aria-label={`Code ${optionIndex + 1}-${valueIndex + 1}`} value={value.code} onChange={(event) => changeOption(optionIndex, { values: option.values.map((item, index) => index === valueIndex ? { ...item, code: normalizeSkuSegment(event.target.value) } : item) })} className="input-gaming font-mono" placeholder="CODE" /><SmallButton label="Xóa giá trị" onClick={() => setPending({ type: 'options', nextOptions: options.map((item, index) => index === optionIndex ? { ...item, values: item.values.filter((_, childIndex) => childIndex !== valueIndex) } : item), description: `Xóa ${value.value || 'giá trị'} sẽ loại các combination liên quan.` })}><Minus /></SmallButton></div>)}</div>
        <button type="button" className="mt-2 text-xs font-semibold text-brand-500" onClick={() => changeOption(optionIndex, { values: [...option.values, { value: '', code: '' }] })}>+ Thêm value</button>
      </div>)}</div>
      {(duplicateOptionCode || duplicateOptionName || duplicateValue) && <p role="alert" className="mt-3 text-sm text-error-700">Option name/code và value name/code phải duy nhất trong phạm vi sản phẩm.</p>}
      {combinations.length > MATRIX_WARNING_THRESHOLD && <p className="mt-3 flex gap-2 rounded-sm bg-amber-50 p-3 text-sm text-warning-500"><AlertTriangle className="h-5 w-5" /> Ma trận vượt {MATRIX_WARNING_THRESHOLD} combinations. Hãy kiểm tra trước khi generate.</p>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm"><strong>{options.length ? combinations.length : 1}</strong> combinations dự kiến</p><div className="flex gap-2"><button type="button" className="btn-outlined" onClick={() => variants.some((variant) => variant.skuSource === 'MANUAL' && !variant.skuLocked) ? setPending({ type: 'regenerate-all', description: 'Regenerate All sẽ ghi đè các SKU manual chưa bị khóa.' }) : regenerateAll()}><RefreshCw className="h-4 w-4" /> Regenerate All</button><button type="button" disabled={hasIncompleteOption || duplicateOptionCode || duplicateOptionName || duplicateValue} className="btn-primary disabled:opacity-50" onClick={() => applyOptions(options)}><RefreshCw className="h-4 w-4" /> Generate matrix</button></div></div>
    </section>
    <div className="overflow-x-auto rounded-md border border-surface-400"><table className="w-full min-w-[1160px] text-left text-sm"><thead className="bg-surface-200"><tr><th className="p-3">Combination</th><th className="p-3">SKU</th><th className="p-3">Nguồn</th><th className="p-3">Barcode / GTIN</th><th className="p-3">Tracking</th><th className="p-3">Reorder</th><th className="p-3">Trạng thái</th></tr></thead><tbody>{variants.map((variant, index) => {
      const previewSku = variant.sku || (variant.skuSource === 'AUTO' ? generateSkuPreview(brandCode, modelCode, variant.optionValues) : '')
      const collision = duplicateSkus.has(previewSku)
      return <tr key={combinationKey(variant.optionValues) || index} className="border-b border-surface-400"><td className="p-3">{variant.optionValues.map((item) => `${item.option}: ${item.value}`).join(' · ') || 'Default'}</td><td className="p-3"><div className="flex items-center gap-2"><input aria-label={`SKU ${index + 1}`} title={variant.skuLocked ? 'SKU đã khóa vì variant có giao dịch kho.' : undefined} disabled={variant.skuLocked} value={previewSku} onChange={(event) => { const sku = normalizeSkuInput(event.target.value); updateVariant(index, { sku, skuSource: 'MANUAL' }); onAudit?.('MANUAL_OVERRIDE', sku) }} onBlur={(event) => updateVariant(index, { sku: normalizeSkuSegment(event.target.value) })} className="input-gaming w-60 font-mono disabled:bg-surface-200" /><button type="button" aria-label={`Regenerate SKU ${index + 1}`} title={variant.skuLocked ? 'Không thể regenerate SKU đã khóa' : undefined} disabled={variant.skuLocked} onClick={() => regenerateRow(index)} className="flex h-11 w-10 items-center justify-center rounded-sm border border-surface-400 disabled:opacity-40"><RefreshCw className="h-4 w-4" /></button></div>{collision && <span className="mt-1 block text-xs text-error-700">SKU bị trùng trong catalog.</span>}</td><td className="p-3"><StatusBadge label={variant.skuSource} tone={variant.skuSource === 'AUTO' ? 'info' : 'warning'} /></td><td className="p-3"><input aria-label={`Barcode ${index + 1}`} value={variant.barcode ?? ''} onChange={(event) => updateVariant(index, { barcode: event.target.value })} className="input-gaming mb-1 w-36" placeholder="Barcode" /><input aria-label={`GTIN ${index + 1}`} value={variant.gtin ?? ''} onChange={(event) => updateVariant(index, { gtin: event.target.value })} className="input-gaming w-36" placeholder="GTIN" /></td><td className="p-3"><label className="flex items-center gap-2"><input aria-label={`Serial tracking ${index + 1}`} type="checkbox" checked={variant.serialTracking} onChange={(event) => updateVariant(index, { serialTracking: event.target.checked })} className="h-5 w-5 accent-brand-500" />{variant.serialTracking ? 'Theo serial' : 'Theo số lượng'}</label></td><td className="p-3"><input aria-label={`Reorder level ${index + 1}`} type="number" min="0" value={variant.reorderLevel} onChange={(event) => updateVariant(index, { reorderLevel: Number(event.target.value) })} className="input-gaming w-24" /></td><td className="p-3"><select aria-label={`Trạng thái SKU ${index + 1}`} value={variant.status} onChange={(event) => { const status = event.target.value as VariantDraft['status']; updateVariant(index, { status }); if (status === 'INACTIVE') onAudit?.('DEACTIVATE', variant.sku) }} className="input-gaming"><option value="ACTIVE">Active</option><option value="INACTIVE">Disabled</option></select></td></tr>
    })}</tbody></table></div>
    <ConfirmDialog isOpen={Boolean(pending)} title={pending?.type === 'regenerate-all' ? 'Ghi đè SKU manual?' : 'Tạo lại ma trận?'} description={pending?.description ?? ''} confirmLabel="Tiếp tục" onCancel={() => setPending(null)} onConfirm={confirmPending} />
  </div>
}

function SmallButton({ children, label, onClick }: { children: ReactElement; label: string; onClick: () => void }) {
  return <button type="button" aria-label={label} onClick={onClick} className="flex h-11 w-9 items-center justify-center rounded-sm hover:bg-white focus-visible:outline-none focus-visible:shadow-focus [&_svg]:h-4 [&_svg]:w-4">{children}</button>
}
