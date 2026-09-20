import React, { useState } from 'react'
import type { CategoryToggle, HomeProductsConfigData } from '@/types/admin/homeProductsConfig.type'
import { MOCK_HOME_PRODUCTS_CONFIG } from '@/mocks/mockHomeProductsConfig'
import {
  HOME_PRODUCTS_INFO_TEXT,
  HOME_PRODUCTS_SUBTITLE,
} from '@/constants/homeProductsConstants'
import { CategoryToggleCard } from '@/components/admin/home-products/CategoryToggleCard'
import { CategoryShelfAccordion } from '@/components/admin/home-products/CategoryShelfAccordion'
import { useToast } from '@/hooks/useToast'
import { Check, RotateCcw, Info } from 'lucide-react'

interface HomeProductsTabProps {
  initialData?: HomeProductsConfigData
  onSave?: (categories: CategoryToggle[]) => void
}

export const HomeProductsTab: React.FC<HomeProductsTabProps> = ({
  initialData = MOCK_HOME_PRODUCTS_CONFIG,
  onSave,
}) => {
  const { success } = useToast()
  const [categories, setCategories] = useState<CategoryToggle[]>(
    initialData.categories.map((c) => ({ ...c }))
  )
  const [isSaving, setIsSaving] = useState(false)

  // Toggle category enabled/disabled
  const handleToggleCategory = (id: string, enabled: boolean) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, enabled } : cat))
    )
  }

  // Active categories count
  const activeCount = categories.filter((c) => c.enabled).length

  // Save changes
  const handleSave = () => {
    setIsSaving(true)
    try {
      const activeCategories = categories.filter((c) => c.enabled)
      // eslint-disable-next-line no-console
      console.log('Updated Active Home Categories Payload:', activeCategories)

      onSave?.(categories)
      success('Cập nhật danh mục sản phẩm trang chủ thành công!')
    } finally {
      setIsSaving(false)
    }
  }

  // Reset to initial
  const handleReset = () => {
    setCategories(initialData.categories.map((c) => ({ ...c })))
  }

  // Enabled categories to render shelves
  const enabledCategories = categories.filter((c) => c.enabled)

  return (
    <div className="space-y-6">
      {/* 1. Khung Quản Lý Danh Mục Hiển Thị (Top Card) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
        {/* Header & Sync Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center">
            <span className="w-1 h-5 bg-red-600 rounded-full inline-block mr-2 shrink-0" />
            <h2 className="font-bold text-slate-900 text-lg">
              4. SP Trang chủ – Quản lý danh mục hiển thị
            </h2>
          </div>

          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 w-fit">
            <span>✓</span>
            <span>Đã đồng bộ {initialData.syncTime}</span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-slate-500 mt-1">
          {HOME_PRODUCTS_SUBTITLE}
        </p>

        {/* Info Callout */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 my-4 flex items-start sm:items-center gap-2.5 text-xs text-blue-700 leading-relaxed">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 sm:mt-0" />
          <span>{HOME_PRODUCTS_INFO_TEXT}</span>
        </div>

        {/* Grid 5 Cards Bật / Tắt Danh Mục */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 my-4">
          {categories.map((category) => (
            <CategoryToggleCard
              key={category.id}
              category={category}
              onToggle={handleToggleCategory}
            />
          ))}
        </div>

        {/* Thanh Thống Kê & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-5">
          <span className="text-xs text-slate-500 font-medium">
            {activeCount} / {categories.length} danh mục đang hiển thị
          </span>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleReset}
              className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium px-5 py-2 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Đặt lại</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-sm font-medium px-5 py-2 rounded-xl shadow-sm transition cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Các Shelf Sản Phẩm Tự Động (Chỉ hiển thị khi danh mục đang bật) */}
      <div className="space-y-4">
        {enabledCategories.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            Chưa có danh mục nào được bật. Vui lòng bật ít nhất 1 danh mục ở trên để hiển thị shelf sản phẩm.
          </div>
        ) : (
          enabledCategories.map((category) => {
            const products = initialData.shelves[category.id] || []
            return (
              <CategoryShelfAccordion
                key={category.id}
                category={category}
                products={products}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
