import { useState } from "react";
import { Eye, EyeOff, Check, AlertTriangle, X } from "lucide-react";

type ForgotStep = "email" | "otp" | "reset" | "done";

function PwInput({
  label,
  value,
  onChange,
  show,
  onToggle,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-[42px] pl-3.5 pr-11 bg-white border rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors duration-150 focus:border-[var(--brand-500)] ${
            error ? "border-red-400" : "border-[var(--surface-400)]"
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-600)] p-1 flex items-center justify-center hover:text-[var(--text-900)]"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <div className="text-[12px] text-red-400 mt-1.5 font-body flex items-center gap-1.5">
          <AlertTriangle size={14} /> {error}
        </div>
      )}
    </div>
  );
}

export function PasswordTab() {
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  const pwTooShort = newPass.length > 0 && newPass.length < 8;
  const pwMismatch = confPass.length > 0 && newPass !== confPass;
  const pwValid =
    newPass.length >= 8 &&
    newPass === confPass &&
    curPass.length > 0 &&
    !savingPw;

  const pwChecks = [
    { label: "Ít nhất 8 ký tự", ok: newPass.length >= 8 },
    { label: "Có chữ hoa (A–Z)", ok: /[A-Z]/.test(newPass) },
    { label: "Có chữ thường (a–z)", ok: /[a-z]/.test(newPass) },
    { label: "Có chữ số (0–9)", ok: /[0-9]/.test(newPass) },
  ];

  // ── Forgot password modal ──────────────────────────────────────────────────
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<ForgotStep>("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [resetNewPass, setResetNewPass] = useState("");
  const [resetConfPass, setResetConfPass] = useState("");
  const [showResetNew, setShowResetNew] = useState(false);
  const [showResetConf, setShowResetConf] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  function startOtpCountdown() {
    setOtpCountdown(60);
    const interval = setInterval(() => {
      setOtpCountdown((v) => {
        if (v <= 1) {
          clearInterval(interval);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }

  function sendOtp() {
    if (!forgotEmail.trim()) return;
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotStep("otp");
      startOtpCountdown();
    }, 1200);
  }

  function verifyOtp() {
    if (otpValue.length < 4) {
      setOtpError("Vui lòng nhập mã OTP đầy đủ.");
      return;
    }
    if (otpValue === "0000") {
      setOtpError("Mã OTP không hợp lệ. Vui lòng thử lại.");
      return;
    }
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setOtpError("");
      setForgotStep("reset");
    }, 1000);
  }

  function resetPassword() {
    if (resetNewPass.length < 8 || resetNewPass !== resetConfPass) return;
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotStep("done");
    }, 1200);
  }

  function exitForgot() {
    setShowForgotModal(false);
    setForgotStep("email");
    setForgotEmail("");
    setOtpValue("");
    setOtpError("");
    setOtpCountdown(0);
    setResetNewPass("");
    setResetConfPass("");
    setForgotLoading(false);
  }

  const resetChecks = [
    { label: "Ít nhất 8 ký tự", ok: resetNewPass.length >= 8 },
    { label: "Có chữ hoa (A–Z)", ok: /[A-Z]/.test(resetNewPass) },
    { label: "Có chữ thường (a–z)", ok: /[a-z]/.test(resetNewPass) },
    { label: "Có chữ số (0–9)", ok: /[0-9]/.test(resetNewPass) },
  ];
  const resetNewPassValid =
    resetChecks.every((c) => c.ok) && resetNewPass === resetConfPass;

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] font-bold tracking-[0.1em] text-[var(--text-400)] uppercase font-body mb-1">
          Bảo mật
        </div>
        <h2 className="m-0 text-[20px] font-bold text-[var(--text-900)] font-heading tracking-[-0.02em]">
          Đổi mật khẩu
        </h2>
        <p className="m-0 mt-1 text-[13px] text-[var(--text-600)] font-body">
          Cập nhật mật khẩu đăng nhập của bạn.
        </p>
      </div>

      <div className="max-w-[420px]">
        <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--surface-400)]">
            <div className="text-[11px] font-bold tracking-[0.08em] text-[var(--text-400)] uppercase font-body mb-0.5">
              Bảo mật
            </div>
            <div className="text-[15px] font-bold text-[var(--text-900)] font-heading">
              Bảo mật & Mật khẩu
            </div>
          </div>

          <div className="px-5 py-[18px] flex flex-col gap-3.5">
            {pwSuccess && (
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-green-50 border border-green-200/50 rounded-lg">
                <Check size={18} className="text-green-500" />
                <span className="text-green-500 text-[13px] font-body font-semibold">
                  Đổi mật khẩu thành công.
                </span>
              </div>
            )}
            {pwError && (
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-200/50 rounded-lg">
                <AlertTriangle size={16} className="text-red-400" />
                <span className="text-red-400 text-[13px] font-body">
                  {pwError}
                </span>
              </div>
            )}

            <PwInput
              label="Mật khẩu hiện tại"
              value={curPass}
              onChange={setCurPass}
              show={showCur}
              onToggle={() => setShowCur((v) => !v)}
            />
            <div>
              <PwInput
                label="Mật khẩu mới"
                value={newPass}
                onChange={setNewPass}
                show={showNew}
                onToggle={() => setShowNew((v) => !v)}
                error={pwTooShort ? "Mật khẩu phải có ít nhất 8 ký tự" : undefined}
              />
              {newPass.length > 0 && (
                <div className="grid grid-cols-2 gap-y-[3px] gap-x-2 mt-2">
                  {pwChecks.map((c) => (
                    <div key={c.label} className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold ${c.ok ? "text-green-500" : "text-[var(--text-400)]"}`}>
                        {c.ok ? "✓" : "○"}
                      </span>
                      <span className={`text-[10px] font-body ${c.ok ? "text-green-500" : "text-[var(--text-600)]"}`}>
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <PwInput
              label="Xác nhận mật khẩu mới"
              value={confPass}
              onChange={setConfPass}
              show={showConf}
              onToggle={() => setShowConf((v) => !v)}
              error={pwMismatch ? "Mật khẩu không khớp" : undefined}
            />
          </div>

          <div className="px-5 py-3.5 border-t border-[var(--surface-400)] flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setShowForgotModal(true);
                setForgotStep("email");
              }}
              className="bg-transparent border-none cursor-pointer text-blue-500 text-[12px] p-0 font-body underline hover:text-blue-600"
            >
              Quên mật khẩu?
            </button>
            <button
              className={`h-9 px-4 bg-[var(--brand-500)] text-white border-none rounded-md text-[12px] font-bold font-body flex items-center gap-[7px] transition-colors duration-100
                ${pwValid ? 'hover:bg-[var(--brand-600)] cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'}
              `}
              disabled={!pwValid}
              onClick={() => {
                setSavingPw(true);
                setPwError("");
                setTimeout(() => {
                  setSavingPw(false);
                  setCurPass("");
                  setNewPass("");
                  setConfPass("");
                  setPwSuccess(true);
                  setTimeout(() => setPwSuccess(false), 3000);
                }, 900);
              }}
            >
              {savingPw && (
                <span className="inline-block w-3 h-3 border-2 border-[var(--text-400)] border-t-white rounded-full animate-spin" />
              )}
              Cập nhật mật khẩu
            </button>
          </div>
        </div>
      </div>

      {/* ══ FORGOT PASSWORD MODAL ═════════════════════════════════════════════ */}
      {showForgotModal && (
        <>
          <div
            onClick={exitForgot}
            className="fixed inset-0 z-[400] bg-black/70 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[401] flex items-center justify-center p-5">
            <div className="bg-white border border-[var(--surface-400)] rounded-2xl w-full max-w-[460px] shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden">
              {/* Modal header */}
              <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between">
                <div>
                  <div className="text-[16px] font-bold text-[var(--text-900)] font-heading">
                    Quên mật khẩu
                  </div>
                  <div className="text-[12px] text-[var(--text-600)] font-body mt-0.5">
                    Đặt lại mật khẩu qua email và mã OTP.
                  </div>
                </div>
                <button
                  onClick={exitForgot}
                  className="w-8 h-8 border-none bg-[var(--surface-400)] rounded-md cursor-pointer text-[var(--text-600)] flex items-center justify-center hover:bg-[var(--surface-500)] hover:text-[var(--text-900)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 py-6">
                {/* Step indicator */}
                <div className="flex gap-0 mb-6">
                  {(["email", "otp", "reset", "done"] as ForgotStep[]).map(
                    (s, i) => {
                      const labels = ["Email", "OTP", "Mật khẩu mới", "Hoàn thành"];
                      const stepIdx = ["email", "otp", "reset", "done"].indexOf(forgotStep);
                      const isPast = stepIdx > i;
                      const isCurrent = stepIdx === i;
                      return (
                        <div key={s} className="flex-1 flex flex-col items-center gap-1">
                          <div className="flex items-center w-full">
                            {i > 0 && (
                              <div className={`flex-1 h-[2px] ${isPast || isCurrent ? "bg-[var(--brand-500)]" : "bg-[var(--surface-400)]"}`} />
                            )}
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0
                              ${isPast ? "bg-green-600 text-white" : isCurrent ? "bg-[var(--brand-500)] text-white" : "bg-[var(--surface-400)] text-[var(--text-400)]"}
                            `}>
                              {isPast ? "✓" : i + 1}
                            </div>
                            {i < 3 && (
                              <div className={`flex-1 h-[2px] ${isPast ? "bg-[var(--brand-500)]" : "bg-[var(--surface-400)]"}`} />
                            )}
                          </div>
                          <span className={`text-[10px] font-body whitespace-nowrap ${isCurrent ? "font-semibold text-black" : "font-normal text-[var(--text-600)]"}`}>
                            {labels[i]}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* Step 1: Email */}
                {forgotStep === "email" && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">Địa chỉ email tài khoản</label>
                      <input
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="email@geargo.vn"
                        className="w-full h-[42px] px-3.5 bg-white border border-[var(--surface-400)] rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors focus:border-[var(--brand-500)]"
                      />
                    </div>
                    <div className="flex justify-between gap-2.5">
                      <button
                        className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
                        onClick={exitForgot}
                      >
                        Hủy
                      </button>
                      <button
                        className={`h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body flex items-center gap-2 transition-colors
                          ${!forgotEmail.trim() || forgotLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-[var(--brand-600)]'}
                        `}
                        disabled={!forgotEmail.trim() || forgotLoading}
                        onClick={sendOtp}
                      >
                        {forgotLoading && (
                          <span className="inline-block w-3.5 h-3.5 border-2 border-[var(--text-400)] border-t-white rounded-full animate-spin" />
                        )}
                        Gửi mã OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: OTP */}
                {forgotStep === "otp" && (
                  <div className="flex flex-col gap-4">
                    <div className="text-[13px] text-[var(--text-600)] font-body leading-relaxed">
                      Mã OTP đã được gửi đến <strong className="text-[var(--text-900)]">{forgotEmail}</strong>.
                      Kiểm tra hộp thư và nhập mã bên dưới.
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">Mã OTP (6 chữ số)</label>
                      <input
                        value={otpValue}
                        onChange={(e) => {
                          setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6));
                          setOtpError("");
                        }}
                        placeholder="______"
                        maxLength={6}
                        className={`w-full h-[42px] px-3.5 bg-white border rounded-md text-[var(--text-900)] font-mono text-[22px] tracking-[0.3em] text-center outline-none transition-colors focus:border-[var(--brand-500)] ${otpError ? 'border-red-400' : 'border-[var(--surface-400)]'}`}
                      />
                      {otpError && (
                        <div className="text-[12px] text-red-400 mt-1.5 font-body flex items-center gap-1.5">
                          <AlertTriangle size={14} /> {otpError}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2.5 flex-wrap">
                      {otpCountdown > 0 ? (
                        <span className="text-[12px] text-[var(--text-600)] font-body">
                          Gửi lại OTP sau <strong className="text-[var(--text-900)] font-mono">{otpCountdown}s</strong>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setOtpValue("");
                            setOtpError("");
                            startOtpCountdown();
                          }}
                          className="bg-transparent border-none cursor-pointer text-blue-500 text-[12px] p-0 font-body underline hover:text-blue-600"
                        >
                          Gửi lại OTP
                        </button>
                      )}
                      <div className="flex gap-2">
                        <button
                          className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
                          onClick={exitForgot}
                        >
                          Hủy
                        </button>
                        <button
                          className={`h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body flex items-center gap-2 transition-colors
                            ${otpValue.length < 4 || forgotLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-[var(--brand-600)]'}
                          `}
                          disabled={otpValue.length < 4 || forgotLoading}
                          onClick={verifyOtp}
                        >
                          {forgotLoading && (
                            <span className="inline-block w-3.5 h-3.5 border-2 border-[var(--text-400)] border-t-white rounded-full animate-spin" />
                          )}
                          Xác nhận OTP
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: New password */}
                {forgotStep === "reset" && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <PwInput
                        label="Mật khẩu mới"
                        value={resetNewPass}
                        onChange={setResetNewPass}
                        show={showResetNew}
                        onToggle={() => setShowResetNew((v) => !v)}
                      />
                      {resetNewPass.length > 0 && (
                        <div className="grid grid-cols-2 gap-y-1 gap-x-3 mt-2.5">
                          {resetChecks.map((c) => (
                            <div key={c.label} className="flex items-center gap-1.5">
                              <span className={`text-[11px] font-bold ${c.ok ? "text-green-500" : "text-[var(--text-400)]"}`}>
                                {c.ok ? "✓" : "○"}
                              </span>
                              <span className={`text-[11px] font-body ${c.ok ? "text-green-500" : "text-[var(--text-600)]"}`}>
                                {c.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <PwInput
                      label="Xác nhận mật khẩu mới"
                      value={resetConfPass}
                      onChange={setResetConfPass}
                      show={showResetConf}
                      onToggle={() => setShowResetConf((v) => !v)}
                      error={
                        resetConfPass.length > 0 && resetNewPass !== resetConfPass
                          ? "Mật khẩu không khớp"
                          : undefined
                      }
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
                        onClick={exitForgot}
                      >
                        Hủy
                      </button>
                      <button
                        className={`h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body flex items-center gap-2 transition-colors
                          ${!resetNewPassValid || forgotLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-[var(--brand-600)]'}
                        `}
                        disabled={!resetNewPassValid || forgotLoading}
                        onClick={resetPassword}
                      >
                        {forgotLoading && (
                          <span className="inline-block w-3.5 h-3.5 border-2 border-[var(--text-400)] border-t-white rounded-full animate-spin" />
                        )}
                        Đặt lại mật khẩu
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Done */}
                {forgotStep === "done" && (
                  <div className="text-center pt-4 pb-2">
                    <div className="w-14 h-14 rounded-full bg-green-50 border-2 border-green-200/50 flex items-center justify-center text-[24px] text-green-500 mx-auto mb-4">
                      <Check size={28} />
                    </div>
                    <div className="text-[var(--text-900)] text-[16px] font-bold font-heading mb-2">
                      Đặt lại mật khẩu thành công
                    </div>
                    <div className="text-[var(--text-600)] text-[13px] font-body mb-5">
                      Mật khẩu mới của bạn đã được cập nhật. Hãy dùng mật khẩu mới để đăng nhập lần tiếp theo.
                    </div>
                    <button
                      className="h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body cursor-pointer hover:bg-[var(--brand-600)] transition-colors inline-block"
                      onClick={exitForgot}
                    >
                      Quay lại đăng nhập
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
