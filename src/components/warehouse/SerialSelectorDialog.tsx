import { Check, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ProductSerial } from '@/types/inventory.type'
import type { ProductVariant } from '@/types/variant.type'

type SerialRequirement = { quantity: number; variantId: string }

type Props = {
  initialSelectedIds?: string[]
  isOpen: boolean
  onCancel: () => void
  onConfirm: (serialIds: string[]) => void
  requirements: SerialRequirement[]
  serials: ProductSerial[]
  variants: ProductVariant[]
}

export function SerialSelectorDialog({ initialSelectedIds = [], isOpen, onCancel, onConfirm, requirements, serials, variants }: Props) {
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const available = useMemo(() => serials.filter((serial) => serial.status === 'AVAILABLE' && requirements.some((requirement) => requirement.variantId === serial.variantId) && serial.value.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi'))), [query, requirements, serials])
  const complete = requirements.every((requirement) => selectedIds.filter((id) => serials.some((serial) => serial.id === id && serial.variantId === requirement.variantId)).length === requirement.quantity)

  useEffect(() => {
    if (!isOpen) return
    setQuery('')
    setSelectedIds(initialSelectedIds)
    window.setTimeout(() => inputRef.current?.focus(), 0)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
      if (event.key !== 'Tab') return
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])') ?? [])
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [initialSelectedIds, isOpen, onCancel])

  if (!isOpen) return null
  function toggle(serial: ProductSerial) {
    const selected = selectedIds.includes(serial.id)
    if (selected) { setSelectedIds((current) => current.filter((id) => id !== serial.id)); return }
    const requirement = requirements.find((item) => item.variantId === serial.variantId)
    const selectedForSku = selectedIds.filter((id) => serials.some((item) => item.id === id && item.variantId === serial.variantId)).length
    if (requirement && selectedForSku < requirement.quantity) setSelectedIds((current) => [...current, serial.id])
  }

  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel() }}><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="serial-selector-title" className="flex max-h-[92vh] w-full max-w-3xl flex-col rounded-t-lg border border-surface-400 bg-white shadow-clay-lg sm:rounded-lg">
    <header className="flex items-start gap-4 border-b border-surface-400 p-5"><div className="min-w-0 flex-1"><h2 id="serial-selector-title" className="font-heading text-xl font-semibold">Chọn serial xuất kho</h2><p className="mt-1 text-sm text-text-600">Chỉ serial đang khả dụng và đúng SKU mới có thể chọn.</p></div><button type="button" aria-label="Đóng chọn serial" onClick={onCancel} className="flex h-11 w-11 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:shadow-focus"><X className="h-5 w-5" /></button></header>
    <div className="border-b border-surface-400 p-4"><label className="relative block"><span className="sr-only">Tìm serial</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-600" /><input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="input-gaming w-full pl-10" placeholder="Quét hoặc nhập serial…" /></label></div>
    <div className="min-h-48 flex-1 overflow-y-auto p-4">{requirements.map((requirement) => { const variant = variants.find((item) => item.id === requirement.variantId); const rows = available.filter((serial) => serial.variantId === requirement.variantId); const selectedCount = selectedIds.filter((id) => serials.some((serial) => serial.id === id && serial.variantId === requirement.variantId)).length; return <section key={requirement.variantId} className="mb-5 last:mb-0"><div className="mb-2 flex items-center justify-between gap-3"><h3 className="font-mono text-sm font-semibold">{variant?.sku}</h3><span className={selectedCount === requirement.quantity ? 'text-sm font-semibold text-success-700' : 'text-sm font-semibold text-warning-700'}>{selectedCount}/{requirement.quantity} serial</span></div>{rows.length === 0 ? <p className="rounded-sm bg-warning-50 p-3 text-sm text-warning-700">Không có serial khả dụng phù hợp.</p> : <div role="listbox" aria-label={`Serial của ${variant?.sku}`} className="grid gap-2 sm:grid-cols-2">{rows.map((serial) => { const selected = selectedIds.includes(serial.id); const full = !selected && selectedCount >= requirement.quantity; return <button key={serial.id} type="button" role="option" aria-selected={selected} disabled={full} onClick={() => toggle(serial)} className={`flex min-h-12 items-center gap-3 rounded-sm border p-3 text-left ${selected ? 'border-brand-500 bg-brand-50' : 'border-surface-400 hover:border-brand-500'} disabled:cursor-not-allowed disabled:opacity-40`}><span className="min-w-0 flex-1 truncate font-mono text-sm">{serial.value}</span>{selected && <Check className="h-4 w-4 text-brand-500" />}</button>})}</div>}</section>})}</div>
    <footer className="flex items-center justify-between gap-3 border-t border-surface-400 p-4"><span className="text-sm text-text-600">Đã chọn {selectedIds.length} serial</span><div className="flex gap-2"><button type="button" className="btn-outlined" onClick={onCancel}>Hủy</button><button type="button" disabled={!complete} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40" onClick={() => onConfirm(selectedIds)}>Xác nhận serial</button></div></footer>
  </section></div>
}
