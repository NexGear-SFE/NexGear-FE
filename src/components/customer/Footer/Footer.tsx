import { MapPin, Lock, CheckCircle, Star, Users } from 'lucide-react'
import { FacebookIcon, TikTokIcon, YoutubeIcon } from '@/assets/icons'

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
