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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#040004] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`input-gaming w-full pr-11 ${
            error ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 p-1 flex items-center justify-center hover:text-slate-600 transition-colors"
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

export function PasswordSection() {
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
                type={showCur ? "text" : "password"}
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
              error={pwTooShort ? "Mật khẩu phải có ít nhất 8 ký tự" : undefined}
            />
            {newPass.length > 0 && (
              <div className="grid grid-cols-2 gap-y-[4px] gap-x-2 mt-2">
                {pwChecks.map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold ${c.ok ? "text-emerald-500" : "text-slate-400"}`}>
                      {c.ok ? "✓" : "○"}
                    </span>
                    <span className={`text-[10px] font-medium ${c.ok ? "text-emerald-500" : "text-slate-500"}`}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <PwInput
            label="Xác nhận mật khẩu mới *"
            value={confPass}
            onChange={setConfPass}
            show={showConf}
            onToggle={() => setShowConf((v) => !v)}
            placeholder="Nhập lại mật khẩu mới"
            error={pwMismatch ? "Mật khẩu không khớp" : undefined}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E0E0E0] mt-auto">
          <button
            onClick={() => {
              setShowForgotModal(true);
              setForgotStep("email");
            }}
            className="text-blue-500 text-xs font-medium underline hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            Quên mật khẩu?
          </button>
          <button
            className={`btn-secondary py-2.5 px-4 text-xs font-medium justify-center transition-all w-full sm:w-auto
              ${pwValid ? 'opacity-100 cursor-pointer shadow-xs' : 'opacity-50 cursor-not-allowed shadow-none'}
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
              <span className="inline-block w-3.5 h-3.5 border-2 border-slate-500 border-t-white rounded-full animate-spin mr-1.5" />
            )}
            Cập nhật mật khẩu
          </button>
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
                  onClick={exitForgot}
                  className="w-8 h-8 border-none bg-slate-100 rounded-md cursor-pointer text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-800 transition-colors"
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
                              <div className={`flex-1 h-[2px] ${isPast || isCurrent ? "bg-[#E30019]" : "bg-slate-200"}`} />
                            )}
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0
                              ${isPast ? "bg-emerald-500 text-white" : isCurrent ? "bg-[#E30019] text-white" : "bg-slate-100 text-slate-400"}
                            `}>
                              {isPast ? "✓" : i + 1}
                            </div>
                            {i < 3 && (
                              <div className={`flex-1 h-[2px] ${isPast ? "bg-[#E30019]" : "bg-slate-200"}`} />
                            )}
                          </div>
                          <span className={`text-[10px] whitespace-nowrap ${isCurrent ? "font-semibold text-black" : "font-normal text-slate-500"}`}>
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
                      <label className="block text-xs font-semibold text-[#040004] mb-1.5">Địa chỉ email tài khoản</label>
                      <input
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="email@geargo.vn"
                        className="input-gaming w-full"
                      />
                    </div>
                    <div className="flex justify-between gap-2.5">
                      <button
                        className="btn-outlined py-2 px-5 text-xs font-semibold"
                        onClick={exitForgot}
                      >
                        Hủy
                      </button>
                      <button
                        className={`btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-2
                          ${!forgotEmail.trim() || forgotLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                        `}
                        disabled={!forgotEmail.trim() || forgotLoading}
                        onClick={sendOtp}
                      >
                        {forgotLoading && (
                          <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        Gửi mã OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: OTP */}
                {forgotStep === "otp" && (
                  <div className="flex flex-col gap-4">
                    <div className="text-[13px] text-[#636363] leading-relaxed">
                      Mã OTP đã được gửi đến <strong className="text-[#040004]">{forgotEmail}</strong>.
                      Kiểm tra hộp thư và nhập mã bên dưới.
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#040004] mb-1.5">Mã OTP (6 chữ số)</label>
                      <input
                        value={otpValue}
                        onChange={(e) => {
                          setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6));
                          setOtpError("");
                        }}
                        placeholder="______"
                        maxLength={6}
                        className={`input-gaming w-full font-mono text-center text-xl tracking-[0.3em] h-12 ${otpError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}`}
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
                          onClick={() => {
                            setOtpValue("");
                            setOtpError("");
                            startOtpCountdown();
                          }}
                          className="bg-transparent border-none cursor-pointer text-blue-500 text-[12px] p-0 underline hover:text-blue-600"
                        >
                          Gửi lại OTP
                        </button>
                      )}
                      <div className="flex gap-2">
                        <button
                          className="btn-outlined py-2 px-5 text-xs font-semibold"
                          onClick={exitForgot}
                        >
                          Hủy
                        </button>
                        <button
                          className={`btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-2
                            ${otpValue.length < 4 || forgotLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                          `}
                          disabled={otpValue.length < 4 || forgotLoading}
                          onClick={verifyOtp}
                        >
                          {forgotLoading && (
                            <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                        label="Mật khẩu mới *"
                        value={resetNewPass}
                        onChange={setResetNewPass}
                        show={showResetNew}
                        onToggle={() => setShowResetNew((v) => !v)}
                      />
                      {resetNewPass.length > 0 && (
                        <div className="grid grid-cols-2 gap-y-1 gap-x-3 mt-2.5">
                          {resetChecks.map((c) => (
                            <div key={c.label} className="flex items-center gap-1.5">
                              <span className={`text-[11px] font-bold ${c.ok ? "text-emerald-500" : "text-slate-400"}`}>
                                {c.ok ? "✓" : "○"}
                              </span>
                              <span className={`text-[11px] ${c.ok ? "text-emerald-500" : "text-slate-500"}`}>
                                {c.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <PwInput
                      label="Xác nhận mật khẩu mới *"
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
                        className="btn-outlined py-2 px-5 text-xs font-semibold"
                        onClick={exitForgot}
                      >
                        Hủy
                      </button>
                      <button
                        className={`btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-2
                          ${!resetNewPassValid || forgotLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                        `}
                        disabled={!resetNewPassValid || forgotLoading}
                        onClick={resetPassword}
                      >
                        {forgotLoading && (
                          <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        Đặt lại mật khẩu
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Done */}
                {forgotStep === "done" && (
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
                      className="btn-primary py-2.5 px-6 text-xs font-semibold inline-block"
                      onClick={exitForgot}
                    >
                      Xong
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
