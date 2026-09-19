import React from 'react'
import { AlertTriangle } from 'lucide-react'
import type { BannerItem } from '@/types/admin/homeContent.type'

interface DeleteConfirmModalProps {
  banner: BannerItem | null
  onClose: () => void
  onConfirm: () => void
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  banner,
  onClose,
  onConfirm,
}) => {
  if (!banner) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">
              Xác nhận xóa banner
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Bạn có chắc chắn muốn xóa banner{' '}
              <strong className="text-gray-800 font-semibold">
                "{banner.title}"
              </strong>
              ? Hành động này sẽ gỡ banner khỏi giao diện trang chủ và không thể hoàn tác.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Xóa banner
          </button>
        </div>
      </div>
    </div>
  )
}
