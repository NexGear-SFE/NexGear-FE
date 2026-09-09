import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Check, Lock, Camera } from 'lucide-react'

interface AccountSettingsPageProps {
  onBack?: () => void
}

export const AccountSettingsPage = ({ onBack }: AccountSettingsPageProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }
  // Form states for profile
  const [fullName, setFullName] = useState('Store Manager')
  const [phone, setPhone] = useState('0923 456 789')
  const [email] = useState('storemanager@gmail.com')
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('')

  // Form states for security / password
  const [currentPassword, setCurrentPassword] = useState('••••••••')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSuccessMsg('Cập nhật thông tin cá nhân thành công!')
    setTimeout(() => setProfileSuccessMsg(''), 3000)
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordErrorMsg('')

    if (!newPassword || newPassword.length < 8) {
      setPasswordErrorMsg('Mật khẩu mới phải có tối thiểu 8 ký tự!')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordErrorMsg('Xác nhận mật khẩu mới không khớp!')
      return
    }

    setPasswordSuccessMsg('Đã cập nhật mật khẩu thành công!')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordSuccessMsg(''), 3000)
  }

  return (
    <div className="space-y-6">
      {/* 4.1 Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="text-slate-500 hover:text-[#E30019] text-[#040004] font-medium text-sm transition-mechanical flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <span>storemanager</span>
        </button>
        <span className="text-slate-300 font-bold">&gt;</span>
        <h1 className="font-heading text-xl md:text-2xl font-bold text-[#040004]">
          Cài đặt tài khoản
        </h1>
      </div>

      {/* Grid Layout: 2/3 Trái, 1/3 Phải */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 4.2 Khối Trái: Thông tin cá nhân (2/3 layout = 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="h-5 w-1 bg-[#E30019] rounded-full inline-block mr-2" />
              <h2 className="font-heading text-lg font-bold text-[#040004]">
                Thông tin cá nhân
              </h2>
            </div>
            {profileSuccessMsg && (
              <span className="bg-emerald-50 text-[#00A859] border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> {profileSuccessMsg}
              </span>
            )}
          </div>

          {/* Khung Avatar lớn */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 bg-slate-50 border border-[#E0E0E0] rounded-lg">
            <div className="relative shrink-0">
              <div className="w-20 h-20 bg-[#E30019] text-white text-2xl font-bold flex items-center justify-center rounded-full shadow-md">
                SM
              </div>
              <button
                type="button"
                title="Đổi ảnh"
                className="absolute bottom-0 right-0 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-xs hover:bg-[#E30019] transition-mechanical cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#040004]">
                  storemanager
                </span>
                <span className="bg-[#E30019] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-1">
                  <Shield className="w-3 h-3" /> SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-[#636363]">
                Quản trị viên toàn quyền hệ thống NexGear Store Manager
              </p>
              <button
                type="button"
                onClick={() => alert('Vui lòng chọn ảnh đại diện từ máy tính')}
                className="btn-outlined py-1 px-3 text-xs font-semibold cursor-pointer"
              >
                Đổi ảnh đại diện
              </button>
            </div>
          </div>

          {/* Form Thông tin */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Họ và tên <span className="text-[#E30019]">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-gaming w-full font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Email đăng nhập
              </label>
              <input
                type="email"
                disabled
                readOnly
                value={email}
                className="input-gaming w-full bg-slate-100 text-slate-500 cursor-not-allowed font-medium"
              />
              <p className="text-[11px] text-[#636363] mt-1.5 italic">
                Email không thể thay đổi. Liên hệ quản trị hệ thống để cập nhật.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Số điện thoại
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-gaming w-full font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Vai trò
              </label>
              <div className="bg-slate-50 border border-[#E0E0E0] rounded-md p-2.5 flex items-center gap-2">
                <span className="bg-[#E30019] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  ADMIN
                </span>
                <span className="text-xs font-semibold text-[#040004]">
                  Super Admin — Store Manager
                </span>
              </div>
            </div>

            {/* Footer Form */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E0E0E0]">
              <button
                type="button"
                onClick={handleBack}
                className="btn-outlined py-2 px-5 text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn-primary py-2 px-5 text-xs font-semibold"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>

        {/* 4.3 Khối Phải: Bảo mật & Mật khẩu (1/3 layout = 1 col) */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-5 shadow-xs self-start">
          <div className="flex items-center">
            <span className="h-5 w-1 bg-[#E30019] rounded-full inline-block mr-2" />
            <h2 className="font-heading text-lg font-bold text-[#040004]">
              Bảo mật & Mật khẩu
            </h2>
          </div>

          {passwordSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#00A859] rounded text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{passwordSuccessMsg}</span>
            </div>
          )}

          {passwordErrorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-[#E30019] rounded text-xs font-semibold">
              {passwordErrorMsg}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Mật khẩu hiện tại <span className="text-[#E30019]">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-gaming w-full pr-8"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Mật khẩu mới <span className="text-[#E30019]">*</span>
              </label>
              <input
                type="password"
                required
                placeholder="Tối thiểu 8 ký tự"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-gaming w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                Xác nhận mật khẩu mới <span className="text-[#E30019]">*</span>
              </label>
              <input
                type="password"
                required
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-gaming w-full"
              />
            </div>

            <button
              type="submit"
              className="btn-secondary w-full py-2.5 font-medium cursor-pointer justify-center shadow-xs"
            >
              Cập nhật mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
