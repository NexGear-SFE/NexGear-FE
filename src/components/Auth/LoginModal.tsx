import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoginModalOpen) {
        closeLoginModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLoginModalOpen, closeLoginModal])

  if (!isLoginModalOpen) return null

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop Overlay (Click to close) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeLoginModal}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl border border-[#E0E0E0] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#F4F5F7] bg-white">
          <div>
            <h2 className="text-xl font-bold text-[#040004] font-heading tracking-tight">
              Đăng nhập tài khoản
            </h2>
            <p className="text-xs text-[#636363] mt-1 font-body">
              Theo dõi đơn hàng dễ dàng và nhận ưu đãi riêng
            </p>
          </div>
          <button
            type="button"
            onClick={closeLoginModal}
            aria-label="Đóng modal"
            className="p-1.5 text-gray-400 hover:text-[#040004] hover:bg-gray-100 rounded-full transition-mechanical cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-4 space-y-4">
          {/* 3rd Party Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-[#E0E0E0] bg-white text-[#040004] py-2.5 px-4 rounded-[4px] font-semibold text-xs transition-mechanical hover:bg-gray-50 hover:border-gray-400 cursor-pointer shadow-xs"
          >
            {/* Google SVG Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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

          {/* Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#E0E0E0]" />
            </div>
            <span className="relative z-10 bg-white px-3 text-[11px] font-bold text-[#636363] uppercase tracking-wider">
              HOẶC
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMsg && (
              <div className="p-2.5 bg-red-50 border border-[#E30019] text-[#E30019] text-xs font-semibold rounded-[4px]">
                {errorMsg}
              </div>
            )}

            {/* Input 1: Phone / Email */}
            <div>
              <label htmlFor="auth-email-input" className="block text-xs font-semibold text-[#040004] mb-1">
                Số điện thoại hoặc Email <span className="text-[#E30019]">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 z-10 pointer-events-none" />
                <input
                  id="auth-email-input"
                  type="text"
                  placeholder="Ví dụ: user@gmail.com, storemanager@gmail.com..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-gaming w-full !pl-9.5 pr-3 py-2 text-xs font-medium"
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div>
              <label htmlFor="auth-password-input" className="block text-xs font-semibold text-[#040004] mb-1">
                Mật khẩu <span className="text-[#E30019]">*</span>
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 z-10 pointer-events-none" />
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu (mặc định: 123456)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-gaming w-full !pl-9.5 !pr-10 py-2 text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  className="absolute right-2.5 z-10 text-gray-400 hover:text-gray-700 transition-mechanical cursor-pointer p-1 flex items-center justify-center"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Options: Remember me & Forgot password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#040004] font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#E30019] focus:ring-[#E30019] accent-[#E30019] cursor-pointer"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Tính năng Quên mật khẩu: Mật khẩu thử nghiệm là 123456')
                }}
                className="text-[#E30019] hover:underline font-semibold"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full py-2.5 text-xs font-bold uppercase tracking-wider mt-2"
            >
              Đăng nhập
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4F5F7] border-t border-[#E0E0E0] text-center text-xs text-[#636363]">
          Chưa có tài khoản?{' '}
          <button
            type="button"
            onClick={() => {
              closeLoginModal()
              navigate('/register')
            }}
            className="text-[#E30019] font-bold hover:underline cursor-pointer bg-transparent border-0 p-0 ml-1"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  )
}
