import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Tag,
  ShieldCheck,
  Truck,
  Headphones,
  Eye,
  EyeOff,
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react'

export const RegisterPage = () => {
  const navigate = useNavigate()

  // Form states
  const [fullName, setFullName] = useState('')
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Feedback states
  const [errorMsg, setErrorMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    // Client validation
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập Họ và tên!')
      return
    }

    if (!emailOrPhone.trim()) {
      setErrorMsg('Vui lòng nhập Email hoặc Số điện thoại!')
      return
    }

    if (!password) {
      setErrorMsg('Vui lòng nhập Mật khẩu!')
      return
    }

    if (password.length < 8) {
      setErrorMsg('Mật khẩu phải có độ dài tối thiểu 8 ký tự!')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không trùng khớp!')
      return
    }

    if (!agreeTerms) {
      setErrorMsg('Vui lòng đồng ý với Điều khoản sử dụng & Chính sách bảo mật!')
      return
    }

    // Simulated registration success
    setIsSuccess(true)
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  const handleHelpClick = () => {
    alert('Tổng đài hỗ trợ thành viên GearGo:\nHotline: 1800 9999 (Miễn phí, 8h00 - 21h30 hằng ngày)')
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F4F5F7]">
      {/* 3.1. CỘT TRÁI: BANNER THƯƠNG HIỆU & QUYỀN LỢI (~35% - 40% W) */}
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

      {/* 3.2. CỘT PHẢI: KHUNG FORM ĐĂNG KÝ (~60% - 65% W) */}
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

        {/* Registration Form Card Container */}
        <div className="w-full max-w-xl lg:max-w-2xl bg-white rounded-[16px] shadow-[0px_10px_30px_rgba(4,0,4,0.1)] p-6 sm:p-10 lg:p-12 border-t-4 border-[#E30019] border-x border-b border-[#E0E0E0] my-auto">
          {/* Card Title */}
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#040004] mb-2">
            Đăng ký tài khoản
          </h2>
          <p className="font-body text-sm sm:text-base text-[#636363] mb-6 sm:mb-8">
            Tạo tài khoản để mua sắm nhanh hơn
          </p>

          {/* Success Banner */}
          {isSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-500 rounded-md text-center text-emerald-800 space-y-2 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold font-heading text-base">Đăng ký thành công!</h3>
              <p className="text-xs text-emerald-700">
                Tài khoản thành viên đã được tạo. Đang tự động chuyển sang Đăng nhập...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-[#E30019] text-[#E30019] text-xs font-semibold rounded-[4px]">
                  {errorMsg}
                </div>
              )}

              {/* Field 1: Full Name */}
              <div>
                <label htmlFor="register-fullname" className="block text-sm font-semibold text-[#040004] mb-1.5">
                  Họ và tên <span className="text-[#E30019]">*</span>
                </label>
                <input
                  id="register-fullname"
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-gaming w-full py-3 px-4 text-sm sm:text-base font-medium"
                />
              </div>

              {/* Field 2: Email or Phone */}
              <div>
                <label htmlFor="register-email-phone" className="block text-sm font-semibold text-[#040004] mb-1.5">
                  Email hoặc số điện thoại <span className="text-[#E30019]">*</span>
                </label>
                <input
                  id="register-email-phone"
                  type="text"
                  placeholder="Ví dụ: you@email.com hoặc 0901234567"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="input-gaming w-full py-3 px-4 text-sm sm:text-base font-medium"
                />
              </div>

              {/* Field 3: Password */}
              <div>
                <label htmlFor="register-password" className="block text-sm font-semibold text-[#040004] mb-1.5">
                  Mật khẩu <span className="text-[#E30019]">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tối thiểu 8 ký tự"
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

              {/* Field 4: Confirm Password */}
              <div>
                <label htmlFor="register-confirm-password" className="block text-sm font-semibold text-[#040004] mb-1.5">
                  Nhập lại mật khẩu <span className="text-[#E30019]">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-gaming w-full pr-11 py-3 px-4 text-sm sm:text-base font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    className="absolute right-3 text-gray-400 hover:text-gray-700 transition-mechanical cursor-pointer p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded-[2px] text-[#E30019] accent-[#E30019] focus:ring-[#E30019] cursor-pointer shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-[#040004] font-medium leading-relaxed">
                    Tôi đồng ý với{' '}
                    <a
                      href="#terms"
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Điều khoản sử dụng dịch vụ NexGear-SFE')
                      }}
                      className="text-[#E30019] hover:underline font-medium"
                    >
                      Điều khoản sử dụng
                    </a>{' '}
                    và{' '}
                    <a
                      href="#privacy"
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Chính sách bảo mật thông tin NexGear-SFE')
                      }}
                      className="text-[#E30019] hover:underline font-medium"
                    >
                      Chính sách bảo mật
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-base mt-6 shadow-sm font-semibold rounded-[4px] bg-[#E30019] hover:bg-[#B30014] cursor-pointer"
              >
                Đăng ký tài khoản
              </button>
            </form>
          )}

          {/* Login Link Redirect */}
          <div className="text-center text-xs sm:text-sm text-[#636363] mt-6 pt-4 border-t border-[#F4F5F7]">
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="text-[#E30019] font-semibold hover:underline cursor-pointer ml-1"
            >
              Đăng nhập ngay
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
