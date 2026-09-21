import React, { useState, useMemo } from 'react'
import type { TrustBadge, TrustBadgeErrors, IconCategoryFilter } from '@/types/admin/homeConfig.type'

import {
  BADGE_THEMES,
  TRUST_BADGE_PRESET_ICONS,
  resolveLucideIcon,
  getLucideIconIfValid,
  LUCIDE_ICONS_LIBRARY_URL,
} from '@/constants/homeConfigConstants'
import {
  ChevronDown,
  Smile,
  Search,
  ExternalLink,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

interface TrustBadgeItemProps {
  badge: TrustBadge
  index: number
  onChange: (id: number | string, field: keyof TrustBadge, value: string) => void
  errors?: TrustBadgeErrors
}

interface DynamicLucideIconProps {
  icon: string
  className?: string
}

const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({ icon, className }) => {
  const iconComponent = resolveLucideIcon(icon)
  return React.createElement(iconComponent, { className })
}

export const TrustBadgeItem: React.FC<TrustBadgeItemProps> = ({
  badge,
  index,
  onChange,
  errors,
}) => {
  const [showPicker, setShowPicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<IconCategoryFilter>('all')

  // Color theme according to index (0: Emerald, 1: Amber, 2: Purple, 3: Blue)
  const theme = BADGE_THEMES[index % 4] || BADGE_THEMES[0]

  const handleSelectPreset = (iconKey: string) => {
    onChange(badge.id, 'icon', iconKey)
    setShowPicker(false)
    setSearchQuery('')
  }

  // Check validity of current typed icon
  const currentIconStatus = useMemo(() => {
    if (!badge.icon.trim()) return null
    return getLucideIconIfValid(badge.icon)
  }, [badge.icon])

  // Filter preset icons
  const filteredPresets = useMemo(() => {
    return TRUST_BADGE_PRESET_ICONS.filter((preset) => {
      const matchCategory =
        activeCategory === 'all' || preset.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchCategory

      const matchText =
        preset.key.toLowerCase().includes(query) ||
        preset.name.toLowerCase().includes(query) ||
        (preset.emojiEquivalent && preset.emojiEquivalent.includes(query))

      return matchCategory && matchText
    })
  }, [activeCategory, searchQuery])

  // Check if search query matches any Lucide icon outside the presets
  const searchedLucideMatch = useMemo(() => {
    const q = searchQuery.trim()
    if (!q) return null
    return getLucideIconIfValid(q)
  }, [searchQuery])

  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition-colors shadow-xs flex flex-col justify-between">
      <div className="space-y-4">
        {/* Hàng 1: Icon block & Input text cho Icon */}
        <div>
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor={`badge-icon-${badge.id}`}
                className="text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5"
              >
                <span>Icon (Lucide / emoji)</span>
              </label>
              <a
                href={LUCIDE_ICONS_LIBRARY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-red-600 hover:text-red-700 inline-flex items-center gap-1 font-medium transition-colors cursor-pointer bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-full"
                title="Mở kho icon Lucide React để chọn"
              >
                <span>Thư viện Lucide</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              #{index + 1}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Icon Preview Box */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${theme.bgColor} ${theme.iconColor} ${theme.borderColor} shadow-xs transition-transform duration-150 hover:scale-105`}
              title={`Preview icon: ${badge.icon || 'Mặc định'}`}
            >
              <DynamicLucideIcon icon={badge.icon} className="w-5 h-5" />
            </div>

            {/* Icon Text Input with Preset Selector */}
            <div className="relative flex-1">
              <div className="flex rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all bg-white overflow-hidden">
                <input
                  id={`badge-icon-${badge.id}`}
                  type="text"
                  value={badge.icon}
                  onChange={(e) => onChange(badge.id, 'icon', e.target.value)}
                  placeholder="Nhập tên icon Lucide (vd: Cpu, Laptop, ShieldCheck, Zap...)"
                  className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPicker((prev) => !prev)}
                  className="px-2.5 bg-slate-50 hover:bg-slate-100 border-l border-slate-200 text-slate-500 hover:text-slate-800 text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Mở danh sách icon gợi ý"
                >
                  <Smile className="w-3.5 h-3.5 text-slate-400" />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Popover danh sách icon Lucide preset & search */}
              {showPicker && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowPicker(false)}
                  />
                  <div className="absolute left-0 top-full mt-1.5 z-30 w-84 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 text-xs animate-in fade-in zoom-in-95 duration-150">
                    {/* Header Popover with External Link */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-red-600" />
                        <span>Chọn Icon Lucide</span>
                      </div>
                      <a
                        href={LUCIDE_ICONS_LIBRARY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>lucide.dev/icons</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Search inside popover */}
                    <div className="my-2.5">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 focus-within:border-red-500 focus-within:bg-white transition-all">
                        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Tìm icon hoặc gõ tên Lucide (vd: Cpu, Laptop, Shield...)"
                          className="w-full bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400"
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 scrollbar-none">
                      {(
                        [
                          { id: 'all', label: 'Tất cả' },
                          { id: 'warranty', label: 'Bảo hành' },
                          { id: 'shipping', label: 'Vận chuyển' },
                          { id: 'tech', label: 'Công nghệ' },
                          { id: 'service', label: 'Dịch vụ' },
                        ] as const
                      ).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            activeCategory === cat.id
                              ? 'bg-red-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Dynamic Lucide Match Banner when user types any Lucide icon */}
                    {searchedLucideMatch && (
                      <div className="mb-2 p-2 bg-red-50/80 border border-red-200 rounded-xl flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-white border border-red-200 flex items-center justify-center shrink-0 text-red-600">
                            <searchedLucideMatch.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] text-red-500 font-semibold uppercase tracking-wider">
                              Icon Lucide hợp lệ
                            </div>
                            <div className="text-xs font-bold text-slate-800 truncate">
                              {searchedLucideMatch.name}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPreset(searchedLucideMatch.name)}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer shrink-0"
                        >
                          Dùng icon này
                        </button>
                      </div>
                    )}

                    {/* Preset Grid */}
                    <div className="grid grid-cols-4 gap-1.5 p-1 max-h-52 overflow-y-auto">
                      {filteredPresets.length > 0 ? (
                        filteredPresets.map((preset) => {
                          const PresetIcon = preset.icon
                          const isSelected =
                            badge.icon.trim().toLowerCase() === preset.key.toLowerCase() ||
                            badge.icon.trim() === preset.emojiEquivalent

                          return (
                            <button
                              key={preset.key}
                              type="button"
                              onClick={() => handleSelectPreset(preset.key)}
                              className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-slate-100 transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-red-50 text-red-600 font-semibold border border-red-200'
                                  : 'text-slate-700'
                              }`}
                              title={`${preset.name} (${preset.key})`}
                            >
                              <PresetIcon className="w-4 h-4 shrink-0" />
                              <span className="text-[10px] truncate max-w-full text-center leading-tight">
                                {preset.name}
                              </span>
                            </button>
                          )
                        })
                      ) : (
                        <div className="col-span-4 py-4 text-center text-slate-400 text-xs">
                          Không có icon phù hợp trong danh mục này. Bạn có thể nhập trực tiếp tên icon từ Lucide.
                        </div>
                      )}
                    </div>

                    {/* Footer hint */}
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Gõ tên bất kỳ từ Lucide React</span>
                      <a
                        href={LUCIDE_ICONS_LIBRARY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline font-medium inline-flex items-center gap-0.5"
                      >
                        <span>Xem thư viện 1,400+ icon</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Real-time validity feedback under input */}
          {badge.icon.trim() && (
            <div className="mt-1">
              {currentIconStatus ? (
                <p className="text-[11px] text-emerald-600 font-medium inline-flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Icon Lucide: <strong>{currentIconStatus.name}</strong></span>
                </p>
              ) : (
                <p className="text-[11px] text-amber-600 inline-flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>
                    Chưa khớp icon Lucide. Tra cứu tại{' '}
                    <a
                      href={LUCIDE_ICONS_LIBRARY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold hover:text-amber-700"
                    >
                      lucide.dev/icons ↗
                    </a>
                  </span>
                </p>
              )}
            </div>
          )}

          {errors?.icon && (
            <p className="text-xs text-red-500 mt-1">{errors.icon}</p>
          )}
        </div>

        {/* Hàng 2: Input Tiêu đề chính */}
        <div>
          <label
            htmlFor={`badge-title-${badge.id}`}
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Tiêu đề chính <span className="text-red-500">*</span>
          </label>
          <input
            id={`badge-title-${badge.id}`}
            type="text"
            value={badge.title}
            onChange={(e) => onChange(badge.id, 'title', e.target.value)}
            placeholder="Nhập tiêu đề chính..."
            className={`w-full border rounded-lg px-3 py-2 text-sm text-slate-800 transition outline-none ${
              errors?.title
                ? 'border-red-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-red-50/20'
                : 'border-slate-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
            }`}
          />
          {errors?.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Hàng 3: Input Phụ đề mô tả */}
        <div>
          <label
            htmlFor={`badge-subtitle-${badge.id}`}
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Phụ đề mô tả <span className="text-red-500">*</span>
          </label>
          <input
            id={`badge-subtitle-${badge.id}`}
            type="text"
            value={badge.subtitle}
            onChange={(e) => onChange(badge.id, 'subtitle', e.target.value)}
            placeholder="Nhập phụ đề mô tả ngắn..."
            className={`w-full border rounded-lg px-3 py-2 text-sm text-slate-800 transition outline-none ${
              errors?.subtitle
                ? 'border-red-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-red-50/20'
                : 'border-slate-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
            }`}
          />
          {errors?.subtitle && (
            <p className="text-xs text-red-500 mt-1">{errors.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}
