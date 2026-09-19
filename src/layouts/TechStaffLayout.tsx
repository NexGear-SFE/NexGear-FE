import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Hammer } from 'lucide-react';
import { TECH_STAFF_USER } from '@/mocks/techstaff/staff.mock';
import type { TechNav } from '@/types/staff.type';
import {
  IcTechMenu,
  IcTechDash,
  IcTechWarranty,
  IcTechSerial,
  IcTechReport,
  IcTechHistory,
  IcTechSettings,
  IcTechBell,
} from '@/components/common/Icons';
import { AccountDropdown } from '@/components/common/AccountDropdown';
import { SidebarUserWidget } from '@/components/common/SidebarUserWidget';
import { useAuth } from '@/hooks/useAuth';

// ─── Nav Configuration ────────────────────────────────────────────────────────
type NavItem = {
  key: TechNav;
  path: string;
  label: string;
  Icon: React.ComponentType;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', path: '/tech-staff', label: 'Bảng điều khiển', Icon: IcTechDash },
  { key: 'warranty', path: '/tech-staff/warranty', label: 'Dịch vụ / Bảo hành', Icon: IcTechWarranty },
  { key: 'serial', path: '/tech-staff/serial', label: 'Kiểm tra Serial', Icon: IcTechSerial },
  { key: 'reports', path: '/tech-staff/reports', label: 'Báo cáo', Icon: IcTechReport },
  { key: 'history', path: '/tech-staff/history', label: 'Lịch sử', Icon: IcTechHistory },
  { key: 'settings', path: '/tech-staff/settings', label: 'Cài đặt', Icon: IcTechSettings },
];

// Maps active nav key to its breadcrumb display label
const NAV_LABELS: Record<TechNav, string> = {
  dashboard: 'Dashboard',
  warranty: 'Dịch vụ / Bảo hành',
  serial: 'Kiểm tra Serial',
  reports: 'Báo cáo',
  history: 'Lịch sử',
  settings: 'Cài đặt',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function TechStaffLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [devModalOpen, setDevModalOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { user } = useAuth();

  // Derive active nav from path
  const activeNav = NAV_ITEMS.find((item) => 
    item.path !== '/tech-staff' ? location.pathname.startsWith(item.path) : location.pathname === item.path
  )?.key || 'dashboard';

  return (
    <div className="min-h-screen bg-[var(--surface-200)] flex">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-[var(--surface-50)] border-r border-[var(--surface-400)] flex flex-col shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[var(--surface-400)] gap-3">
          <div className="w-8 h-8 bg-[var(--brand-500)] rounded-md flex items-center justify-center text-white font-black text-sm shrink-0">
            G
          </div>
          <div className="leading-none">
            <div className="text-body-sm font-bold text-[var(--text-900)] font-heading">GearGo</div>
            <div className="text-[10px] text-[var(--text-600)] uppercase tracking-widest font-semibold mt-0.5">
              Tech Portal
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 flex flex-col gap-0.5 px-3">
          {NAV_ITEMS.map(({ key, path, label, Icon }) => {
            const isActive = key === activeNav;
            const isImplemented = ['dashboard', 'serial', 'settings'].includes(key);
            
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (isImplemented) {
                    navigate(path);
                  } else {
                    setDevModalOpen(true);
                  }
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-body-sm transition-mechanical w-full text-left ${
                  isActive
                    ? 'bg-[var(--error-50)] text-[var(--brand-500)] font-semibold'
                    : 'text-[var(--text-600)] hover:bg-[var(--surface-200)] hover:text-[var(--text-900)] font-medium'
                }`}
              >
                <Icon />
                <span className="flex-1">{label}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        <SidebarUserWidget settingsPath="/tech-staff/settings" />
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-[var(--surface-50)] border-b border-[var(--surface-400)] flex items-center justify-between px-6 shrink-0">
          {/* Left: Toggle + Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle sidebar"
              className="p-2 text-[var(--text-600)] hover:text-[var(--text-900)] transition-mechanical rounded-md hover:bg-[var(--surface-200)]"
            >
              <IcTechMenu />
            </button>
            <nav aria-label="Breadcrumb" className="text-body-sm text-[var(--text-600)]">
              <span>Tech Portal</span>
              <span className="mx-2 opacity-40">/</span>
              <strong className="text-[var(--text-900)] font-semibold">
                {NAV_LABELS[activeNav]}
              </strong>
            </nav>
          </div>

          {/* Right: Bell + User card */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Thông báo"
              className="p-2 text-[var(--text-600)] hover:text-[var(--brand-500)] transition-mechanical rounded-md hover:bg-[var(--surface-200)] relative"
            >
              <IcTechBell />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--brand-500)] rounded-full" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 border border-[var(--surface-400)] rounded-md hover:border-[var(--brand-500)] transition-mechanical cursor-pointer"
              >
                <img
                  src={user?.avatar || TECH_STAFF_USER.avatar}
                  alt={`Avatar của ${user?.name || TECH_STAFF_USER.name}`}
                  className="w-7 h-7 rounded-full object-cover bg-[var(--surface-200)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://ui-avatars.com/api/?name=NVT&background=E30019&color=fff';
                  }}
                />
                <div className="text-left hidden md:block">
                  <div className="text-caption font-bold text-[var(--text-900)] leading-none">
                    {user?.name || TECH_STAFF_USER.name}
                  </div>
                  <div className="text-[10px] text-[var(--text-600)] mt-0.5">{user?.roleName || TECH_STAFF_USER.role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-600)]" />
              </button>
              
              <AccountDropdown 
                isOpen={isAccountDropdownOpen} 
                onClose={() => setIsAccountDropdownOpen(false)} 
                onOpenSettings={() => {
                  navigate('/tech-staff/settings');
                }} 
              />
            </div>
          </div>
        </header>

        {/* Page outlet */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>

      {/* ── Feature in Development Modal ── */}
      {devModalOpen && (
        <>
          <div
            onClick={() => setDevModalOpen(false)}
            className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-[4px]"
          />
          <div className="fixed inset-0 z-[301] flex items-center justify-center p-5 pointer-events-none">
            <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-8 w-full max-w-[360px] shadow-[0_24px_64px_rgba(0,0,0,0.6)] text-center animate-[fade-in_200ms_ease-out] pointer-events-auto">
              <div className="w-16 h-16 rounded-2xl bg-[var(--brand-50)] text-[var(--brand-500)] flex items-center justify-center mx-auto mb-5">
                <Hammer size={32} strokeWidth={1.5} />
              </div>
              <h3 className="m-0 mb-2 text-[18px] font-bold text-[var(--text-900)] font-heading">
                Đang phát triển
              </h3>
              <p className="m-0 mb-6 text-[13.5px] text-[var(--text-600)] font-body leading-[1.6]">
                Tính năng này hiện đang trong giai đoạn phát triển và sẽ sớm được ra mắt trong các phiên bản tiếp theo.
              </p>
              <button
                onClick={() => setDevModalOpen(false)}
                className="btn-primary w-full"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
