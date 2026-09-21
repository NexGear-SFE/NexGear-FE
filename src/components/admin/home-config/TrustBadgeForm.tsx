import React, { useState } from 'react'
import type { TrustBadge, TrustBadgeErrors } from '@/types/admin/homeConfig.type'
import { INITIAL_TRUST_BADGES } from '@/mocks/mockHomeConfig'
import { TrustBadgeItem } from '@/components/admin/home-config/TrustBadgeItem'
import { useToast } from '@/hooks/useToast'
import { RotateCcw, Check } from 'lucide-react'

interface TrustBadgeFormProps {
  initialData?: TrustBadge[]
  onSave?: (badges: TrustBadge[]) => void
}

export const TrustBadgeForm: React.FC<TrustBadgeFormProps> = ({
  initialData = INITIAL_TRUST_BADGES,
  onSave,
}) => {
  const { success, error: toastError } = useToast()
  const [badges, setBadges] = useState<TrustBadge[]>(initialData)
  const [errors, setErrors] = useState<Record<string | number, TrustBadgeErrors>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Handle single field change for a badge
  const handleBadgeChange = (
    id: number | string,
    field: keyof TrustBadge,
    value: string
  ) => {
    setBadges((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    )

    // Clear error for that field if present
    if (errors[id]?.[field as keyof TrustBadgeErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: undefined,
        },
      }))
    }
  }

  // Validate badges before saving
  const validateForm = (): boolean => {
    const newErrors: Record<string | number, TrustBadgeErrors> = {}
    let isValid = true

    badges.forEach((badge) => {
      const itemErrors: TrustBadgeErrors = {}

      if (!badge.title.trim()) {
        itemErrors.title = 'Tiêu đề chính không được để trống'
        isValid = false
      }

      if (!badge.subtitle.trim()) {
        itemErrors.subtitle = 'Phụ đề mô tả không được để trống'
        isValid = false
      }

      if (!badge.icon.trim()) {
        itemErrors.icon = 'Icon không được để trống'
        isValid = false
      }

      if (Object.keys(itemErrors).length > 0) {
        newErrors[badge.id] = itemErrors
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // Handle Save
  const handleSave = () => {
    if (!validateForm()) {
      toastError?.('Vui lòng điền đầy đủ các thông tin bắt buộc')
      return
    }

    setIsSaving(true)

    try {
      // Log payload to console as requested
      // eslint-disable-next-line no-console
      console.log('Updated Trust Badges Payload:', badges)

      onSave?.(badges)
      success('Cập nhật Cam kết & Tiện ích thành công!')
    } finally {
      setIsSaving(false)
    }
  }

  // Handle Reset / Cancel
  const handleCancel = () => {
    setBadges(initialData)
    setErrors({})
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="w-1 h-5 bg-red-600 inline-block mr-2 rounded-full" />
          <h2 className="font-semibold text-slate-900 text-lg">
            3. Cam kết & Tiện ích
          </h2>
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline-block">
          Hiển thị ngay dưới hero banner trang chủ
        </span>
      </div>

      {/* Grid 4 Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {badges.map((badge, index) => (
          <TrustBadgeItem
            key={badge.id}
            badge={badge}
            index={index}
            onChange={handleBadgeChange}
            errors={errors[badge.id]}
          />
        ))}
      </div>

      {/* Action Buttons (Footer Form) */}
      <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={handleCancel}
          className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Hủy</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition shadow-sm cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          <span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
        </button>
      </div>
    </div>
  )
}
