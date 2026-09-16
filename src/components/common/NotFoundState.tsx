import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Home } from 'lucide-react'

export interface NotFoundStateProps {
  title?: string
  description?: string
  actionText?: string
  onAction?: () => void
}

export function NotFoundState({
  title = 'Không tìm thấy sản phẩm',
  description = 'Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.',
  actionText = 'Quay về Trang chủ',
  onAction,
}: NotFoundStateProps) {
  const navigate = useNavigate()

  const handleAction = () => {
    if (onAction) {
      onAction()
    } else {
      navigate('/')
    }
  }

  return (
    <div className="bg-[#F4F5F7] min-h-screen py-12 md:py-20 font-body">
      <div className="max-w-md mx-auto px-4 text-center space-y-5 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-red-50 text-[#E30019] mx-auto flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 stroke-1.5" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-bold font-heading text-[#040004]">{title}</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={handleAction}
            className="inline-flex items-center gap-2 bg-[#E30019] hover:bg-[#cc0016] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-[6px] transition-all cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>{actionText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
