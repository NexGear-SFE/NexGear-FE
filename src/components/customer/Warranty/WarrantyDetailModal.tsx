import { X, ShieldCheck, CheckCircle2, Clock, Headphones, Wrench, XCircle } from 'lucide-react'
import type { CustomerWarrantyRequest, CustomerWarrantyStatus } from '@/types/customerWarranty.type'

interface WarrantyDetailModalProps {
  request: CustomerWarrantyRequest | null
  isOpen: boolean
  onClose: () => void
}

export function WarrantyDetailModal({ request, isOpen, onClose }: WarrantyDetailModalProps) {
  if (!isOpen || !request) return null

  const renderStatusBadge = (status: CustomerWarrantyStatus, label: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {label}
          </span>
        )
      case 'repairing':
      case 'waiting_parts':
        return (
          <span className="bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap">
            <Wrench className="w-3.5 h-3.5" />
            {label}
          </span>
        )
      case 'inspecting':
      case 'received':
      case 'pending':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" />
            {label}
          </span>
        )
      case 'rejected':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap">
            <XCircle className="w-3.5 h-3.5" />
            {label}
          </span>
        )
      default:
        return (
          <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-[4px] whitespace-nowrap">
            {label}
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#E30019]" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#040004] font-heading">
                Chi tiết yêu cầu {request.requestCode}
              </h3>
              <p className="text-xs text-slate-500 font-medium">Tạo ngày {request.createdAt}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Information Summary Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-16 h-16 bg-white rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
              <img src={request.productImage} alt={request.productName} className="w-full h-full object-contain p-1" />
            </div>
            <div className="space-y-1 min-w-0">
              <h4 className="font-bold text-sm sm:text-base text-[#040004] leading-snug">
                {request.productName}
              </h4>
              <p className="text-xs font-mono text-slate-600">
                SKU: {request.sku} · SN: <strong className="text-slate-900">{request.serialNumber}</strong>
              </p>
              <p className="text-xs text-slate-500">
                Đơn hàng: {request.orderCode} · Ngày mua: {request.purchaseDate} · Hạn bảo hành: {request.warrantyExpirationDate}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {renderStatusBadge(request.status, request.statusLabel)}
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 space-y-4 shadow-2xs">
          <h4 className="text-xs sm:text-sm font-bold text-[#040004] uppercase tracking-wider font-heading">
            Tiến trình xử lý kỹ thuật
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative">
            {request.timeline.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step.current
                      ? 'bg-[#E30019] text-white ring-4 ring-red-100 shadow-md'
                      : step.completed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div className="space-y-0.5">
                  <span
                    className={`block text-xs font-bold ${
                      step.current ? 'text-[#E30019]' : step.completed ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.timestamp && (
                    <span className="block text-[11px] text-slate-500 font-mono">{step.timestamp}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Details & Inspection Result */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Left: Customer Reported Issue */}
          <div className="border border-gray-200 rounded-xl p-4 space-y-2.5 bg-white">
            <h5 className="font-bold text-[#040004] text-xs sm:text-sm border-b border-gray-100 pb-2">
              Thông tin báo lỗi từ khách hàng
            </h5>
            <div>
              <span className="text-slate-500 font-medium block">Lý do bảo hành:</span>
              <strong className="text-slate-900">{request.reason}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Mô tả sự cố chi tiết:</span>
              <p className="text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded border border-gray-100 mt-1">
                {request.description}
              </p>
            </div>
          </div>

          {/* Right: Technical Inspection & Resolution */}
          <div className="border border-gray-200 rounded-xl p-4 space-y-2.5 bg-white">
            <h5 className="font-bold text-[#040004] text-xs sm:text-sm border-b border-gray-100 pb-2">
              Kết quả kiểm tra từ Phòng Kỹ Thuật
            </h5>
            <div>
              <span className="text-slate-500 font-medium block">Kết quả kiểm định:</span>
              <p className="text-slate-800 leading-relaxed font-medium">
                {request.inspectionResult || 'Kỹ thuật viên đang tiến hành kiểm tra thiết bị...'}
              </p>
            </div>
            {request.resolution && (
              <div>
                <span className="text-slate-500 font-medium block">Hướng xử lý:</span>
                <p className="text-emerald-700 font-semibold leading-relaxed bg-emerald-50 p-2 rounded border border-emerald-100 mt-1">
                  {request.resolution}
                </p>
              </div>
            )}
            <div>
              <span className="text-slate-500 font-medium block">Dự kiến hoàn tất bàn giao:</span>
              <strong className="text-[#E30019]">
                {request.actualCompletionDate || request.expectedCompletionDate || 'Đang cập nhật...'}
              </strong>
            </div>
          </div>
        </div>

        {/* Footer Support Notice */}
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
            <Headphones className="w-5 h-5 text-[#E30019] shrink-0" />
            <span>Cần hỗ trợ gấp về yêu cầu bảo hành này? Gọi ngay Hotline kỹ thuật.</span>
          </div>
          <a
            href="tel:18009999"
            className="inline-flex items-center justify-center border border-gray-300 hover:border-[#E30019] text-gray-800 hover:text-[#E30019] text-xs font-bold px-4 py-2 rounded-[6px] transition-all bg-white cursor-pointer shrink-0"
          >
            Hotline: 1800-9999
          </a>
        </div>
      </div>
    </div>
  )
}
