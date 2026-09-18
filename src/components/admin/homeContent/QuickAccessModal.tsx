import React, { useState, useRef, useEffect } from 'react'
import { X, ChevronDown, Check, AlertCircle } from 'lucide-react'
import type { QuickAccessItem, QuickAccessFormData } from '@/types/homeContent.type'
import { QUICK_ACCESS_CATEGORY_PRESETS, type CategoryPreset } from '@/constants/homeContent'
import { QuickAccessIcon } from './QuickAccessIcon'

interface QuickAccessModalProps {
  isOpen: boolean
  editingItem: QuickAccessItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: QuickAccessFormData) => void
}

interface QuickAccessFormBodyProps {
  editingItem: QuickAccessItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: QuickAccessFormData) => void
}

const QuickAccessFormBody: React.FC<QuickAccessFormBodyProps> = ({
  editingItem,
  nextOrder,
  onClose,
  onSave,
}) => {
  // Find matching preset if editing
  const initialPreset = editingItem
    ? QUICK_ACCESS_CATEGORY_PRESETS.find(
        (p) => p.label.toLowerCase() === editingItem.label.toLowerCase()
      ) || null
    : null

  const [selectedPreset, setSelectedPreset] = useState<CategoryPreset | null>(initialPreset)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelectPreset = (preset: CategoryPreset | null) => {
    setSelectedPreset(preset)
    setIsDropdownOpen(false)
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPreset) {
      setError('Vui lòng chọn danh mục từ danh sách')
      return
    }

    const payload: QuickAccessFormData = {
      label: selectedPreset.label,
      icon: selectedPreset.icon,
      url: selectedPreset.url,
      order: editingItem?.order ?? nextOrder,
    }

    onSave(payload)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Dropdown Chọn Danh Mục */}
      <div className="relative" ref={dropdownRef}>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Chọn danh mục <span className="text-red-500">*</span>
        </label>

        {/* Dropdown Trigger */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-white flex items-center justify-between text-left transition-all cursor-pointer ${
            isDropdownOpen
              ? 'border-blue-500 ring-2 ring-blue-100'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {selectedPreset ? (
            <div className="flex items-center gap-2.5">
              <span className="text-gray-600">
                <QuickAccessIcon name={selectedPreset.icon} className="w-4 h-4" />
              </span>
              <span className="font-medium text-gray-800">{selectedPreset.label}</span>
            </div>
          ) : (
            <span className="text-gray-400">-- Chọn danh mục --</span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Options Popup (giống hình ảnh mô tả) */}
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-100">
            {/* Header / Option mặc định */}
            <div
              onClick={() => handleSelectPreset(null)}
              className="bg-blue-600 text-white font-medium px-3.5 py-2.5 text-sm flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <span>-- Chọn danh mục --</span>
              {!selectedPreset && <Check className="w-4 h-4 text-white" />}
            </div>

            {/* Danh sách danh mục với Icon */}
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 py-1">
              {QUICK_ACCESS_CATEGORY_PRESETS.map((preset) => {
                const isSelected = selectedPreset?.id === preset.id
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-3.5 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                        <QuickAccessIcon name={preset.icon} className="w-4 h-4" />
                      </span>
                      <span>{preset.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Preview thông tin khi đã chọn */}
      {selectedPreset && (
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-500">Đường dẫn đích:</span>
          <span className="font-mono text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">
            {selectedPreset.url}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          {editingItem ? 'Lưu thay đổi' : 'Thêm truy cập nhanh'}
        </button>
      </div>
    </form>
  )
}

export const QuickAccessModal: React.FC<QuickAccessModalProps> = ({
  isOpen,
  editingItem,
  nextOrder,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
        {/* Header với nút đóng bo tròn ở góc phải theo ảnh mẫu */}
        <div className="flex items-center justify-between pb-1">
          <h2 className="font-bold text-lg text-gray-900 leading-none">
            {editingItem ? 'Chỉnh sửa truy cập nhanh' : 'Thêm truy cập nhanh'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng modal"
            className="w-8 h-8 rounded-xl bg-gray-100/80 hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <QuickAccessFormBody
          key={editingItem ? String(editingItem.id) : 'new-quick-access'}
          editingItem={editingItem}
          nextOrder={nextOrder}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
