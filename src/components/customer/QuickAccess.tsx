import { quickCategories, brandPartners, type QuickCategoryItem } from '@/mocks/quickAccess.mock'

export type { QuickCategoryItem }

export const QuickAccess = () => {

  const handleScrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="space-y-6">
      {/* 1. Quick Category Access Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-heading text-[#040004]">
          Truy cập nhanh
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickCategories.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollToTarget(item.targetId)}
                className="bg-white border border-[#E0E0E0] rounded-[8px] p-3.5 flex flex-col items-center justify-center gap-2 hover:border-[#E30019] hover:shadow-md transition-mechanical group cursor-pointer text-center"
              >
                <div className="w-9 h-9 rounded-[4px] bg-[#F4F5F7] group-hover:bg-[#FEECEE] flex items-center justify-center transition-mechanical">
                  <IconComponent className="w-5 h-5 text-gray-700 group-hover:text-[#E30019] transition-mechanical" />
                </div>
                <span className="text-xs font-semibold text-[#040004] group-hover:text-[#E30019] transition-mechanical leading-tight">
                  {item.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Official Brand Partners Sub-panel */}
      <div className="bg-white border border-[#E0E0E0] rounded-[8px] p-5 space-y-3 shadow-sm">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          THƯƠNG HIỆU ĐỐI TÁC CHÍNH HÃNG
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {brandPartners.map((brand, idx) => (
            <div
              key={idx}
              className="bg-[#F4F5F7] border border-[#E0E0E0]/80 rounded-[4px] px-4 py-2.5 font-bold text-xs text-[#040004] hover:border-[#E30019] hover:text-[#E30019] hover:bg-white transition-mechanical cursor-pointer flex items-center justify-center text-center tracking-tight"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
