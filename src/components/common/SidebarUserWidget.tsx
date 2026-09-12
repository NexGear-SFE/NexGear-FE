import { Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SidebarUserWidgetProps {
  settingsPath: string;
}

export function SidebarUserWidget({ settingsPath }: SidebarUserWidgetProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-3 border-t border-[#E0E0E0] bg-slate-50/50 mt-auto shrink-0">
      <div className="flex items-center justify-between bg-white border border-[#E0E0E0] rounded-md p-2 shadow-xs">
        <div className="flex items-center gap-2.5">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-[#E30019] shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://ui-avatars.com/api/?name=NVT&background=E30019&color=fff';
              }}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#E30019] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#040004] truncate">
              {user?.name || 'Người dùng'}
            </span>
            <span className="text-[10px] text-[#636363] truncate">
              {user?.roleName || 'Vai trò'}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate(settingsPath)}
          aria-label="Cài đặt tài khoản"
          title="Cài đặt tài khoản"
          className="p-1.5 text-slate-400 hover:text-[#E30019] hover:bg-red-50 transition-mechanical rounded cursor-pointer shrink-0"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
