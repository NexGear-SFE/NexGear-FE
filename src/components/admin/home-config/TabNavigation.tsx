import React from 'react'
import { HomeConfigSubNav } from '@/components/admin/homeContent/HomeConfigSubNav'
import type { HomeContentTab } from '@/types/homeContent.type'
import type { HomeConfigTabId } from '@/types/homeConfig'

export interface TabNavigationProps {
  activeTab: HomeContentTab | HomeConfigTabId
  onTabChange: (tab: HomeContentTab) => void
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  // Normalize 'trust-badges' to 'commitments' for existing tabs compatibility
  const normalizedActiveTab: HomeContentTab =
    activeTab === 'trust-badges' ? 'commitments' : (activeTab as HomeContentTab)

  return (
    <HomeConfigSubNav
      activeTab={normalizedActiveTab}
      onTabChange={onTabChange}
    />
  )
}
