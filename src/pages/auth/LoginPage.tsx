import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Tag,
  ShieldCheck,
  Truck,
  Headphones,
  HelpCircle,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email.trim()) {
      setErrorMsg('Vui lòng nhập Email hoặc Số điện thoại!')
      return
    }

    if (!password) {
      setErrorMsg('Vui lòng nhập Mật khẩu!')
      return
    }

    const result = login({ email, password, rememberMe })
    if (result.success && result.user) {
      navigate(result.user.redirectPath)
    } else if (result.error) {
      setErrorMsg(result.error)
    }
  }

  const handleGoogleLogin = () => {
    setEmail('user@gmail.com')
    setPassword('123456')
    const result = login({ email: 'user@gmail.com', password: '123456', rememberMe })
    if (result.success && result.user) {
      navigate(result.user.redirectPath)
    }
  }

  const handleHelpClick = () => {
    alert('Tổng đài hỗ trợ thành viên GearGo:\nHotline: 1800 9999 (Miễn phí, 8h00 - 21h30 hằng ngày)')
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F4F5F7]">
      {/* 1. CỘT TRÁI: BANNER THƯƠNG HIỆU & QUYỀN LỢI (~35% - 40% W) */}
      <div className="w-full lg:w-[38%] xl:w-[35%] bg-[#B30014] p-8 sm:p-10 lg:p-14 flex flex-col justify-between text-white relative overflow-hidden shrink-0">
        {/* Background Mechanical Circles Vector Graphic Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="450" cy="150" r="300" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
            <circle cx="450" cy="150" r="220" stroke="white" strokeWidth="1.5" />
            <circle cx="100" cy="650" r="280" stroke="white" strokeWidth="2" strokeDasharray="12 12" />
            <circle cx="100" cy="650" r="180" stroke="white" strokeWidth="1" />
            <path d="M-50 400 L550 400" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M250 -50 L250 850" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Top Section: Logo Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-[#E30019] text-xl shadow-md font-heading group-hover:scale-105 transition-transform">
              GG
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight text-white font-heading block leading-none">
                GearGo
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 block mt-1 font-body">
                GAMING STORE
              </span>
            </div>
          </Link>
        </div>

        {/* Middle Section: Brand Content & Feature List */}
        <div className="relative z-10 my-8 lg:my-12">
          {/* Badge */}
          <div className="inline-block bg-white/15 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-white uppercase mb-6 border border-white/20">
            THÀNH VIÊN CHÍNH HÃNG
          </div>

          {/* Heading */}
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white">
            Mua sắm thông minh, ưu đãi tối đa
          </h1>

          {/* Subtitle Description */}
          <p className="font-body text-white/80 text-sm leading-relaxed mb-8">
            Đăng ký tài khoản để tận hưởng toàn bộ quyền lợi dành riêng cho thành viên GearGo.
          </p>

          {/* 4 Feature List Items */}
          <div className="space-y-5">
            {/* Item 1 */}
            <div className="flex items-start">
              <div className="bg-white/10 rounded-lg p-2.5 mr-4 shrink-0 flex items-center justify-center text-white border border-white/15">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-0.5 font-heading">
                  Tích điểm mỗi đơn hàng
                </h3>
                <p className="text-xs text-white/75 font-body leading-normal">
                  Nhận 1% giá trị đơn hàng quy đổi thành điểm thành viên.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start">
              <div className="bg-white/10 rounded-lg p-2.5 mr-4 shrink-0 flex items-center justify-center text-white border border-white/15">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-0.5 font-heading">
                  Theo dõi bảo hành dễ dàng
                </h3>
                <p className="text-xs text-white/75 font-body leading-normal">
                  Xem trạng thái bảo hành và lịch sử mua sắm tại 1 nơi.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start">
              <div className="bg-white/10 rounded-lg p-2.5 mr-4 shrink-0 flex items-center justify-center text-white border border-white/15">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-0.5 font-heading">
                  Giao hàng nhanh ưu tiên
                </h3>
                <p className="text-xs text-white/75 font-body leading-normal">
                  Đơn hàng thành viên được ưu tiên đóng gói và xử lý sớm.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start">
              <div className="bg-white/10 rounded-lg p-2.5 mr-4 shrink-0 flex items-center justify-center text-white border border-white/15">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-0.5 font-heading">
                  Hỗ trợ ưu tiên 24/7
                </h3>
                <p className="text-xs text-white/75 font-body leading-normal">
                  Hotline riêng cho thành viên — phản hồi trong 5 phút.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="relative z-10 pt-4 border-t border-white/15 text-xs text-white/70 font-body">
          Cần hỗ trợ? Hotline: <span className="font-bold text-white">1800 9999</span> (Miễn phí)
        </div>
      </div>

      {/* 2. CỘT PHẢI: KHUNG FORM ĐĂNG NHẬP (~60% - 65% W) */}
      <div className="flex-1 lg:w-[62%] xl:w-[65%] flex flex-col justify-between items-center p-4 sm:p-8 lg:p-12 relative overflow-y-auto">
        {/* Top Bar Navigation */}
        <div className="w-full max-w-xl lg:max-w-2xl flex items-center justify-between mb-4 lg:mb-8">
          <Link
            to="/"
            className="text-sm text-[#636363] hover:text-[#040004] transition-colors flex items-center gap-1.5 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>
        </div>

        {/* Login Form Card Container */}
        <div className="w-full max-w-xl lg:max-w-2xl bg-white rounded-[16px] shadow-[0px_10px_30px_rgba(4,0,4,0.1)] p-6 sm:p-10 lg:p-12 border-t-4 border-[#E30019] border-x border-b border-[#E0E0E0] my-auto">
          {/* Card Title */}
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#040004] mb-2">
            Đăng nhập
          </h2>
          <p className="font-body text-sm sm:text-base text-[#636363] mb-6 sm:mb-8">
            Đăng nhập để xem đơn hàng
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message Banner */}
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-[#E30019] text-[#E30019] text-xs font-semibold rounded-[4px]">
                {errorMsg}
              </div>
            )}

            {/* Field 1: Phone / Email */}
            <div>
              <label htmlFor="login-email-phone" className="block text-sm font-semibold text-[#040004] mb-1.5">
                Số điện thoại hoặc Email <span className="text-[#E30019]">*</span>
              </label>
              <input
                id="login-email-phone"
                type="text"
                placeholder="Nhập số điện thoại hoặc email đã đăng ký"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-gaming w-full py-3 px-4 text-sm sm:text-base font-medium"
              />
            </div>

            {/* Field 2: Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-[#040004] mb-1.5">
                Mật khẩu <span className="text-[#E30019]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-gaming w-full pr-11 py-3 px-4 text-sm sm:text-base font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  className="absolute right-3 text-gray-400 hover:text-gray-700 transition-mechanical cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-[2px] text-[#E30019] accent-[#E30019] focus:ring-[#E30019] cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-[#040004] font-medium">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <button
                type="button"
                onClick={() =>
                  alert('Vui lòng liên hệ Hotline: 1800 9999 để được hỗ trợ đặt lại mật khẩu.')
                }
                className="text-xs sm:text-sm font-semibold text-[#E30019] hover:underline cursor-pointer bg-transparent border-0 p-0"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-base mt-6 shadow-sm font-semibold rounded-[4px] bg-[#E30019] hover:bg-[#B30014] cursor-pointer"
            >
              Đăng nhập
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="w-full border-t border-[#E0E0E0]" />
              <span className="absolute bg-white px-3 text-xs font-semibold text-[#636363]">
                HOẶC
              </span>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-[#E0E0E0] bg-white text-[#040004] py-3 px-4 rounded-[4px] font-semibold text-sm transition-mechanical hover:bg-gray-50 hover:border-gray-400 cursor-pointer shadow-xs"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Tiếp tục bằng tài khoản Google</span>
            </button>
          </form>

          {/* Register Link Redirect */}
          <div className="text-center text-xs sm:text-sm text-[#636363] mt-6 pt-4 border-t border-[#F4F5F7]">
            Chưa có tài khoản?{' '}
            <Link
              to="/register"
              className="text-[#E30019] font-semibold hover:underline cursor-pointer ml-1"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-6" />
      </div>

      {/* Floating Help Button */}
      <button
        type="button"
        onClick={handleHelpClick}
        title="Trợ giúp & Hỗ trợ"
        className="fixed bottom-6 right-6 border border-[#E0E0E0] bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:scale-105 transition-all text-[#636363] hover:text-[#E30019] cursor-pointer z-50 flex items-center justify-center"
        aria-label="Trợ giúp"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  )
}
