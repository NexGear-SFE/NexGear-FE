import { ArrowLeft } from "lucide-react";
import type { UserProfile } from "@/types/account.type";
import { ProfileSection } from "@/components/common/ProfileSection";
import { PasswordSection } from "@/components/common/PasswordSection";

interface SharedAccountSettingsProps {
  user: UserProfile;
  onBack?: () => void;
  pageTitle?: string;
}

export function SharedAccountSettings({ user, onBack, pageTitle = "Cài đặt tài khoản" }: SharedAccountSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      {onBack && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-slate-500 hover:text-[#E30019] text-[#040004] font-medium text-sm transition-mechanical flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Quay lại</span>
          </button>
          <span className="text-slate-300 font-bold">&gt;</span>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-[#040004]">
            {pageTitle}
          </h1>
        </div>
      )}

      {/* Grid Layout: 2/3 Trái, 1/3 Phải */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileSection user={user} />
        </div>
        <div className="lg:col-span-1">
          <PasswordSection />
        </div>
      </div>
    </div>
  );
}
