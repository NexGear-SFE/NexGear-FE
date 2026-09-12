import { Wrench, Shield, CheckCircle, Clock } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const TechStaffDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#040004] to-[#1a171a] rounded-xl p-6 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#FB8C00] text-xs font-bold uppercase tracking-wider mb-1">
            <Wrench className="w-4 h-4" />
            <span>Tech Staff Workspace</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">Khu Vực Kỹ Thuật Viên: {user?.name}</h1>
          <p className="text-xs text-gray-300 mt-1">
            Tiếp nhận phiếu bảo hành, hỗ trợ kỹ thuật và kiểm tra phần cứng thiết bị.
          </p>
        </div>
        <div className="hidden md:block">
          <span className="bg-[#FB8C00] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {user?.roleName}
          </span>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Phiếu bảo hành mới</span>
            <Clock className="w-4 h-4 text-[#FB8C00]" />
          </div>
          <div className="text-2xl font-bold text-[#040004] font-heading">12</div>
          <p className="text-[11px] text-gray-500 mt-1">Cần xử lý trong ngày</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Đã hoàn thành kiểm tra</span>
            <CheckCircle className="w-4 h-4 text-[#00A859]" />
          </div>
          <div className="text-2xl font-bold text-[#00A859] font-heading">48</div>
          <p className="text-[11px] text-gray-500 mt-1">Trong tuần này</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Yêu cầu tư vấn build PC</span>
            <Shield className="w-4 h-4 text-[#1E88E5]" />
          </div>
          <div className="text-2xl font-bold text-[#1E88E5] font-heading">5</div>
          <p className="text-[11px] text-gray-500 mt-1">Khách hàng cần tư vấn khẩn</p>
        </div>
      </div>
    </div>
  )
}
