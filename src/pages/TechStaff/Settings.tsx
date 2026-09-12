import { useState } from "react";
import { User, Lock, Settings as SettingsIcon } from "lucide-react";
import { INITIAL_WARRANTY_PROVIDERS, type WarrantyProvider } from "@/mocks/warranty.mock";

import { ProfileTab } from "@/components/TechStaff/Settings/ProfileTab";
import { PasswordTab } from "@/components/TechStaff/Settings/PasswordTab";
import { WarrantyTab } from "@/components/TechStaff/Settings/WarrantyTab";

type SettingsTab = "profile" | "password" | "warranty";

export function Settings() {
  const [providers, setProviders] = useState<WarrantyProvider[]>(INITIAL_WARRANTY_PROVIDERS);
  const [tab, setTab] = useState<SettingsTab>("profile");

  const SECTION_TABS = [
    { key: "profile" as SettingsTab, label: "Hồ sơ cá nhân", icon: <User size={16} /> },
    { key: "password" as SettingsTab, label: "Đổi mật khẩu", icon: <Lock size={16} /> },
    { key: "warranty" as SettingsTab, label: "Cấu hình bảo hành", icon: <SettingsIcon size={16} /> },
  ];

  return (
    <div className="flex flex-1 overflow-hidden min-h-0 bg-white">
      {/* ── LEFT SIDEBAR ── */}
      <div className="w-[236px] shrink-0 border-r border-black/5 py-7 px-3 flex flex-col gap-0.5 overflow-y-auto">
        <div className="text-[10px] font-bold tracking-[0.1em] text-[var(--text-400)] uppercase px-3 mb-2.5 font-body">
          Cài đặt
        </div>
        {SECTION_TABS.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border-none cursor-pointer text-[13px] font-body text-left w-full transition-all duration-100 border-l-2
                ${isActive
                  ? "bg-[var(--brand-50)] text-[var(--brand-400)] font-semibold border-l-[var(--brand-500)]"
                  : "bg-transparent text-[var(--text-600)] font-medium border-l-transparent hover:bg-[var(--surface-200)]"
                }
              `}
            >
              <span className="text-[16px] flex items-center justify-center">
                {t.icon}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── RIGHT CONTENT ── */}
      <div className="flex-1 overflow-y-auto py-8 px-9">
        {tab === "profile" && <ProfileTab />}
        {tab === "password" && <PasswordTab />}
        {tab === "warranty" && <WarrantyTab providers={providers} setProviders={setProviders} />}
      </div>
    </div>
  );
}
