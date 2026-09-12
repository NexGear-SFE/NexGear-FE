import type { BlogFilterStatus } from '@/types/blog.type'

interface BlogFilterTabsProps {
  activeFilter: BlogFilterStatus
  onFilterChange: (filter: BlogFilterStatus) => void
  counts: {
    all: number
    published: number
    draft: number
  }
}

export const BlogFilterTabs = ({
  activeFilter,
  onFilterChange,
  counts,
}: BlogFilterTabsProps) => {
  const tabs: { key: BlogFilterStatus; label: string; count: number }[] = [
    { key: 'all', label: 'Tất cả', count: counts.all },
    { key: 'published', label: 'Xuất bản', count: counts.published },
    { key: 'draft', label: 'Bản nháp', count: counts.draft },
  ]

  return (
    <div className="flex items-center gap-2 mb-6">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.key

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onFilterChange(tab.key)}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-mechanical cursor-pointer ${
              isActive
                ? 'bg-[#E30019] text-white shadow-xs'
                : 'bg-transparent border border-[#E0E0E0] text-[#636363] hover:text-[#040004] hover:border-slate-300'
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 font-normal ${
                isActive ? 'text-white/90' : 'text-slate-400'
              }`}
            >
              ({tab.count})
            </span>
          </button>
        )
      })}
    </div>
  )
}
