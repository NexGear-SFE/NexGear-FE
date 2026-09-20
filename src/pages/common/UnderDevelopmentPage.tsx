import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Hammer, Headphones } from 'lucide-react';
import { ROUTES } from '@/constants';

interface UnderDevelopmentPageProps {
  featureName?: string;
}

export function UnderDevelopmentPage({ featureName }: UnderDevelopmentPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-6 text-center select-none font-body">
      <div className="max-w-lg w-full bg-white rounded-2xl p-8 sm:p-12 border border-[#E0E0E0] shadow-xl flex flex-col items-center relative overflow-hidden">
        {/* Top Accent Stripe */}
        <div className="w-full h-2 bg-[#E30019] absolute top-0 left-0 right-0" />

        {/* Development Icon / Illustration Badge */}
        <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-6 text-[#E30019] shadow-xs">
          <Hammer className="w-10 h-10 animate-bounce" />
        </div>

        {/* Status Tag */}
        <div className="px-4 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5">
          <span>🚧 Đang phát triển</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#040004] font-heading mb-3 leading-snug">
          {featureName ? `Tính năng ${featureName}` : 'Tính năng đang được phát triển'}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium mb-8">
          Giao diện và tính năng này hiện đang trong quá trình hoàn thiện bởi đội ngũ phát triển NexGear. Vui lòng quay lại sau hoặc khám phá các danh mục sản phẩm khác!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-3 px-4 border border-[#E0E0E0] hover:bg-slate-50 text-[#040004] font-semibold rounded-md text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500" />
            <span>Quay lại</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.HOME)}
            className="flex-1 py-3 px-4 bg-[#E30019] hover:bg-[#B30014] text-white font-bold rounded-md text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </button>
        </div>

        {/* Footer Support Info */}
        <div className="mt-8 pt-6 border-t border-gray-100 w-full flex items-center justify-center gap-2 text-xs text-gray-500">
          <Headphones className="w-4 h-4 text-[#E30019]" />
          <span>Tổng đài hỗ trợ: <strong className="text-gray-800 font-bold">1800 9999</strong> (Miễn phí)</span>
        </div>
      </div>
    </div>
  );
}
