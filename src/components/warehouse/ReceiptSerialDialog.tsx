import { Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ProductSerial } from '@/types/inventory.type'
import { parseSerials } from '@/utils/receipt'

type Props = { inventorySerials: ProductSerial[]; isOpen: boolean; onCancel: () => void; onSave: (serials: string[]) => void; productName: string; quantity: number; serials: string[]; sku: string }

export function ReceiptSerialDialog({ inventorySerials, isOpen, onCancel, onSave, productName, quantity, serials, sku }: Props) {
  if (!isOpen) return null
  return <OpenReceiptSerialDialog inventorySerials={inventorySerials} onCancel={onCancel} onSave={onSave} productName={productName} quantity={quantity} serials={serials} sku={sku} />
}

function OpenReceiptSerialDialog({ inventorySerials, onCancel, onSave, productName, quantity, serials, sku }: Omit<Props, 'isOpen'>) {
  const [value, setValue] = useState(serials.join('\n'))
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { window.setTimeout(() => inputRef.current?.focus(), 0) }, [])
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onCancel() }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close) }, [onCancel])
  const parsed = parseSerials(value)
  const normalized = parsed.map((item) => item.toUpperCase())
  const existing = new Set(inventorySerials.map((item) => item.value.toUpperCase()))
  const hasDuplicate = new Set(normalized).size !== normalized.length
  const hasExisting = normalized.some((item) => existing.has(item))
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="serial-dialog-title" className="w-full max-w-2xl rounded-lg border border-surface-400 bg-white p-5 shadow-clay-lg"><div className="flex items-start justify-between gap-4"><div><h2 id="serial-dialog-title" className="font-heading text-lg font-semibold">Nhập serial sản phẩm</h2><p className="mt-1 text-sm text-text-600">{productName} · <span className="font-mono">{sku}</span> · cần {quantity} serial</p></div><button type="button" aria-label="Đóng nhập serial" className="btn-outlined px-3" onClick={onCancel}><X className="h-4 w-4" /></button></div>
    <label className="mt-5 block text-sm font-semibold">Quét hoặc paste serial, mỗi dòng một mã<textarea ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} rows={8} className="input-gaming mt-2 w-full font-mono" placeholder="SERIAL-0001&#10;SERIAL-0002" /></label>
    <div aria-live="polite" className="mt-3 flex flex-wrap items-center gap-3 text-sm"><strong>Đã nhập {parsed.length}/{quantity} serial</strong>{parsed.length < quantity && <span className="text-warning-500">Chưa đủ</span>}{parsed.length === quantity && !hasDuplicate && !hasExisting && <span className="text-success-500">Hợp lệ</span>}{hasDuplicate && <span className="text-error-700">Có serial bị trùng</span>}{hasExisting && <span className="text-error-700">Serial đã tồn tại trong kho</span>}</div>
    {parsed.length > 0 && <div className="mt-4 max-h-44 overflow-y-auto rounded-sm border border-surface-400 p-3">{parsed.map((serial, index) => <div key={`${serial}-${index}`} className="flex items-center justify-between border-b border-surface-400 py-2 last:border-0"><span className="font-mono text-sm">{serial}</span><span className="text-xs">{existing.has(serial.toUpperCase()) ? 'Đã tồn tại' : normalized.indexOf(serial.toUpperCase()) !== index ? 'Bị trùng' : 'Hợp lệ'}</span></div>)}</div>}
    <div className="mt-5 flex justify-between gap-2"><button type="button" className="btn-outlined" onClick={() => setValue('')}><Trash2 className="h-4 w-4" /> Xóa toàn bộ</button><div className="flex gap-2"><button type="button" className="btn-outlined" onClick={onCancel}>Hủy</button><button type="button" className="btn-primary" disabled={parsed.length > quantity} onClick={() => onSave(parsed)}>Lưu serial</button></div></div></section></div>
}
