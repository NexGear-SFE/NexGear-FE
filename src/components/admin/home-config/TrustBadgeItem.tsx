import React, { useState } from 'react'
import type { TrustBadge, TrustBadgeErrors } from '@/types/homeConfig'
import {
  BADGE_THEMES,
  TRUST_BADGE_PRESET_ICONS,
  resolveLucideIcon,
} from '@/constants/homeConfigConstants'
import { ChevronDown, Smile } from 'lucide-react'

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

  // Color theme according to index (0: Emerald, 1: Amber, 2: Purple, 3: Blue)
  const theme = BADGE_THEMES[index % 4] || BADGE_THEMES[0]

  const handleSelectPreset = (iconKey: string) => {
    onChange(badge.id, 'icon', iconKey)
    setShowPicker(false)
  }

  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition-colors shadow-xs flex flex-col justify-between">
      <div className="space-y-4">
        {/* Hàng 1: Icon block & Input text cho Icon */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={`badge-icon-${badge.id}`}
              className="text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5"
            >
              <span>Icon (Lucide / emoji)</span>
            </label>
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
                  placeholder="Ví dụ: CheckCircle2, Zap, ✅, ⚡..."
                  className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPicker((prev) => !prev)}
                  className="px-2.5 bg-slate-50 hover:bg-slate-100 border-l border-slate-200 text-slate-500 hover:text-slate-800 text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Chọn nhanh icon Lucide"
                >
                  <Smile className="w-3.5 h-3.5 text-slate-400" />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Popover danh sách icon Lucide preset */}
              {showPicker && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPicker(false)}
                  />
                  <div className="absolute left-0 top-full mt-1.5 z-20 w-72 bg-white rounded-xl shadow-lg border border-slate-200 p-2 text-xs">
                    <div className="text-[11px] font-semibold text-slate-500 px-2 py-1 uppercase tracking-wider">
                      Icon Lucide gợi ý
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 p-1 max-h-48 overflow-y-auto">
                      {TRUST_BADGE_PRESET_ICONS.map((preset) => {
                        const PresetIcon = preset.icon
                        const isSelected =
                          badge.icon.trim().toLowerCase() === preset.key.toLowerCase() ||
                          badge.icon.trim() === preset.emojiEquivalent

                        return (
                          <button
                            key={preset.key}
                            type="button"
                            onClick={() => handleSelectPreset(preset.key)}
                            className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-slate-100 transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-red-50 text-red-600 font-semibold border border-red-200'
                                : 'text-slate-700'
                            }`}
                            title={`${preset.name} (${preset.key})`}
                          >
                            <PresetIcon className="w-4 h-4" />
                            <span className="text-[10px] truncate max-w-full text-center">
                              {preset.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
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
