import type { CancelOrderModalProps } from '@/types/customer/order.type'

export function CancelOrderModal({
  isOpen,
  orderCode,
  reasonInput,
  onChangeReason,
  onClose,
  onConfirmCancel,
}: CancelOrderModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
        <h3 className="text-lg font-bold text-[#040004] font-heading">
          Xác nhận Hủy Đơn hàng {orderCode}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          Bạn có chắc chắn muốn hủy đơn hàng này không? Vui lòng chọn hoặc nhập lý do hủy đơn:
        </p>

        <textarea
          rows={3}
          value={reasonInput}
          onChange={(e) => onChangeReason(e.target.value)}
          placeholder="Nhập lý do hủy đơn (ví dụ: Thay đổi địa chỉ, Đổi sản phẩm khác...)"
          className="w-full border border-gray-300 rounded-[6px] p-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#E30019]"
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-[6px] cursor-pointer"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={onConfirmCancel}
            className="px-4 py-2 text-xs font-bold bg-[#E30019] text-white rounded-[6px] hover:bg-[#cc0016] cursor-pointer"
          >
            Xác nhận Hủy Đơn
          </button>
        </div>
      </div>
    </div>
  )
}
