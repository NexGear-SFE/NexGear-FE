import { useState } from 'react'
import { Eye, EyeOff, Check, AlertTriangle } from 'lucide-react'
import type { ForgotStep } from '@/types/common/auth.type'
import { PwInput } from './password/PwInput'
import { PasswordStrengthChecks } from './password/PasswordStrengthChecks'
import { ForgotPasswordModal } from './password/ForgotPasswordModal'

export function PasswordSection() {
  // ── Change Password State ──────────────────────────────────────────────────
  const [curPass, setCurPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confPass, setConfPass] = useState('')
  const [showCur, setShowCur] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [pwSuccess, setPwSuccess] = useState(false)
  const [pwError, setPwError] = useState('')
  const [savingPw, setSavingPw] = useState(false)

  const pwTooShort = newPass.length > 0 && newPass.length < 8
  const pwMismatch = confPass.length > 0 && newPass !== confPass
  const pwValid =
    newPass.length >= 8 &&
    newPass === confPass &&
    curPass.length > 0 &&
    !savingPw

  const pwChecks = [
    { label: 'Ít nhất 8 ký tự', ok: newPass.length >= 8 },
    { label: 'Có chữ hoa (A–Z)', ok: /[A-Z]/.test(newPass) },
    { label: 'Có chữ thường (a–z)', ok: /[a-z]/.test(newPass) },
    { label: 'Có chữ số (0–9)', ok: /[0-9]/.test(newPass) },
  ]

  // ── Forgot Password Modal State ────────────────────────────────────────────
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotStep, setForgotStep] = useState<ForgotStep>('email')
  const [forgotEmail, setForgotEmail] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpCountdown, setOtpCountdown] = useState(0)
  const [resetNewPass, setResetNewPass] = useState('')
  const [resetConfPass, setResetConfPass] = useState('')
  const [showResetNew, setShowResetNew] = useState(false)
  const [showResetConf, setShowResetConf] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)

  function startOtpCountdown() {
    setOtpCountdown(60)
    const interval = setInterval(() => {
      setOtpCountdown((v) => {
        if (v <= 1) {
          clearInterval(interval)
          return 0
        }
        return v - 1
      })
    }, 1000)
  }

  function handleSendOtp() {
    if (!forgotEmail.trim()) return
    setForgotLoading(true)
    setTimeout(() => {
      setForgotLoading(false)
      setForgotStep('otp')
      startOtpCountdown()
    }, 1200)
  }

  function handleVerifyOtp() {
    if (otpValue.length < 4) {
      setOtpError('Vui lòng nhập mã OTP đầy đủ.')
      return
    }
    if (otpValue === '0000') {
      setOtpError('Mã OTP không hợp lệ. Vui lòng thử lại.')
      return
    }
    setForgotLoading(true)
    setTimeout(() => {
      setForgotLoading(false)
      setOtpError('')
      setForgotStep('reset')
    }, 1000)
  }

  function handleResetPassword() {
    if (resetNewPass.length < 8 || resetNewPass !== resetConfPass) return
    setForgotLoading(true)
    setTimeout(() => {
      setForgotLoading(false)
      setForgotStep('done')
    }, 1200)
  }

  function exitForgot() {
    setShowForgotModal(false)
    setForgotStep('email')
    setForgotEmail('')
    setOtpValue('')
    setOtpError('')
    setOtpCountdown(0)
    setResetNewPass('')
    setResetConfPass('')
    setForgotLoading(false)
  }

  function handleUpdatePassword() {
    setSavingPw(true)
    setPwError('')
    setTimeout(() => {
      setSavingPw(false)
      setCurPass('')
      setNewPass('')
      setConfPass('')
      setPwSuccess(true)
      setTimeout(() => setPwSuccess(false), 3000)
    }, 900)
  }

  return (
    <>
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-5 shadow-xs self-start h-full flex flex-col">
        <div className="flex items-center">
          <span className="h-5 w-1 bg-[#E30019] rounded-full inline-block mr-2" />
          <h2 className="font-heading text-lg font-bold text-[#040004]">
            Bảo mật & Mật khẩu
          </h2>
        </div>

        {pwSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#00A859] rounded text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>Đổi mật khẩu thành công.</span>
          </div>
        )}

        {pwError && (
          <div className="p-3 bg-red-50 border border-red-200 text-[#E30019] rounded text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{pwError}</span>
          </div>
        )}

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-xs font-semibold text-[#040004] mb-1.5">
              Mật khẩu hiện tại <span className="text-[#E30019]">*</span>
            </label>
            <div className="relative">
              <input
                type={showCur ? 'text' : 'password'}
                required
                value={curPass}
                onChange={(e) => setCurPass(e.target.value)}
                className="input-gaming w-full pr-11"
              />
              <button
                type="button"
                onClick={() => setShowCur(!showCur)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 p-1 flex items-center justify-center hover:text-slate-600 transition-colors"
              >
                {showCur ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <PwInput
              label="Mật khẩu mới *"
              value={newPass}
              onChange={setNewPass}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              placeholder="Tối thiểu 8 ký tự"
              error={pwTooShort ? 'Mật khẩu phải có ít nhất 8 ký tự' : undefined}
            />
            {newPass.length > 0 && <PasswordStrengthChecks checks={pwChecks} />}
          </div>

          <PwInput
            label="Xác nhận mật khẩu mới *"
            value={confPass}
            onChange={setConfPass}
            show={showConf}
            onToggle={() => setShowConf((v) => !v)}
            placeholder="Nhập lại mật khẩu mới"
            error={pwMismatch ? 'Mật khẩu không khớp' : undefined}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E0E0E0] mt-auto">
          <button
            type="button"
            onClick={() => {
              setShowForgotModal(true)
              setForgotStep('email')
            }}
            className="text-blue-500 text-xs font-medium underline hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            Quên mật khẩu?
          </button>
          <button
            type="button"
            className={`btn-secondary py-2.5 px-4 text-xs font-medium justify-center transition-all w-full sm:w-auto ${
              pwValid
                ? 'opacity-100 cursor-pointer shadow-xs'
                : 'opacity-50 cursor-not-allowed shadow-none'
            }`}
            disabled={!pwValid}
            onClick={handleUpdatePassword}
          >
            {savingPw && (
              <span className="inline-block w-3.5 h-3.5 border-2 border-slate-500 border-t-white rounded-full animate-spin mr-1.5" />
            )}
            Cập nhật mật khẩu
          </button>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotModal}
        step={forgotStep}
        email={forgotEmail}
        otpValue={otpValue}
        otpError={otpError}
        otpCountdown={otpCountdown}
        resetNewPass={resetNewPass}
        resetConfPass={resetConfPass}
        showResetNew={showResetNew}
        showResetConf={showResetConf}
        loading={forgotLoading}
        onChangeEmail={setForgotEmail}
        onChangeOtp={setOtpValue}
        onChangeResetNewPass={setResetNewPass}
        onChangeResetConfPass={setResetConfPass}
        onToggleShowResetNew={() => setShowResetNew((v) => !v)}
        onToggleShowResetConf={() => setShowResetConf((v) => !v)}
        onSendOtp={handleSendOtp}
        onVerifyOtp={handleVerifyOtp}
        onResetPassword={handleResetPassword}
        onResendOtp={() => {
          setOtpValue('')
          setOtpError('')
          startOtpCountdown()
        }}
        onClose={exitForgot}
      />
    </>
  )
}
