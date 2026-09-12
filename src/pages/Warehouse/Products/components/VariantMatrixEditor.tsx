import { AlertTriangle, Minus, MoveDown, MoveUp, Plus, RefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import { ConfirmDialog } from '@/components/warehouse/ConfirmDialog'
import { StatusBadge } from '@/components/warehouse/StatusBadge'
import type { ProductVariant, VariantOption } from '@/types/variant.type'
import { generateSkuPreview, normalizeSkuInput, normalizeSkuSegment } from '@/utils/generateSkuPreview'
import { generateVariantCombinations } from '@/utils/generateVariantCombinations'
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
  | { type: 'options'; nextOptions: VariantOption[]; description: string }
  | { type: 'regenerate-all'; description: string }
  | { type: 'apply-defaults'; description: string }
  | null

const MATRIX_WARNING_THRESHOLD = 50

function combinationKey(values: VariantDraft['optionValues']): string {
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

export function VariantMatrixEditor({ brandCode, existingSkus = [], modelCode, onAudit, onChange, variants }: VariantMatrixEditorProps) {
  const templateVariant = variants.find((variant) => variant.status === 'ACTIVE') ?? variants[0]
  const [options, setOptions] = useState<VariantOption[]>(() => deriveOptions(variants))
  const [pending, setPending] = useState<PendingAction>(null)
  const [defaultSerialTracking, setDefaultSerialTracking] = useState(templateVariant?.serialTracking ?? false)
  const [defaultReorderLevel, setDefaultReorderLevel] = useState(templateVariant?.reorderLevel ?? 0)
  const [matrixMessage, setMatrixMessage] = useState('')
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

  function applyOptions(nextOptions: VariantOption[]) {
    const previousRows = new Map(variants.map((variant) => [combinationKey(variant.optionValues), variant]))
    const nextCombinations = generateVariantCombinations(nextOptions)
    const source = nextOptions.length === 0 ? [[]] : nextCombinations
    const nextVariants = source.map<VariantDraft>((values) => {
      const previous = previousRows.get(combinationKey(values))
      if (!previous) return { sku: generateSkuPreview(brandCode, modelCode, values), skuSource: 'AUTO', optionValues: values, barcode: '', gtin: '', serialTracking: defaultSerialTracking, reorderLevel: defaultReorderLevel, status: 'ACTIVE', skuLocked: false }
      return { ...previous, optionValues: values, sku: previous.skuSource === 'AUTO' && !previous.skuLocked ? generateSkuPreview(brandCode, modelCode, values) : previous.sku }
    })
    setOptions(nextOptions)
    onChange(nextVariants)
    const retainedCount = nextVariants.filter((variant) => previousRows.has(combinationKey(variant.optionValues))).length
    setMatrixMessage(`Đã cập nhật ${nextVariants.length} biến thể: giữ nguyên cấu hình của ${retainedCount} dòng hiện có, áp dụng thiết lập mặc định cho ${nextVariants.length - retainedCount} dòng mới.`)
  }

  function changeOption(index: number, patch: Partial<VariantOption>) {
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

  function applyDefaults() {
    onChange(variants.map((variant) => variant.skuLocked ? variant : { ...variant, serialTracking: defaultSerialTracking, reorderLevel: defaultReorderLevel }))
    setMatrixMessage(`Đã áp dụng thiết lập chung cho ${variants.filter((variant) => !variant.skuLocked).length} biến thể chưa khóa.`)
  }

  function confirmPending() {
    if (pending?.type === 'options') applyOptions(pending.nextOptions)
    if (pending?.type === 'regenerate-all') regenerateAll()
    if (pending?.type === 'apply-defaults') applyDefaults()
    setPending(null)
  }

  return <div className="space-y-5">
    <section className="rounded-md border border-surface-400 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-heading text-lg font-semibold">Thiết lập thuộc tính sản phẩm</h2><p className="text-sm text-text-600">Ví dụ: CPU, GPU hoặc màu sắc. Mã ngắn được dùng để tạo SKU tự động.</p></div><button type="button" className="btn-outlined" onClick={() => setOptions((current) => [...current, { name: '', code: '', values: [{ value: '', code: '' }] }])}><Plus className="h-4 w-4" /> Thêm thuộc tính</button></div>
      <div className="mt-4 space-y-3">{options.map((option, optionIndex) => <div key={`option-${optionIndex}`} className="rounded-sm bg-surface-200 p-3">
        <div className="grid gap-2 md:grid-cols-[1fr_140px_auto]"><input aria-label={`Tên thuộc tính ${optionIndex + 1}`} autoComplete="off" name={`option-name-${optionIndex}`} value={option.name} onChange={(event) => changeOption(optionIndex, { name: event.target.value })} className="input-gaming" placeholder="Ví dụ: CPU, GPU, màu sắc…" /><input aria-label={`Mã thuộc tính ${optionIndex + 1}`} autoComplete="off" name={`option-code-${optionIndex}`} value={option.code ?? ''} onChange={(event) => changeOption(optionIndex, { code: normalizeSkuSegment(event.target.value) })} className="input-gaming font-mono" placeholder="Ví dụ: CPU…" /><div className="flex"><SmallButton label="Đưa thuộc tính lên" onClick={() => moveOption(optionIndex, -1)}><MoveUp /></SmallButton><SmallButton label="Đưa thuộc tính xuống" onClick={() => moveOption(optionIndex, 1)}><MoveDown /></SmallButton><SmallButton label="Xóa thuộc tính" onClick={() => setPending({ type: 'options', nextOptions: options.filter((_, index) => index !== optionIndex), description: `Xóa thuộc tính ${option.name || optionIndex + 1} sẽ loại các tổ hợp liên quan.` })}><Minus /></SmallButton></div></div>
        <div className="mt-3 space-y-2">{option.values.map((value, valueIndex) => <div key={`value-${valueIndex}`} className="grid grid-cols-[1fr_140px_auto] gap-2"><input aria-label={`Giá trị ${optionIndex + 1}-${valueIndex + 1}`} autoComplete="off" name={`option-value-${optionIndex}-${valueIndex}`} value={value.value} onChange={(event) => changeOption(optionIndex, { values: option.values.map((item, index) => index === valueIndex ? { ...item, value: event.target.value } : item) })} className="input-gaming" placeholder="Ví dụ: RTX 4080…" /><input aria-label={`Mã giá trị ${optionIndex + 1}-${valueIndex + 1}`} autoComplete="off" name={`value-code-${optionIndex}-${valueIndex}`} value={value.code} onChange={(event) => changeOption(optionIndex, { values: option.values.map((item, index) => index === valueIndex ? { ...item, code: normalizeSkuSegment(event.target.value) } : item) })} className="input-gaming font-mono" placeholder="Ví dụ: 4080…" /><SmallButton label="Xóa giá trị" onClick={() => setPending({ type: 'options', nextOptions: options.map((item, index) => index === optionIndex ? { ...item, values: item.values.filter((_, childIndex) => childIndex !== valueIndex) } : item), description: `Xóa ${value.value || 'giá trị'} sẽ loại các tổ hợp liên quan.` })}><Minus /></SmallButton></div>)}</div>
        <button type="button" className="mt-2 text-xs font-semibold text-brand-500 hover:underline" onClick={() => changeOption(optionIndex, { values: [...option.values, { value: '', code: '' }] })}>+ Thêm giá trị</button>
      </div>)}</div>
      {(duplicateOptionCode || duplicateOptionName || duplicateValue) && <p role="alert" className="mt-3 text-sm text-error-700">Tên và mã của thuộc tính/giá trị không được trùng trong cùng sản phẩm.</p>}
      {combinations.length > MATRIX_WARNING_THRESHOLD && <p className="mt-3 flex gap-2 rounded-sm bg-amber-50 p-3 text-sm text-warning-500"><AlertTriangle className="h-5 w-5" aria-hidden="true" /> Danh sách vượt {MATRIX_WARNING_THRESHOLD} tổ hợp. Hãy kiểm tra kỹ trước khi cập nhật.</p>}
      <fieldset className="mt-4 rounded-sm border border-surface-400 bg-surface-200 p-4"><legend className="px-1 text-sm font-semibold">Thiết lập mặc định cho tổ hợp mới</legend><p className="mb-3 text-xs text-text-600">Dòng cũ giữ nguyên cấu hình. Dòng mới sẽ dùng thiết lập dưới đây và luôn ở trạng thái Đang dùng.</p><div className="flex flex-wrap items-end gap-4"><label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={defaultSerialTracking} onChange={(event) => setDefaultSerialTracking(event.target.checked)} className="h-5 w-5 accent-brand-500" /> Quản lý từng serial</label><label className="text-sm font-medium">Ngưỡng cảnh báo nhập lại<input type="number" min="0" step="1" value={defaultReorderLevel} onChange={(event) => setDefaultReorderLevel(Math.max(0, Number(event.target.value)))} className="input-gaming mt-1 block w-36 tabular-nums" /></label><button type="button" className="btn-outlined" disabled={!variants.some((variant) => !variant.skuLocked)} onClick={() => setPending({ type: 'apply-defaults', description: `Áp dụng ${defaultSerialTracking ? 'quản lý theo serial' : 'quản lý theo số lượng'} và ngưỡng cảnh báo ${defaultReorderLevel} cho tất cả biến thể chưa khóa. Các biến thể đã có giao dịch kho không thay đổi.` })}>Áp dụng cho dòng chưa khóa</button></div></fieldset>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm"><strong>{options.length ? combinations.length : 1}</strong> tổ hợp dự kiến</p><div className="flex flex-wrap gap-2"><button type="button" className="btn-outlined" onClick={() => variants.some((variant) => variant.skuSource === 'MANUAL' && !variant.skuLocked) ? setPending({ type: 'regenerate-all', description: 'Tạo lại toàn bộ sẽ ghi đè các SKU nhập thủ công chưa bị khóa. SKU đã có giao dịch kho vẫn được giữ nguyên.' }) : regenerateAll()}><RefreshCw className="h-4 w-4" aria-hidden="true" /> Tạo lại toàn bộ SKU</button><button type="button" disabled={hasIncompleteOption || duplicateOptionCode || duplicateOptionName || duplicateValue} className="btn-primary disabled:opacity-50" onClick={() => applyOptions(options)}><RefreshCw className="h-4 w-4" aria-hidden="true" /> Cập nhật danh sách biến thể</button></div></div>
    </section>
    {matrixMessage && <p aria-live="polite" className="rounded-sm border border-blue-200 bg-blue-50 p-3 text-sm text-info-500">{matrixMessage}</p>}
    <div className="overflow-x-auto rounded-md border border-surface-400"><table className="w-full min-w-[1240px] text-left text-sm"><thead className="bg-surface-200"><tr><th className="p-3">Tổ hợp</th><th className="p-3">Mã SKU</th><th className="p-3">Cách tạo</th><th className="p-3">Mã vạch / GTIN</th><th className="p-3">Cách quản lý</th><th className="p-3">Ngưỡng nhập lại</th><th className="p-3">Trạng thái sử dụng</th></tr></thead><tbody>{variants.map((variant, index) => {
      const previewSku = variant.sku || (variant.skuSource === 'AUTO' ? generateSkuPreview(brandCode, modelCode, variant.optionValues) : '')
      const collision = duplicateSkus.has(previewSku)
      return <tr key={combinationKey(variant.optionValues) || index} className="border-b border-surface-400 align-top"><td className="p-3"><span className="font-medium">{variant.optionValues.map((item) => `${item.option}: ${item.value}`).join(' · ') || 'Mặc định'}</span>{variant.skuLocked && <span className="mt-2 block text-xs font-semibold text-warning-500">Đã khóa do có giao dịch kho</span>}</td><td className="p-3"><div className="flex items-center gap-2"><input aria-label={`SKU ${index + 1}`} autoComplete="off" name={`sku-${index}`} spellCheck={false} title={variant.skuLocked ? 'SKU đã khóa vì biến thể đã có giao dịch kho.' : undefined} disabled={variant.skuLocked} value={previewSku} onChange={(event) => { const sku = normalizeSkuInput(event.target.value); updateVariant(index, { sku, skuSource: 'MANUAL' }); onAudit?.('MANUAL_OVERRIDE', sku) }} onBlur={(event) => updateVariant(index, { sku: normalizeSkuSegment(event.target.value) })} className="input-gaming w-60 font-mono disabled:bg-surface-200" /><button type="button" aria-label={`Tạo lại SKU ${index + 1}`} title={variant.skuLocked ? 'Không thể tạo lại SKU đã khóa' : 'Tạo lại SKU tự động'} disabled={variant.skuLocked} onClick={() => regenerateRow(index)} className="flex h-11 w-10 items-center justify-center rounded-sm border border-surface-400 hover:border-brand-500 focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-40"><RefreshCw className="h-4 w-4" aria-hidden="true" /></button></div>{collision && <span className="mt-1 block text-xs text-error-700">SKU bị trùng trong danh mục sản phẩm.</span>}</td><td className="p-3"><StatusBadge label={variant.skuSource === 'AUTO' ? 'Tự động' : 'Thủ công'} tone={variant.skuSource === 'AUTO' ? 'info' : 'warning'} /></td><td className="p-3"><input aria-label={`Mã vạch ${index + 1}`} autoComplete="off" name={`barcode-${index}`} spellCheck={false} value={variant.barcode ?? ''} onChange={(event) => updateVariant(index, { barcode: event.target.value })} className="input-gaming mb-1 w-36" placeholder="Mã vạch…" /><input aria-label={`GTIN ${index + 1}`} autoComplete="off" name={`gtin-${index}`} spellCheck={false} value={variant.gtin ?? ''} onChange={(event) => updateVariant(index, { gtin: event.target.value })} className="input-gaming w-36" placeholder="GTIN…" /></td><td className="p-3"><label className="flex min-h-11 items-center gap-2"><input aria-label={`Theo dõi serial ${index + 1}`} title={variant.skuLocked ? 'Không thể đổi cách quản lý vì biến thể đã có giao dịch kho.' : undefined} type="checkbox" disabled={variant.skuLocked} checked={variant.serialTracking} onChange={(event) => updateVariant(index, { serialTracking: event.target.checked })} className="h-5 w-5 accent-brand-500 disabled:opacity-50" />{variant.serialTracking ? 'Theo từng serial' : 'Theo số lượng'}</label></td><td className="p-3"><input aria-label={`Ngưỡng nhập lại ${index + 1}`} type="number" min="0" step="1" value={variant.reorderLevel} onChange={(event) => updateVariant(index, { reorderLevel: Math.max(0, Number(event.target.value)) })} className="input-gaming w-24 tabular-nums" /></td><td className="p-3"><select aria-label={`Trạng thái SKU ${index + 1}`} value={variant.status} onChange={(event) => { const status = event.target.value as VariantDraft['status']; updateVariant(index, { status }); if (status === 'INACTIVE') onAudit?.('DEACTIVATE', variant.sku) }} className="input-gaming"><option value="ACTIVE">Đang dùng</option><option value="INACTIVE">Ngừng dùng</option></select></td></tr>
    })}</tbody></table></div>
    <ConfirmDialog isOpen={Boolean(pending)} title={pending?.type === 'regenerate-all' ? 'Ghi đè SKU thủ công?' : pending?.type === 'apply-defaults' ? 'Áp dụng thiết lập chung?' : 'Cập nhật danh sách biến thể?'} description={pending?.description ?? ''} confirmLabel="Xác nhận" onCancel={() => setPending(null)} onConfirm={confirmPending} />
  </div>
}

function SmallButton({ children, label, onClick }: { children: ReactElement; label: string; onClick: () => void }) {
  return <button type="button" aria-label={label} onClick={onClick} className="flex h-11 w-11 items-center justify-center rounded-sm hover:bg-white focus-visible:outline-none focus-visible:shadow-focus [&_svg]:h-4 [&_svg]:w-4">{children}</button>
}
