import { MapPin, Lock, CheckCircle, Star, Users } from 'lucide-react'

// Custom Facebook SVG Icon
const FacebookIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

// Custom TikTok SVG Icon
const TikTokIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.89 2.897 2.897 0 0 1-2.89-2.89 2.897 2.897 0 0 1 2.89-2.89c.287 0 .563.044.825.125V9.412a6.326 6.326 0 0 0-.825-.054A6.337 6.337 0 0 0 3.14 15.694 6.337 6.337 0 0 0 9.477 22a6.337 6.337 0 0 0 6.337-6.306V9.61a8.212 8.212 0 0 0 4.775 1.522V7.697a4.796 4.796 0 0 1-1-.011z" />
  </svg>
)

// Custom YouTube SVG Icon
const YoutubeIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export const Footer = () => {
  return (
    <footer className="bg-[#040004] text-gray-300 border-t border-zinc-800 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-zinc-800 text-sm">
          {/* Column 1: Connect With Us */}
          <div className="flex flex-col items-start gap-3">
            {/* Title */}
            <h3 className="font-bold text-white text-base font-heading">
              Kết nối với chúng tôi
            </h3>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-gray-200 hover:bg-[#E30019] hover:text-white hover:border-[#E30019] transition-all cursor-pointer shadow-md"
              >
                <FacebookIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href="#tiktok"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-gray-200 hover:bg-[#E30019] hover:text-white hover:border-[#E30019] transition-all cursor-pointer shadow-md"
              >
                <TikTokIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-gray-200 hover:bg-[#E30019] hover:text-white hover:border-[#E30019] transition-all cursor-pointer shadow-md"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href="#community"
                aria-label="Cộng đồng"
                className="w-10 h-10 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-gray-200 hover:bg-[#E30019] hover:text-white hover:border-[#E30019] transition-all cursor-pointer shadow-md"
              >
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Policies */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white text-base font-heading">
              Chính sách
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#warranty-policy" className="hover:text-white transition-mechanical">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#return-policy" className="hover:text-white transition-mechanical">
                  Chính sách đổi trả 1-1
                </a>
              </li>
              <li>
                <a href="#shipping-terms" className="hover:text-white transition-mechanical">
                  Điều khoản vận chuyển
                </a>
              </li>
              <li>
                <a href="#privacy-policy" className="hover:text-white transition-mechanical">
                  Chính sách bảo mật thông tin
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white text-base font-heading">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                Tư vấn mua hàng: <strong className="text-white font-semibold">1800–9999</strong>
              </li>
              <li>
                Hỗ trợ kỹ thuật: <strong className="text-white font-semibold">1800–8888</strong>
              </li>
              <li>
                Trung tâm bảo hành: <strong className="text-white font-semibold">1800–7777</strong>
              </li>
              <li>
                <a href="#order-track" className="hover:text-white transition-mechanical">
                  Tra cứu đơn hàng trực tuyến
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-mechanical">
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment & Security */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white text-base font-heading">
              Thanh toán & Bảo mật
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Thẻ quốc tế: Visa / Mastercard / JCB</li>
              <li>PayPal & Ví điện tử quốc tế</li>
              <li>QR Pay: MoMo, ZaloPay, VNPay</li>
              <li className="pt-1 text-[#00A859] font-medium flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Đã xác thực & Bảo mật 100%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security Badges Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Left: Location & Copyright */}
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-[#E30019]" />
            <span>© 2026 NexGear. Bảo lưu mọi quyền.</span>
          </div>

          {/* Right: Security Badges */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[4px] px-2.5 py-1 text-xs text-gray-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#00A859]" />
              <span>SSL Bảo mật</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[4px] px-2.5 py-1 text-xs text-gray-300 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#1E88E5]" />
              <span>Người bán xác thực</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[4px] px-2.5 py-1 text-xs text-gray-300 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#FB8C00] fill-[#FB8C00]" />
              <span>Top 1 Gaming Store 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
