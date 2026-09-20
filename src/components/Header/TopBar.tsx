import { MapPin, Phone, Wrench } from 'lucide-react'

export const TopBar = () => {
  return (
    <div className="bg-[#040004] text-xs text-gray-300 py-1.5 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left Side: Showrooms & Hotlines */}
        <div className="flex items-center flex-wrap gap-y-1 text-[13px]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E30019]" />
            <span>
              Hệ thống Showroom — <strong className="text-white">12 Chi nhánh</strong>
            </span>
          </div>

          <span className="hidden sm:inline-block h-3 w-[1px] bg-gray-700 mx-3" />

          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>
              Hotline tư vấn: <strong className="text-white">1800–9999</strong>
            </span>
          </div>

          <span className="hidden sm:inline-block h-3 w-[1px] bg-gray-700 mx-3" />

          <div className="flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-gray-400" />
            <span>
              Hỗ trợ kỹ thuật: <strong className="text-white">1800–8888</strong>
            </span>
          </div>
        </div>

        {/* Right Side: Quick Links */}
        <div className="flex items-center gap-4 text-[13px]">
          <a
            href="#order-lookup"
            className="hover:text-white transition-mechanical"
          >
            Tra cứu đơn hàng
          </a>
          <a
            href="#warranty-lookup"
            className="hover:text-white transition-mechanical"
          >
            Tra cứu bảo hành
          </a>
          <a
            href="#tech-news"
            className="hover:text-white transition-mechanical"
          >
            Tin công nghệ
          </a>
        </div>
      </div>
    </div>
  )
}
