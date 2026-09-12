import { Package, Truck, AlertTriangle, Layers } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const WarehouseDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#040004] to-[#1a171a] rounded-xl p-6 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#00A859] text-xs font-bold uppercase tracking-wider mb-1">
            <Package className="w-4 h-4" />
            <span>Warehouse Control System</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">Quản Lý Kho Hàng: {user?.name}</h1>
          <p className="text-xs text-gray-300 mt-1">
            Theo dõi tồn kho linh kiện, kiểm kê nhập xuất và điều phối hàng hóa cho hệ thống showroom.
          </p>
        </div>
        <div className="hidden md:block">
          <span className="bg-[#00A859] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {user?.roleName}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Đơn xuất kho chờ đóng gói</span>
            <Truck className="w-4 h-4 text-[#E30019]" />
          </div>
          <div className="text-2xl font-bold text-[#040004] font-heading">24</div>
          <p className="text-[11px] text-gray-500 mt-1">Đơn giao hàng hỏa tốc</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Tổng sản phẩm tồn kho</span>
            <Layers className="w-4 h-4 text-[#00A859]" />
          </div>
          <div className="text-2xl font-bold text-[#00A859] font-heading">1,420</div>
          <p className="text-[11px] text-gray-500 mt-1">Linh kiện & Gear sẵn có</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Sản phẩm sắp hết hàng</span>
            <AlertTriangle className="w-4 h-4 text-[#FB8C00]" />
          </div>
          <div className="text-2xl font-bold text-[#FB8C00] font-heading">8</div>
          <p className="text-[11px] text-gray-500 mt-1">Cần nhập bổ sung</p>
        </div>
      </div>
    </div>
  )
}
