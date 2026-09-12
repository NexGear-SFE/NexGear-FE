import { useState } from "react";
import { User, Settings as SettingsIcon } from "lucide-react";
import { INITIAL_WARRANTY_PROVIDERS, type WarrantyProvider } from "@/mocks/techstaff/warranty.mock";
import { TECH_STAFF_USER } from "@/mocks/techstaff/staff.mock";

import { WarrantyTab } from "@/components/techstaff/WarrantyTab";
import { SharedAccountSettings } from "@/components/common/SharedAccountSettings";
import type { UserProfile } from "@/types/account.type";

type SettingsTab = "account" | "warranty";

export function Settings() {
  const [providers, setProviders] = useState<WarrantyProvider[]>(INITIAL_WARRANTY_PROVIDERS);
  const [tab, setTab] = useState<SettingsTab>("account");

  const SECTION_TABS = [
    { key: "account" as SettingsTab, label: "Tài khoản", icon: <User size={16} /> },
    { key: "warranty" as SettingsTab, label: "Cấu hình bảo hành", icon: <SettingsIcon size={16} /> },
  ];

  const techStaffUser: UserProfile = {
    name: TECH_STAFF_USER.name,
    email: TECH_STAFF_USER.email,
    phone: "0901234567",
    roleName: "Nhân viên kỹ thuật",
    roleBadge: "TECH STAFF",
    roleDescription: "Nhân viên kỹ thuật xử lý đơn bảo hành và sửa chữa",
    avatarUrl: TECH_STAFF_USER.avatar,
    avatarInitials: "TS",
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden min-h-0 bg-[#F4F5F7]">
      {/* ── TOP TABS ── */}
      <div className="flex items-center gap-2 px-8 pt-6 pb-0 bg-white border-b border-[#E0E0E0] shrink-0">
        {SECTION_TABS.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2.5 px-4 py-3 border-b-2 cursor-pointer text-[14px] font-body transition-all duration-100
                ${isActive
                  ? "border-[#E30019] text-[#E30019] font-bold"
                  : "border-transparent text-slate-600 font-medium hover:text-slate-900 hover:border-slate-300"
                }
              `}
            >
              <span className="flex items-center justify-center">
                {t.icon}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── RIGHT CONTENT ── */}
      <div className="flex-1 overflow-y-auto py-8 px-8 lg:px-12 bg-white">
        {tab === "account" && (
          <div className="max-w-[1000px] mx-auto">
            <div className="mb-6">
              <div className="text-[11px] font-bold tracking-[0.1em] text-slate-400 uppercase font-body mb-1">
                Tài khoản
              </div>
              <h2 className="m-0 text-[20px] font-bold text-[#040004] font-heading tracking-[-0.02em]">
                Thông tin tài khoản
              </h2>
              <p className="m-0 mt-1 text-[13px] text-[#636363] font-body">
                Quản lý thông tin và bảo mật tài khoản của bạn.
              </p>
            </div>
            {/* The SharedAccountSettings has its own grid, which we want to use here */}
            {/* We will omit the onBack to hide the "Cài đặt tài khoản" header since we render our own above */}
            <div className="-mt-6">
              <SharedAccountSettings user={techStaffUser} />
            </div>
          </div>
        )}
        {tab === "warranty" && (
          <div className="max-w-[1200px] mx-auto">
            <WarrantyTab providers={providers} setProviders={setProviders} />
          </div>
        )}
      </div>
    </div>
  );
}
