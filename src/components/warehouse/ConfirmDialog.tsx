import { useEffect, useRef } from 'react'
import { AlertTriangle, X } from 'lucide-react'

type ConfirmDialogProps = {
  cancelLabel?: string
  confirmLabel?: string
  description: string
  isOpen: boolean
  isConfirming?: boolean
  onCancel: () => void
  onConfirm: () => void
  title: string
}

export function ConfirmDialog({ cancelLabel = 'Hủy', confirmLabel = 'Xác nhận', description, isOpen, isConfirming = false, onCancel, onConfirm, title }: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    confirmRef.current?.focus()
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
      if (event.key !== 'Tab') return
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      previouslyFocusedRef.current?.focus()
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel() }}>
    <section ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description" className="w-full max-w-md rounded-lg border border-surface-400 bg-white p-5 shadow-clay-lg">
      <div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-error-50 text-error-700"><AlertTriangle className="h-5 w-5" /></span><div className="min-w-0 flex-1"><h2 id="confirm-dialog-title" className="font-heading text-lg font-semibold">{title}</h2><p id="confirm-dialog-description" className="mt-2 text-sm text-text-600">{description}</p></div><button type="button" aria-label="Đóng hộp thoại" onClick={onCancel} className="flex h-11 w-11 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:shadow-focus"><X className="h-5 w-5" /></button></div>
      <div className="mt-6 flex justify-end gap-2"><button type="button" className="btn-outlined" disabled={isConfirming} onClick={onCancel}>{cancelLabel}</button><button ref={confirmRef} type="button" className="btn-primary" disabled={isConfirming} aria-busy={isConfirming} onClick={onConfirm}>{confirmLabel}</button></div>
    </section>
  </div>
}
