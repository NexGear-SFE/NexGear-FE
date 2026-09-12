import { Check, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Product } from '@/types/product.type'
import type { ProductVariant } from '@/types/variant.type'

type Props = {
  excludedVariantIds?: string[]
  isOpen: boolean
  onCancel: () => void
  onConfirm: (variantId: string) => void
  products: Product[]
  variants: ProductVariant[]
}

export function SkuSelectorDialog({ excludedVariantIds = [], isOpen, onCancel, onConfirm, products, variants }: Props) {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const rows = useMemo(() => variants.filter((variant) => {
    const product = products.find((item) => item.id === variant.productId)
    const haystack = `${product?.name ?? ''} ${product?.productCode ?? ''} ${variant.sku} ${variant.optionValues.map((value) => value.value).join(' ')}`.toLocaleLowerCase('vi')
    return variant.status === 'ACTIVE' && product?.status === 'ACTIVE' && !excludedVariantIds.includes(variant.id) && haystack.includes(query.trim().toLocaleLowerCase('vi'))
  }), [excludedVariantIds, products, query, variants])
  function closeDialog() { setQuery(''); setSelectedId(''); onCancel() }
  function confirmSelection() { const variantId = selectedId; setQuery(''); setSelectedId(''); onConfirm(variantId) }

  useEffect(() => {
    if (!isOpen) return
    window.setTimeout(() => searchRef.current?.focus(), 0)
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
  }, [isOpen, onCancel])

  if (!isOpen) return null
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog() }}>
    <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="sku-selector-title" className="flex max-h-[92vh] w-full max-w-3xl flex-col rounded-t-lg border border-surface-400 bg-white shadow-clay-lg sm:rounded-lg">
      <header className="flex items-start gap-4 border-b border-surface-400 p-5"><div className="min-w-0 flex-1"><h2 id="sku-selector-title" className="font-heading text-xl font-semibold">Chọn SKU</h2><p className="mt-1 text-sm text-text-600">Tìm theo tên sản phẩm, mã sản phẩm, cấu hình hoặc SKU.</p></div><button type="button" aria-label="Đóng chọn SKU" onClick={onCancel} className="flex h-11 w-11 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:shadow-focus"><X className="h-5 w-5" /></button></header>
      <div className="border-b border-surface-400 p-4"><label className="relative block"><span className="sr-only">Tìm SKU</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-600" /><input ref={searchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="input-gaming w-full pl-10" placeholder="Nhập tên sản phẩm, mã hoặc SKU…" /></label></div>
      <div className="min-h-48 flex-1 overflow-y-auto p-4">{rows.length === 0 ? <div className="py-12 text-center"><p className="font-semibold">Không tìm thấy SKU phù hợp</p><p className="mt-1 text-sm text-text-600">Thử từ khóa khác hoặc kiểm tra trạng thái sản phẩm.</p></div> : <div role="listbox" aria-label="Danh sách SKU" className="space-y-2">{rows.map((variant) => { const product = products.find((item) => item.id === variant.productId); const selected = selectedId === variant.id; return <button key={variant.id} type="button" role="option" aria-selected={selected} onClick={() => setSelectedId(variant.id)} className={`flex min-h-20 w-full items-center gap-3 rounded-sm border p-4 text-left ${selected ? 'border-brand-500 bg-brand-50' : 'border-surface-400 hover:border-brand-500'}`}><span className="min-w-0 flex-1"><strong className="block text-sm">{product?.name}</strong><span className="mt-1 block font-mono text-xs">{variant.sku}</span><span className="mt-1 block text-xs text-text-600">{variant.optionValues.map((value) => `${value.option}: ${value.value}`).join(' · ') || 'Cấu hình mặc định'}</span></span>{selected && <Check className="h-5 w-5 shrink-0 text-brand-500" />}</button>})}</div>}</div>
      <footer className="flex items-center justify-between gap-3 border-t border-surface-400 p-4"><span className="text-sm text-text-600">{selectedId ? 'Đã chọn 1 SKU' : 'Chưa chọn SKU'}</span><div className="flex gap-2"><button type="button" className="btn-outlined" onClick={closeDialog}>Hủy</button><button type="button" disabled={!selectedId} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40" onClick={confirmSelection}>Xác nhận lựa chọn</button></div></footer>
    </section>
  </div>
}
