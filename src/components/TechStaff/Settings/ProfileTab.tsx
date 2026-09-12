import { useState } from "react";
import { TECH_STAFF_USER } from "@/mocks/staff.mock";
import { Camera, Check, AlertTriangle } from "lucide-react";

export function ProfileTab() {
  const ORIG_NAME = TECH_STAFF_USER.name;
  const ORIG_PHONE = "0901234567";
  const [pName, setPName] = useState(ORIG_NAME);
  const [pPhone, setPPhone] = useState(ORIG_PHONE);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");

  function isValidVnPhone(p: string) {
    return /^(0[3|5|7|8|9])[0-9]{8}$/.test(p.replace(/[\s\-.]/g, ""));
  }

  const phoneError =
    pPhone.trim() && !isValidVnPhone(pPhone)
      ? "Số điện thoại không hợp lệ."
      : "";
  const profileDirty = pName !== ORIG_NAME || pPhone !== ORIG_PHONE;
  const profileCanSave =
    profileDirty && pName.trim() && !phoneError && !savingProfile;

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] font-bold tracking-[0.1em] text-[var(--text-400)] uppercase font-body mb-1">
          Hồ sơ cá nhân
        </div>
        <h2 className="m-0 text-[20px] font-bold text-[var(--text-900)] font-heading tracking-[-0.02em]">
          Thông tin cá nhân
        </h2>
        <p className="m-0 mt-1 text-[13px] text-[var(--text-600)] font-body">
          Quản lý thông tin hồ sơ cá nhân của bạn.
        </p>
      </div>

      <div className="max-w-[560px]">
        {/* ── Profile card ── */}
        <div className="w-[62%] min-w-[300px]">
          <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
            {/* Card header */}
            <div className="px-5 py-[18px] border-b border-[var(--surface-400)] flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <img
                  src={TECH_STAFF_USER.avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[var(--surface-400)]"
                />
                <div className="absolute inset-0 rounded-full bg-[var(--surface-400)] flex items-center justify-center text-[var(--text-600)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <Camera size={20} />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[var(--text-900)] text-[15px] font-bold font-heading">
                  {pName}
                </div>
                <div className="text-[var(--text-600)] text-[12px] mt-0.5 font-body">
                  techstaff@gmail.com
                </div>
              </div>
              <div className="bg-[var(--brand-50)] text-[var(--brand-400)] text-[10px] font-bold px-2 py-[3px] rounded tracking-[0.05em] font-body shrink-0 uppercase">
                TECH STAFF
              </div>
            </div>

            {/* Form fields */}
            <div className="px-5 py-5 flex flex-col gap-4">
              {profileSuccess && (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-green-50 border border-green-200/50 rounded-lg">
                  <Check size={18} className="text-green-500" />
                  <span className="text-green-500 text-[13px] font-body font-semibold">
                    Đã lưu thay đổi thành công
                  </span>
                </div>
              )}
              {profileError && (
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-red-50 border border-red-200/50 rounded-lg">
                  <AlertTriangle size={16} className="text-red-400" />
                  <span className="text-red-400 text-[13px] font-body">
                    {profileError}
                  </span>
                </div>
              )}

              <div>
                <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
                  Họ và tên <span className="text-red-400">*</span>
                </label>
                <input
                  value={pName}
                  onChange={(e) => {
                    setPName(e.target.value);
                    setProfileError("");
                  }}
                  className="w-full h-[42px] px-3.5 bg-white border border-[var(--surface-400)] rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors duration-150 focus:border-[var(--brand-500)]"
                />
                {!pName.trim() && (
                  <div className="text-[12px] text-red-400 mt-1 font-body flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Họ và tên là bắt buộc.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
                  Email
                </label>
                <input
                  value="techstaff@gmail.com"
                  readOnly
                  className="w-full h-[42px] px-3.5 bg-[var(--surface-200)] border border-[var(--surface-400)] rounded-md text-[var(--text-600)] text-[14px] font-body outline-none cursor-default"
                />
                <div className="text-[11px] text-[var(--text-400)] mt-1 font-body">
                  Email không thể thay đổi. Liên hệ quản trị hệ thống để cập nhật.
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
                  Số điện thoại <span className="text-red-400">*</span>
                </label>
                <input
                  value={pPhone}
                  onChange={(e) => {
                    setPPhone(e.target.value);
                    setProfileError("");
                  }}
                  placeholder="0901234567"
                  className={`w-full h-[42px] px-3.5 bg-white border rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors duration-150 focus:border-[var(--brand-500)] ${phoneError ? 'border-red-400' : 'border-[var(--surface-400)]'}`}
                />
                {phoneError && (
                  <div className="text-[12px] text-red-400 mt-1 font-body flex items-center gap-1.5">
                    <AlertTriangle size={14} /> {phoneError}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">
                  Vai trò
                </label>
                <input
                  value="Nhân viên kỹ thuật"
                  readOnly
                  className="w-full h-[42px] px-3.5 bg-[var(--surface-200)] border border-[var(--surface-400)] rounded-md text-[var(--text-600)] text-[14px] font-body outline-none cursor-default"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3.5 border-t border-[var(--surface-400)] flex gap-2.5 justify-end bg-white">
              <button
                className={`h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer transition-colors duration-100
                  ${profileDirty ? 'hover:bg-[var(--surface-400)] opacity-100' : 'opacity-50 cursor-default'}
                `}
                disabled={!profileDirty}
                onClick={() => {
                  setPName(ORIG_NAME);
                  setPPhone(ORIG_PHONE);
                  setProfileError("");
                }}
              >
                Hủy
              </button>
              <button
                className={`h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body flex items-center gap-2 transition-colors duration-100
                  ${profileCanSave ? 'hover:bg-[var(--brand-600)] cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'}
                `}
                disabled={!profileCanSave}
                onClick={() => {
                  setSavingProfile(true);
                  setTimeout(() => {
                    setSavingProfile(false);
                    setProfileSuccess(true);
                    setTimeout(() => setProfileSuccess(false), 3000);
                  }, 900);
                }}
              >
                {savingProfile && (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-[var(--text-400)] border-t-white rounded-full animate-spin" />
                )}
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
