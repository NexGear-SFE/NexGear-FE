import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Check } from 'lucide-react';

type QuickLoginModalProps = {
  onClose: () => void;
  onGoRegister: () => void;
  onGoFullLogin: () => void;
  onLogin?: () => void;
  onTechLogin?: () => void;
  onStoreManagerLogin?: () => void;
  onWarehouseLogin?: () => void;
  onWarehouseAdminLogin?: () => void;
};

export function QuickLoginModal({
  onClose,
  onGoRegister,
  onGoFullLogin,
  onLogin,
  onTechLogin,
  onStoreManagerLogin,
  onWarehouseLogin,
  onWarehouseAdminLogin,
}: QuickLoginModalProps) {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  const emailNorm = phone.trim().toLowerCase();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  function handleLogin() {
    if (emailNorm === 'storemanager@gmail.com') {
      onStoreManagerLogin?.();
    } else if (emailNorm === 'techstaff@gmail.com') {
      onTechLogin?.();
    } else if (emailNorm === 'warehousestaff@gmail.com') {
      onWarehouseLogin?.();
    } else if (emailNorm === 'warehouseadmin@gmail.com') {
      onWarehouseAdminLogin?.();
    } else {
      onLogin?.();
    }
    onClose();
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[#040004]/55 z-[1000] flex items-center justify-center p-5 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl w-full max-w-[480px] overflow-hidden shadow-2xl transition-standard"
        style={{ animation: 'slideUp 200ms cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Header strip */}
        <div className="bg-[var(--brand-500)] h-1 w-full" />

        <div className="px-8 pt-7 pb-8">
          {/* Title row */}
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <h3 className="m-0 text-[20px] font-heading font-bold text-[var(--text-900)] tracking-tight">
                Đăng nhập tài khoản
              </h3>
              <p className="mt-1.5 mb-0 text-[13px] text-[var(--text-600)] leading-relaxed">
                Theo dõi đơn hàng dễ dàng
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-[var(--text-600)] hover:text-[var(--text-900)] hover:bg-[var(--surface-200)] transition-mechanical -mt-1"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {/* Google SSO */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-[var(--surface-400)] rounded-md font-medium text-body-sm hover:bg-[var(--surface-200)] transition-mechanical"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Tiếp tục bằng tài khoản Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[var(--surface-400)]"></div>
              <span className="text-caption text-[var(--text-600)] uppercase font-semibold">hoặc</span>
              <div className="flex-1 h-px bg-[var(--surface-400)]"></div>
            </div>

            {/* Phone/Email */}
            <div>
              <label className="block text-caption text-[var(--text-600)] uppercase font-semibold mb-1.5 tracking-widest">
                Số điện thoại hoặc Email
              </label>
              <input
                className="input-gaming w-full"
                placeholder="techstaff@gmail.com"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-caption text-[var(--text-600)] uppercase font-semibold mb-1.5 tracking-widest">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  className="input-gaming w-full pr-10"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[var(--text-600)] hover:text-[var(--text-900)] transition-mechanical"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Options row */}
            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setRemember((v) => !v)}
                  className={`w-[18px] h-[18px] rounded-[2px] border-2 flex items-center justify-center transition-mechanical ${
                    remember ? 'bg-[var(--brand-500)] border-[var(--brand-500)]' : 'bg-white border-[var(--surface-400)] group-hover:border-[var(--brand-500)]'
                  }`}
                >
                  {remember && <Check size={12} strokeWidth={3} className="text-white" />}
                </div>
                <span className="text-[13px] text-[var(--text-900)] select-none">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <button
                type="button"
                onClick={onGoFullLogin}
                className="text-[13px] font-semibold text-[var(--brand-500)] hover:text-[var(--brand-600)] transition-mechanical bg-transparent border-none p-0 cursor-pointer"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Role-detected hint banners */}
            {emailNorm === 'storemanager@gmail.com' && (
              <div className="flex gap-2.5 p-3 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 items-start">
                <div>
                  <div className="text-[11px] font-bold text-amber-300 tracking-wider mb-0.5 font-heading">
                    SUPER ADMIN DETECTED
                  </div>
                  <div className="text-[12px] text-slate-400 leading-snug">
                    Sẽ chuyển đến trang quản trị Store Manager sau khi đăng nhập.
                  </div>
                </div>
              </div>
            )}
            {emailNorm === 'techstaff@gmail.com' && (
              <div className="flex gap-2.5 p-3 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 items-start">
                <div>
                  <div className="text-[11px] font-bold text-sky-400 tracking-wider mb-0.5 font-heading">
                    TECH STAFF DETECTED
                  </div>
                  <div className="text-[12px] text-slate-400 leading-snug">
                    Sẽ mở giao diện cổng nhân viên kỹ thuật.
                  </div>
                </div>
              </div>
            )}
            {emailNorm === 'warehousestaff@gmail.com' && (
              <div className="flex gap-2.5 p-3 rounded-lg bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-800 items-start">
                <div>
                  <div className="text-[11px] font-bold text-emerald-300 tracking-wider mb-0.5 font-heading">
                    WAREHOUSE STAFF DETECTED
                  </div>
                  <div className="text-[12px] text-emerald-200/70 leading-snug">
                    Sẽ mở giao diện quản lý kho hàng (Warehouse Staff).
                  </div>
                </div>
              </div>
            )}
            {emailNorm === 'warehouseadmin@gmail.com' && (
              <div className="flex gap-2.5 p-3 rounded-lg bg-gradient-to-br from-indigo-950 to-indigo-900 border border-indigo-800 items-start">
                <div>
                  <div className="text-[11px] font-bold text-indigo-300 tracking-wider mb-0.5 font-heading">
                    WAREHOUSE ADMIN DETECTED
                  </div>
                  <div className="text-[12px] text-indigo-200/70 leading-snug">
                    Sẽ mở giao diện quản trị kho hàng (toàn quyền Admin).
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <button type="button" className="btn-primary w-full h-12 mt-2 text-[15px]" onClick={handleLogin}>
              Đăng nhập
            </button>

            {/* Switch to register */}
            <p className="m-0 text-center text-[13px] text-[var(--text-600)]">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={onGoRegister}
                className="text-[13px] font-bold text-[var(--brand-500)] hover:text-[var(--brand-600)] transition-mechanical bg-transparent border-none p-0 cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
