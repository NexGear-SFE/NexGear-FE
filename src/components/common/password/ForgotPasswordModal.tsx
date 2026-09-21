import { X, AlertTriangle, Check } from 'lucide-react'
import type { ForgotStep } from '@/types/common/auth.type'
import { PwInput } from './PwInput'
import { PasswordStrengthChecks } from './PasswordStrengthChecks'

interface ForgotPasswordModalProps {
  isOpen: boolean
  step: ForgotStep
  email: string
  otpValue: string
  otpError: string
  otpCountdown: number
  resetNewPass: string
  resetConfPass: string
  showResetNew: boolean
  showResetConf: boolean
  loading: boolean
  onChangeEmail: (v: string) => void
  onChangeOtp: (v: string) => void
  onChangeResetNewPass: (v: string) => void
  onChangeResetConfPass: (v: string) => void
  onToggleShowResetNew: () => void
  onToggleShowResetConf: () => void
  onSendOtp: () => void
  onVerifyOtp: () => void
  onResetPassword: () => void
  onResendOtp: () => void
  onClose: () => void
}

export function ForgotPasswordModal({
  isOpen,
  step,
  email,
  otpValue,
  otpError,
  otpCountdown,
  resetNewPass,
  resetConfPass,
  showResetNew,
  showResetConf,
  loading,
  onChangeEmail,
  onChangeOtp,
  onChangeResetNewPass,
  onChangeResetConfPass,
  onToggleShowResetNew,
  onToggleShowResetConf,
  onSendOtp,
  onVerifyOtp,
  onResetPassword,
  onResendOtp,
  onClose,
}: ForgotPasswordModalProps) {
  if (!isOpen) return null

  const resetChecks = [
    { label: 'Ít nhất 8 ký tự', ok: resetNewPass.length >= 8 },
    { label: 'Có chữ hoa (A–Z)', ok: /[A-Z]/.test(resetNewPass) },
    { label: 'Có chữ thường (a–z)', ok: /[a-z]/.test(resetNewPass) },
    { label: 'Có chữ số (0–9)', ok: /[0-9]/.test(resetNewPass) },
  ]
  const resetNewPassValid = resetChecks.every((c) => c.ok) && resetNewPass === resetConfPass

  const steps: ForgotStep[] = ['email', 'otp', 'reset', 'done']
  const stepLabels = ['Email', 'OTP', 'Mật khẩu mới', 'Hoàn thành']
  const currentStepIdx = steps.indexOf(step)

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[400] bg-black/70 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-[401] flex items-center justify-center p-5">
        <div className="bg-white border border-[#E0E0E0] rounded-2xl w-full max-w-[460px] shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Modal header */}
          <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
            <div>
              <div className="text-[16px] font-bold text-[#040004] font-heading">
                Quên mật khẩu
              </div>
              <div className="text-[12px] text-[#636363] mt-0.5">
                Đặt lại mật khẩu qua email và mã OTP.
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 border-none bg-slate-100 rounded-md cursor-pointer text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-6">
            {/* Step indicator */}
            <div className="flex gap-0 mb-6">
              {steps.map((s, i) => {
                const isPast = currentStepIdx > i
                const isCurrent = currentStepIdx === i
                return (
                  <div key={s} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-center w-full">
                      {i > 0 && (
                        <div
                          className={`flex-1 h-[2px] ${
                            isPast || isCurrent ? 'bg-[#E30019]' : 'bg-slate-200'
                          }`}
                        />
                      )}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                          isPast
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-[#E30019] text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isPast ? '✓' : i + 1}
                      </div>
                      {i < 3 && (
                        <div
                          className={`flex-1 h-[2px] ${
                            isPast ? 'bg-[#E30019]' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-[10px] whitespace-nowrap ${
                        isCurrent ? 'font-semibold text-black' : 'font-normal text-slate-500'
                      }`}
                    >
                      {stepLabels[i]}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Step 1: Email */}
            {step === 'email' && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                    Địa chỉ email tài khoản
                  </label>
                  <input
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    placeholder="email@geargo.vn"
                    className="input-gaming w-full"
                  />
                </div>
                <div className="flex justify-between gap-2.5">
                  <button
                    type="button"
                    className="btn-outlined py-2 px-5 text-xs font-semibold"
                    onClick={onClose}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className={`btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-2 ${
                      !email.trim() || loading
                        ? 'opacity-60 cursor-not-allowed'
                        : 'opacity-100 cursor-pointer'
                    }`}
                    disabled={!email.trim() || loading}
                    onClick={onSendOtp}
                  >
                    {loading && (
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    Gửi mã OTP
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: OTP */}
            {step === 'otp' && (
              <div className="flex flex-col gap-4">
                <div className="text-[13px] text-[#636363] leading-relaxed">
                  Mã OTP đã được gửi đến <strong className="text-[#040004]">{email}</strong>. Kiểm tra hộp thư và nhập mã bên dưới.
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#040004] mb-1.5">
                    Mã OTP (6 chữ số)
                  </label>
                  <input
                    value={otpValue}
                    onChange={(e) => onChangeOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="______"
                    maxLength={6}
                    className={`input-gaming w-full font-mono text-center text-xl tracking-[0.3em] h-12 ${
                      otpError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                  />
                  {otpError && (
                    <div className="text-[12px] text-red-400 mt-1.5 flex items-center gap-1.5">
                      <AlertTriangle size={14} /> {otpError}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2.5 flex-wrap">
                  {otpCountdown > 0 ? (
                    <span className="text-[12px] text-[#636363]">
                      Gửi lại OTP sau <strong className="text-[#040004] font-mono">{otpCountdown}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={onResendOtp}
                      className="bg-transparent border-none cursor-pointer text-blue-500 text-[12px] p-0 underline hover:text-blue-600"
                    >
                      Gửi lại OTP
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn-outlined py-2 px-5 text-xs font-semibold"
                      onClick={onClose}
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      className={`btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-2 ${
                        otpValue.length < 4 || loading
                          ? 'opacity-60 cursor-not-allowed'
                          : 'opacity-100 cursor-pointer'
                      }`}
                      disabled={otpValue.length < 4 || loading}
                      onClick={onVerifyOtp}
                    >
                      {loading && (
                        <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      Xác nhận OTP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: New password */}
            {step === 'reset' && (
              <div className="flex flex-col gap-4">
                <div>
                  <PwInput
                    label="Mật khẩu mới *"
                    value={resetNewPass}
                    onChange={onChangeResetNewPass}
                    show={showResetNew}
                    onToggle={onToggleShowResetNew}
                  />
                  {resetNewPass.length > 0 && (
                    <PasswordStrengthChecks checks={resetChecks} textSize="sm" />
                  )}
                </div>
                <PwInput
                  label="Xác nhận mật khẩu mới *"
                  value={resetConfPass}
                  onChange={onChangeResetConfPass}
                  show={showResetConf}
                  onToggle={onToggleShowResetConf}
                  error={
                    resetConfPass.length > 0 && resetNewPass !== resetConfPass
                      ? 'Mật khẩu không khớp'
                      : undefined
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="btn-outlined py-2 px-5 text-xs font-semibold"
                    onClick={onClose}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className={`btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-2 ${
                      !resetNewPassValid || loading
                        ? 'opacity-60 cursor-not-allowed'
                        : 'opacity-100 cursor-pointer'
                    }`}
                    disabled={!resetNewPassValid || loading}
                    onClick={onResetPassword}
                  >
                    {loading && (
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    Đặt lại mật khẩu
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Done */}
            {step === 'done' && (
              <div className="text-center pt-4 pb-2">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-[24px] text-emerald-500 mx-auto mb-4">
                  <Check size={28} />
                </div>
                <div className="text-[#040004] text-[16px] font-bold font-heading mb-2">
                  Đặt lại mật khẩu thành công
                </div>
                <div className="text-[#636363] text-[13px] mb-5">
                  Mật khẩu mới của bạn đã được cập nhật. Hãy dùng mật khẩu mới để đăng nhập lần tiếp theo.
                </div>
                <button
                  type="button"
                  className="btn-primary py-2.5 px-6 text-xs font-semibold inline-block"
                  onClick={onClose}
                >
                  Xong
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
