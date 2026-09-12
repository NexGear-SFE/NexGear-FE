import { useState } from 'react'
import { Plus, Search, ShieldCheck, Wrench, ChevronRight, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import type { CustomerWarrantyRequest, CustomerWarrantyStatus } from '@/types/customerWarranty.type'

interface WarrantyRequestListProps {
  requests: CustomerWarrantyRequest[]
  onOpenCreateModal: () => void
  onSelectRequest: (request: CustomerWarrantyRequest) => void
}

type FilterStatus = 'all' | 'processing' | 'completed' | 'rejected_or_cancelled'

export function WarrantyRequestList({ requests, onOpenCreateModal, onSelectRequest }: WarrantyRequestListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filters: { key: FilterStatus; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'processing', label: 'Đang xử lý' },
    { key: 'completed', label: 'Đã hoàn tất' },
    { key: 'rejected_or_cancelled', label: 'Hủy / Từ chối' },
  ]

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    // Filter status logic
    if (activeFilter === 'processing') {
      if (['completed', 'rejected', 'cancelled'].includes(req.status)) return false
    } else if (activeFilter === 'completed') {
      if (req.status !== 'completed') return false
    } else if (activeFilter === 'rejected_or_cancelled') {
      if (req.status !== 'rejected' && req.status !== 'cancelled') return false
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchCode = req.requestCode.toLowerCase().includes(q)
      const matchName = req.productName.toLowerCase().includes(q)
      const matchSerial = req.serialNumber.toLowerCase().includes(q)
      if (!matchCode && !matchName && !matchSerial) return false
    }

    return true
  })

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
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" />
            {label}
          </span>
        )
      case 'pending':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-[4px] shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap">
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
      case 'cancelled':
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1 rounded-[4px] inline-flex items-center gap-1.5 whitespace-nowrap">
            <AlertCircle className="w-3.5 h-3.5" />
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
    <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 md:p-8 space-y-6 shadow-xs">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#E30019]" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#040004]">
              Yêu cầu bảo hành
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Theo dõi và quản lý các yêu cầu bảo hành sản phẩm của bạn
          </p>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-[6px] transition-all shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Gửi yêu cầu bảo hành</span>
        </button>
      </div>

      {/* 2. Filter & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-50 text-[#E30019] border border-red-200 shadow-2xs'
                    : 'text-slate-600 hover:text-[#040004] hover:bg-slate-50'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã BH, tên sản phẩm hoặc serial..."
            className="w-full bg-white border border-[#E0E0E0] rounded-[6px] py-2 pl-9 pr-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E30019] transition-all"
          />
        </div>
      </div>

      {/* 3. Warranty Request List / Empty State */}
      {filteredRequests.length === 0 ? (
        <div className="bg-slate-50/50 rounded-xl border border-dashed border-gray-300 p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30019] mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 stroke-1.5" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-[#040004]">
              Bạn chưa có yêu cầu bảo hành nào
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Nếu sản phẩm gặp vấn đề kỹ thuật hoặc hỏng hóc, bạn có thể gửi yêu cầu bảo hành để được nhân viên hỗ trợ xử lý.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-[6px] transition-all shadow-xs cursor-pointer mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Gửi yêu cầu bảo hành ngay</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="border border-[#E0E0E0] rounded-[10px] p-5 hover:border-gray-300 transition-all bg-white shadow-2xs space-y-4"
            >
              {/* Card Header: Product Name, Request Code, Serial, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 bg-[#F4F5F7] rounded-[8px] flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                    <img src={req.productImage} alt={req.productName} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-[#040004] leading-snug truncate">
                      {req.productName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 flex-wrap">
                      <span className="font-bold text-slate-900">{req.requestCode}</span>
                      <span>·</span>
                      <span>SN: {req.serialNumber}</span>
                      <span>·</span>
                      <span>Đơn hàng {req.orderCode}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  {renderStatusBadge(req.status, req.statusLabel)}
                </div>
              </div>

              {/* Card Body: Reason, Receiver Date, Expected Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm bg-slate-50/70 p-3.5 rounded-[8px] border border-slate-100">
                <div>
                  <span className="text-slate-500 font-medium block">Lý do bảo hành:</span>
                  <span className="text-slate-900 font-semibold line-clamp-1">{req.reason}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Ngày tiếp nhận:</span>
                  <span className="text-slate-900 font-semibold">{req.createdAt}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Dự kiến hoàn tất:</span>
                  <span className="text-[#E30019] font-semibold">
                    {req.expectedCompletionDate || 'Đang cập nhật...'}
                  </span>
                </div>
              </div>

              {/* Card Footer: Action */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-slate-500 italic">
                  * Vui lòng mang sản phẩm cùng hóa đơn/thẻ bảo hành tới showroom gần nhất.
                </div>
                <button
                  type="button"
                  onClick={() => onSelectRequest(req)}
                  className="inline-flex items-center justify-center border border-gray-300 hover:border-[#E30019] text-gray-800 hover:text-[#E30019] text-xs font-bold px-4 py-2 rounded-[6px] transition-all bg-white shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  <span>Xem chi tiết</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
