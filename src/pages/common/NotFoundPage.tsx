import { Link, useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search, ShieldAlert } from 'lucide-react'
import { ROUTES } from '@/constants'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#F4F5F7] min-h-[75vh] py-12 sm:py-20 flex items-center justify-center font-body px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-[#E0E0E0] p-8 sm:p-12 text-center space-y-6 shadow-sm">
          {/* Animated 404 Badge */}
          <div className="relative inline-flex items-center justify-center">
            <span className="text-7xl sm:text-8xl font-extrabold font-heading text-slate-100 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30019] flex items-center justify-center border border-red-100 shadow-xs">
                <ShieldAlert className="w-8 h-8 stroke-[1.75]" />
              </div>
            </div>
          </div>

          {/* Heading & Explanation */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#040004]">
              Không tìm thấy trang
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Trang hoặc sản phẩm bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đường dẫn bị thay đổi.
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-slate-700 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-[6px] transition-all bg-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại trang trước</span>
            </button>

            <Link
              to={ROUTES.HOME}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-[6px] transition-all shadow-xs cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Trang chủ</span>
            </Link>
          </div>

          {/* Helpful Navigation Links */}
          <div className="pt-6 border-t border-gray-100 text-xs text-slate-500 space-y-2">
            <span>Bạn muốn tìm thiết bị công nghệ?</span>
            <div className="flex items-center justify-center gap-4 text-[#E30019] font-medium">
              <Link to={ROUTES.PRODUCTS} className="hover:underline flex items-center gap-1">
                <Search className="w-3.5 h-3.5" />
                <span>Xem tất cả sản phẩm</span>
              </Link>
              <span>·</span>
              <Link to={ROUTES.BLOGS} className="hover:underline">
                Tin tức & Đánh giá
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}
