import { Link } from 'react-router-dom'
import { Store, FileText, Settings, Users, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const StoreManagerDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#040004] to-[#1a171a] rounded-xl p-6 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#E30019] text-xs font-bold uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" />
            <span>Store Manager Control Center</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">Chào mừng, {user?.name}!</h1>
          <p className="text-xs text-gray-300 mt-1">
            Quản lý toàn bộ bài viết tin tức, cài đặt cửa hàng và hiệu suất bán hàng tại đây.
          </p>
        </div>
        <div className="hidden md:block">
          <span className="bg-[#E30019] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {user?.roleName}
          </span>
        </div>
      </div>

      {/* Quick Nav Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/storemanager/blogs"
          className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs hover:border-[#E30019] transition-mechanical group"
        >
          <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E30019] flex items-center justify-center mb-3">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#040004] group-hover:text-[#E30019] transition-colors">
            Quản lý Bài viết & Tin Tức
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Xem, tạo mới, chỉnh sửa và xuất bản bài viết tin tức GearGo.
          </p>
          <div className="flex items-center gap-1 text-xs text-[#E30019] font-bold mt-4">
            <span>Truy cập ngay</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/storemanager/settings"
          className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs hover:border-[#E30019] transition-mechanical group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1E88E5] flex items-center justify-center mb-3">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#040004] group-hover:text-[#E30019] transition-colors">
            Cài Đặt Tài Khoản Cửa Hàng
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Cấu hình thông tin cửa hàng, bảo mật và phân quyền cá nhân.
          </p>
          <div className="flex items-center gap-1 text-xs text-[#E30019] font-bold mt-4">
            <span>Truy cập ngay</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <div className="bg-white p-5 rounded-lg border border-[#E0E0E0] shadow-xs opacity-75">
          <div className="w-10 h-10 rounded-lg bg-green-50 text-[#00A859] flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#040004]">
            Báo Cáo Doanh Thu
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Theo dõi doanh số theo thời gian thực và chỉ số tăng trưởng.
          </p>
          <span className="inline-block mt-4 text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded">
            Tính năng sắp ra mắt
          </span>
        </div>
      </div>
    </div>
  )
}
