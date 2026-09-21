import React, { useState, useRef } from 'react'
import { X, Upload, Image as ImageIcon, Trash2, Link as LinkIcon, AlertCircle } from 'lucide-react'
import type { BannerItem, BannerFormData } from '@/types/admin/homeContent.type'
import { ToggleSwitch } from './ToggleSwitch'

interface BannerModalProps {
  isOpen: boolean
  editingBanner: BannerItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: BannerFormData) => void
}

interface BannerFormBodyProps {
  editingBanner: BannerItem | null
  nextOrder: number
  onClose: () => void
  onSave: (data: BannerFormData) => void
}

const BannerFormBody: React.FC<BannerFormBodyProps> = ({
  editingBanner,
  nextOrder,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<BannerFormData>(() => ({
    title: editingBanner?.title || '',
    specs: editingBanner?.specs || '',
    price: editingBanner?.price || 0,
    order: editingBanner?.order ?? nextOrder,
    isVisible: editingBanner?.isVisible ?? true,
    imageUrl: editingBanner?.imageUrl || '',
    targetUrl: editingBanner?.targetUrl || '',
  }))

  const [priceInput, setPriceInput] = useState<string>(() =>
    editingBanner?.price ? String(editingBanner.price) : ''
  )
  const [error, setError] = useState<string>('')
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [showUrlInput, setShowUrlInput] = useState<boolean>(Boolean(editingBanner?.imageUrl?.startsWith('http')))

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '')
    setPriceInput(rawVal)
    const num = Number(rawVal) || 0
    setFormData((prev) => ({ ...prev, price: num }))
  }

  // Handle file reading
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn đúng định dạng tệp hình ảnh (PNG, JPG, WEBP)')
      return
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError('Dung lượng ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn')
      return
    }

    setError('')
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        setFormData((prev) => ({ ...prev, imageUrl: result }))
      }
    }
    reader.readAsDataURL(file)
  }

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      processImageFile(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFile(e.target.files[0])
    }
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setError('Vui lòng nhập tiêu đề banner')
      return
    }
    if (formData.price <= 0) {
      setError('Vui lòng nhập giá nổi bật hợp lệ')
      return
    }

    onSave(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-70px)]">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Section Kéo thả Hình ảnh Banner */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-gray-700">
            Hình ảnh Banner
          </label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Ẩn nhập link ảnh' : 'Hoặc nhập link ảnh trực tiếp'}</span>
          </button>
        </div>

        {/* Hidden native file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/svg+xml"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Image Preview or Drag-Drop Zone */}
        {formData.imageUrl ? (
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-900/5 aspect-video max-h-48 flex items-center justify-center">
            <img
              src={formData.imageUrl}
              alt="Banner preview"
              className="w-full h-full object-cover"
            />
            {/* Action overlay */}
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-150 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white text-gray-800 rounded-lg text-xs font-semibold shadow-sm hover:bg-gray-100 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Thay ảnh khác</span>
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-red-700 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa ảnh</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-150 group ${
              isDragging
                ? 'border-red-500 bg-red-50/80 ring-2 ring-red-400/20'
                : 'border-gray-200 bg-gray-50/50 hover:border-red-400 hover:bg-red-50/20'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center transition-colors ${
                isDragging
                  ? 'bg-red-100 text-red-600 scale-105'
                  : 'bg-white text-gray-400 group-hover:text-red-500 group-hover:bg-red-50 shadow-xs'
              }`}
            >
              {isDragging ? (
                <ImageIcon className="w-6 h-6 animate-pulse" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>
            <p className="text-xs font-semibold text-gray-700 group-hover:text-red-600 transition-colors">
              {isDragging
                ? 'Thả ảnh vào đây ngay...'
                : 'Kéo & thả ảnh banner vào đây, hoặc nhấn để chọn'}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Định dạng PNG, JPG, WEBP (Tối đa 5MB) · Tỷ lệ đề xuất 16:9
            </p>
          </div>
        )}

        {/* Input link URL tùy chọn nếu admin muốn paste URL */}
        {showUrlInput && (
          <div className="mt-2">
            <input
              type="url"
              placeholder="https://example.com/banner-image.jpg"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
            />
          </div>
        )}
      </div>

      {/* Tiêu đề */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Tiêu đề banner <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="VD: Razer BlackWidow V4 Pro"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
        />
      </div>

      {/* Thông số phụ (specs) */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Thông số nổi bật / Mô tả ngắn
        </label>
        <input
          type="text"
          placeholder="VD: Switch Xanh · Đèn RGB từng phím · Kết nối không dây"
          value={formData.specs}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specs: e.target.value }))
          }
          className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
        />
      </div>

      {/* Giá và thứ tự */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Giá nổi bật (VNĐ) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="4490000"
            value={priceInput}
            onChange={handlePriceChange}
            className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Thứ tự hiển thị
          </label>
          <input
            type="number"
            min="1"
            value={formData.order}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                order: parseInt(e.target.value, 10) || 1,
              }))
            }
            className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>
      </div>

      {/* Trạng thái hiển thị */}
      <div className="flex items-center justify-between py-2 border-t border-b border-gray-100">
        <div>
          <span className="text-xs font-semibold text-gray-800 block">
            Trạng thái hiển thị
          </span>
          <span className="text-[11px] text-gray-500">
            Bật để hiển thị banner trên trang chủ
          </span>
        </div>
        <ToggleSwitch
          checked={formData.isVisible}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, isVisible: checked }))
          }
        />
      </div>

      {/* Action buttons */}
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
          className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          {editingBanner ? 'Lưu thay đổi' : 'Thêm banner'}
        </button>
      </div>
    </form>
  )
}

export const BannerModal: React.FC<BannerModalProps> = ({
  isOpen,
  editingBanner,
  nextOrder,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="font-bold text-base text-gray-900">
            {editingBanner ? 'Chỉnh sửa Banner' : 'Thêm banner mới'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - fresh mount per open */}
        <BannerFormBody
          key={editingBanner ? editingBanner.id : 'new-banner'}
          editingBanner={editingBanner}
          nextOrder={nextOrder}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
