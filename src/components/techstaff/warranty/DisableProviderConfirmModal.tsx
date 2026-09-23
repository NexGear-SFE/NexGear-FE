import { AlertTriangle } from 'lucide-react'
import type { WarrantyProvider } from '@/types/admin/staff.type'

interface DisableProviderConfirmModalProps {
  provider: WarrantyProvider | null
  onClose: () => void
  onConfirm: () => void
}

export function DisableProviderConfirmModal({
  provider,
  onClose,
  onConfirm,
}: DisableProviderConfirmModalProps) {
  if (!provider) return null

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-5">
        <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-7 w-full max-w-[400px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[22px] text-orange-500 mb-4 border border-orange-100">
            <AlertTriangle size={24} />
          </div>
          <h3 className="m-0 mb-2 text-[17px] font-bold text-[var(--text-900)] font-heading">
            Vô hiệu hóa {provider.name}?
          </h3>
          <p className="m-0 mb-6 text-[13px] text-[var(--text-600)] font-body leading-[1.6]">
            <strong style={{ color: provider.color }}>{provider.name}</strong> sẽ không còn xuất hiện trên trang Kiểm tra Serial. Bạn có thể kích hoạt lại bất cứ lúc nào.
          </p>
          <div className="flex gap-2.5 justify-end">
            <button
              type="button"
              className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="button"
              className="h-10 px-5 bg-orange-600 text-white border-none rounded-md text-[13px] font-bold font-body cursor-pointer hover:bg-orange-700 transition-colors"
              onClick={onConfirm}
            >
              Vô hiệu hóa
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
