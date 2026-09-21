import React from 'react'
import type { HomeContentTab } from '@/types/admin/homeContent.type'
import { HOME_CONTENT_TABS } from '@/constants/homeContent'

interface HomeConfigSubNavProps {
  activeTab: HomeContentTab
  onTabChange: (tab: HomeContentTab) => void
}

export const HomeConfigSubNav: React.FC<HomeConfigSubNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <nav
        role="tablist"
        aria-label="Cấu hình nội dung trang chủ"
        className="bg-gray-100 p-1.5 rounded-2xl inline-flex gap-2 min-w-max"
      >
        {HOME_CONTENT_TABS.map((tab) => {
          const isActive = activeTab === tab.key

          return (
            <button
              key={tab.key}
              role="tab"
              type="button"
              id={`tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.key}`}
              onClick={() => onTabChange(tab.key)}
              className={`text-sm transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#E30019] shadow-sm text-white font-bold rounded-xl px-4 py-2'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 px-4 py-2 font-medium rounded-xl'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
