import { AlertTriangle } from 'lucide-react'

interface WarrantyProviderFormModalProps {
  isOpen: boolean
  mode: 'add' | 'edit'
  providerNameForEdit?: string
  formName: string
  formUrl: string
  formActive: boolean
  urlError: boolean
  isValidUrl: (url: string) => boolean
  onChangeName: (value: string) => void
  onChangeUrl: (value: string) => void
  onChangeActive: (value: boolean) => void
  onClose: () => void
  onSubmit: () => void
}

export function WarrantyProviderFormModal({
  isOpen,
  mode,
  providerNameForEdit,
  formName,
  formUrl,
  formActive,
  urlError,
  isValidUrl,
  onChangeName,
  onChangeUrl,
  onChangeActive,
  onClose,
  onSubmit,
}: WarrantyProviderFormModalProps) {
  if (!isOpen) return null

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-5">
        <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-7 w-full max-w-[480px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          <div className="text-[11px] font-bold tracking-[0.1em] text-[var(--text-400)] uppercase font-body mb-1">
            {mode === 'add' ? 'Thêm nhà cung cấp' : 'Chỉnh sửa nhà cung cấp'}
          </div>
          <h3 className="m-0 mb-6 text-[18px] font-bold text-[var(--text-900)] font-heading">
            {mode === 'add' ? 'Thêm nhà sản xuất' : `Chỉnh sửa: ${providerNameForEdit}`}
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
                Tên nhà sản xuất *
              </label>
              <input
                value={formName}
                onChange={(e) => onChangeName(e.target.value)}
                placeholder="Ví dụ: ASUS"
                className="w-full h-[42px] px-3.5 bg-white border border-[var(--surface-400)] rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors focus:border-[var(--brand-500)]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
                URL tra cứu bảo hành *
              </label>
              <input
                value={formUrl}
                onChange={(e) => onChangeUrl(e.target.value)}
                placeholder="https://..."
                className={`w-full h-[42px] px-3.5 bg-white border rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors focus:border-[var(--brand-500)] ${
                  urlError ? 'border-red-400' : 'border-[var(--surface-400)]'
                }`}
              />
              {urlError && (
                <div className="text-[12px] text-red-400 mt-1.5 font-body flex items-center gap-1.5">
                  <AlertTriangle size={14} /> URL không hợp lệ. Vui lòng nhập URL bắt đầu bằng https://
                </div>
              )}
              {!urlError && formUrl && !isValidUrl(formUrl) && (
                <div className="text-[12px] text-amber-500 mt-1.5 font-body flex items-center gap-1.5">
                  <AlertTriangle size={14} /> Nên dùng URL HTTPS
                </div>
              )}
            </div>
            <div>
              <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
                Trạng thái
              </label>
              <div className="flex gap-2.5">
                {[
                  { v: true, label: 'Đang hoạt động' },
                  { v: false, label: 'Vô hiệu' },
                ].map(({ v, label }) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => onChangeActive(v)}
                    className={`flex-1 h-[38px] rounded-lg border text-[13px] font-semibold font-body cursor-pointer transition-colors ${
                      formActive !== v
                        ? 'bg-transparent border-[var(--surface-400)] text-[var(--text-600)] hover:bg-[var(--surface-200)]'
                        : v === true
                        ? 'bg-green-50 border-green-500 text-green-600'
                        : 'bg-red-50 border-red-500 text-red-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 mt-6 justify-end">
            <button
              type="button"
              className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="button"
              className={`h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body transition-colors ${
                !formName.trim() || !formUrl.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'opacity-100 cursor-pointer hover:bg-[var(--brand-600)]'
              }`}
              onClick={onSubmit}
            >
              {mode === 'add' ? 'Thêm nhà cung cấp' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
