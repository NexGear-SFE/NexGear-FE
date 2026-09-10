import { useState, useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { CATEGORIES_DATA, type CategoryItem, type SubcategoryGroup } from '@/mocks/category.mock'

export type { CategoryItem, SubcategoryGroup }

interface CategorySidebarProps {
  activeCategoryId?: string
  onSelectCategory?: (categoryId: string) => void
}

export const CategorySidebar = ({ activeCategoryId, onSelectCategory }: CategorySidebarProps) => {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null)
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnterItem = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setHoveredCategoryId(id)
  }

  const handleMouseLeaveContainer = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategoryId(null)
    }, 150)
  }

  const handleMouseEnterPopup = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const toggleMobileAccordion = (id: string) => {
    setExpandedMobileId((prev) => (prev === id ? null : id))
  }

  const activeHoveredItem = CATEGORIES_DATA.find((cat) => cat.id === hoveredCategoryId)

  return (
    <div className="relative h-full" onMouseLeave={handleMouseLeaveContainer}>
      <aside className="bg-white border border-[#E0E0E0] rounded-[8px] overflow-hidden shadow-sm h-full flex flex-col justify-between">
        <div>
          {/* Header Title */}
          <div className="px-4 py-3.5 bg-white border-b border-[#F0F0F0] text-xs font-bold text-gray-500 tracking-wider uppercase">
            Danh mục
          </div>

          {/* Category List */}
          <nav className="divide-y divide-[#F4F5F7]">
            {CATEGORIES_DATA.map((item) => {
              const Icon = item.icon
              const isActive = activeCategoryId === item.id || hoveredCategoryId === item.id
              const isMobileExpanded = expandedMobileId === item.id

              return (
                <div key={item.id} className="w-full">
                  <button
                    type="button"
                    onMouseEnter={() => handleMouseEnterItem(item.id)}
                    onClick={() => {
                      onSelectCategory?.(item.id)
                      toggleMobileAccordion(item.id)
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-mechanical group cursor-pointer ${
                      isActive
                        ? 'bg-[#FEECEE]/60 text-[#E30019]'
                        : 'text-[#040004] hover:text-[#E30019] hover:bg-[#FEECEE]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-mechanical ${
                          isActive ? 'text-[#E30019]' : 'text-gray-600 group-hover:text-[#E30019]'
                        }`}
                      />
                      <span className="font-semibold text-sm tracking-tight truncate">{item.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-mechanical ${
                        isMobileExpanded ? 'rotate-90 text-[#E30019]' : isActive ? 'text-[#E30019]' : 'text-gray-400 group-hover:text-[#E30019]'
                      }`}
                    />
                  </button>

                  {/* Inline Mobile Accordion Subcategory Panel */}
                  {isMobileExpanded && item.subgroups && item.subgroups.length > 0 && (
                    <div className="lg:hidden bg-[#FAFBFD] px-6 py-3 border-t border-b border-[#E0E0E0]/60 space-y-3">
                      {item.subgroups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-1.5">
                          <h5 className="text-xs font-bold text-gray-700 font-heading">{group.title}</h5>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {group.items.map((subItem, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                onClick={() => {
                                  onSelectCategory?.(item.id)
                                  setHoveredCategoryId(null)
                                }}
                                className="text-[11px] bg-white border border-[#E0E0E0] text-gray-700 px-2 py-1 rounded-[4px] hover:border-[#E30019] hover:text-[#E30019] transition-mechanical"
                              >
                                {subItem}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Hover Subcategory Mega-menu Flyout Panel */}
      {activeHoveredItem && activeHoveredItem.subgroups && activeHoveredItem.subgroups.length > 0 && (
        <div
          onMouseEnter={handleMouseEnterPopup}
          onMouseLeave={handleMouseLeaveContainer}
          className="hidden lg:block absolute left-full top-0 ml-2 z-50 w-[600px] xl:w-[720px] bg-white border border-[#E0E0E0] rounded-[8px] p-6 shadow-xl animate-in fade-in duration-100"
        >
          {/* Subcategory Header */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-gray-100 relative">
            <div className="relative">
              <h3 className="font-bold text-xl text-[#040004] font-heading leading-none">
                {activeHoveredItem.name}
              </h3>
              <div className="absolute -bottom-4 left-0 w-12 h-0.5 bg-[#E30019]" />
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectCategory?.(activeHoveredItem.id)
                setHoveredCategoryId(null)
              }}
              className="text-sm font-semibold text-[#E30019] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Subcategory Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {activeHoveredItem.subgroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <h4 className="font-bold text-sm text-[#040004] tracking-tight border-b border-gray-100 pb-2 font-heading">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((subItem, iIdx) => (
                    <li key={iIdx}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCategory?.(activeHoveredItem.id)
                          setHoveredCategoryId(null)
                        }}
                        className="text-xs sm:text-sm text-gray-600 hover:text-[#E30019] transition-mechanical cursor-pointer text-left block w-full hover:translate-x-0.5 font-medium"
                      >
                        {subItem}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
