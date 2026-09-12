import { useAuth } from '@/hooks/useAuth'
import { User, Mail, Phone, Shield, ShoppingBag, Clock } from 'lucide-react'

export const UserProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 mb-6">
        <div className="flex items-center gap-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#E30019]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#E30019] text-white font-bold text-2xl flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-[#040004] font-heading">{user?.name}</h1>
            <div className="flex items-center gap-3 text-xs text-[#636363] mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#E30019]" />
                {user?.email}
              </span>
              {user?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-500" />
                  {user.phone}
                </span>
              )}
              <span className="inline-flex items-center gap-1 bg-red-50 text-[#E30019] font-bold px-2 py-0.5 rounded">
                <Shield className="w-3 h-3" />
                {user?.roleName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-[#E0E0E0] p-5 shadow-sm">
          <h2 className="text-base font-bold text-[#040004] mb-3 flex items-center gap-2 font-heading">
            <ShoppingBag className="w-5 h-5 text-[#E30019]" />
            Đơn hàng gần đây
          </h2>
          <div className="p-4 bg-[#F4F5F7] rounded border border-dashed border-[#E0E0E0] text-center text-xs text-[#636363]">
            Bạn chưa có đơn hàng nào gần đây.
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E0E0E0] p-5 shadow-sm">
          <h2 className="text-base font-bold text-[#040004] mb-3 flex items-center gap-2 font-heading">
            <Clock className="w-5 h-5 text-[#E30019]" />
            Lịch sử hoạt động
          </h2>
          <div className="p-4 bg-[#F4F5F7] rounded border border-dashed border-[#E0E0E0] text-center text-xs text-[#636363]">
            Đã đăng nhập thành công lúc {new Date().toLocaleTimeString('vi-VN')}.
          </div>
        </div>
      </div>
    </div>
  )
}
