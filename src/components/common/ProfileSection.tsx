import { useState } from "react";
import { Camera, Check, AlertTriangle } from "lucide-react";
import type { UserProfile } from "@/types/account.type";

interface ProfileSectionProps {
  user: UserProfile;
}

export function ProfileSection({ user }: ProfileSectionProps) {
  const [pName, setPName] = useState(user.name);
  const [pPhone, setPPhone] = useState(user.phone);
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
  const profileDirty = pName !== user.name || pPhone !== user.phone;
  const profileCanSave =
    profileDirty && pName.trim() && !phoneError && !savingProfile;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileCanSave) return;
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }, 900);
  };

  const handleCancel = () => {
    setPName(user.name);
    setPPhone(user.phone);
    setProfileError("");
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 space-y-6 shadow-xs h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="h-5 w-1 bg-[#E30019] rounded-full inline-block mr-2" />
          <h2 className="font-heading text-lg font-bold text-[#040004]">
            Thông tin cá nhân
          </h2>
        </div>
        {profileSuccess && (
          <span className="bg-emerald-50 text-[#00A859] border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 animate-in fade-in">
            <Check className="w-3.5 h-3.5" /> Cập nhật thông tin thành công!
          </span>
        )}
        {profileError && (
          <span className="bg-red-50 text-[#E30019] border border-red-200 text-xs font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 animate-in fade-in">
            <AlertTriangle className="w-3.5 h-3.5" /> {profileError}
          </span>
        )}
      </div>

      {/* Khung Avatar lớn */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 bg-slate-50 border border-[#E0E0E0] rounded-lg">
        <div className="relative shrink-0">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover shadow-md border border-[#E0E0E0]"
            />
          ) : (
            <div className="w-20 h-20 bg-[#E30019] text-white text-2xl font-bold flex items-center justify-center rounded-full shadow-md">
              {user.avatarInitials}
            </div>
          )}
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
              {pName}
            </span>
          </div>
          <button
            type="button"
            onClick={() => alert("Vui lòng chọn ảnh đại diện từ máy tính")}
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
            value={pName}
            onChange={(e) => {
              setPName(e.target.value);
              setProfileError("");
            }}
            className="input-gaming w-full font-medium"
          />
          {!pName.trim() && (
            <div className="text-[12px] text-red-400 mt-1 font-body flex items-center gap-1.5">
              <AlertTriangle size={14} /> Họ và tên là bắt buộc.
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#040004] mb-1.5">
            Email đăng nhập
          </label>
          <input
            type="email"
            disabled
            readOnly
            value={user.email}
            className="input-gaming w-full bg-slate-100 text-slate-500 cursor-not-allowed font-medium border-slate-200"
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
            value={pPhone}
            onChange={(e) => {
              setPPhone(e.target.value);
              setProfileError("");
            }}
            className={`input-gaming w-full font-medium ${phoneError ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
          />
          {phoneError && (
            <div className="text-[12px] text-red-400 mt-1.5 font-body flex items-center gap-1.5">
              <AlertTriangle size={14} /> {phoneError}
            </div>
          )}
        </div>

        {/* Footer Form */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E0E0E0]">
          <button
            type="button"
            onClick={handleCancel}
            disabled={!profileDirty || savingProfile}
            className={`btn-outlined py-2 px-5 text-xs font-semibold transition-all ${
              !profileDirty || savingProfile ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={!profileCanSave}
            className={`btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-2 transition-all ${
              !profileCanSave ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {savingProfile && (
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
