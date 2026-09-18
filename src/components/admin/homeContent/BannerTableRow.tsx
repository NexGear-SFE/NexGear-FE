import React from 'react'
import { GripVertical, Edit2, Trash2 } from 'lucide-react'
import type { BannerItem } from '@/types/homeContent.type'
import { ToggleSwitch } from './ToggleSwitch'
import { formatCurrency } from '@/utils/formatCurrency'

interface BannerTableRowProps {
  banner: BannerItem
  index: number
  onToggleVisibility: (id: string, isVisible: boolean) => void
  onEdit: (banner: BannerItem) => void
  onDelete: (banner: BannerItem) => void
  onDragStart?: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void
  onDragOver?: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void
  onDrop?: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void
}

export const BannerTableRow: React.FC<BannerTableRowProps> = ({
  banner,
  index,
  onToggleVisibility,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <tr
      draggable={Boolean(onDragStart)}
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragOver={(e) => onDragOver?.(e, index)}
      onDrop={(e) => onDrop?.(e, index)}
      className="border-b border-gray-100 hover:bg-gray-50/75 transition-colors group"
    >
      {/* Cột 1: Tiêu đề Banner + Drag handle + Specs */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2.5">
          <div
            title="Kéo thả để sắp xếp thứ tự"
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors p-1 -ml-1 rounded"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          {banner.imageUrl && (
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-12 h-8 rounded-md object-cover border border-gray-200 shrink-0 shadow-2xs"
            />
          )}
          <div>
            <div className="font-semibold text-sm text-gray-900 leading-snug">
              {banner.title}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {banner.specs}
            </div>
          </div>
        </div>
      </td>

      {/* Cột 2: Giá nổi bật */}
      <td className="py-4 px-4 whitespace-nowrap">
        <span className="font-bold text-red-600 text-sm">
          {formatCurrency(banner.price)}
        </span>
      </td>

      {/* Cột 3: Thứ tự */}
      <td className="py-4 px-4 whitespace-nowrap">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
          {banner.order}
        </span>
      </td>

      {/* Cột 4: Hiển thị */}
      <td className="py-4 px-4 whitespace-nowrap">
        <ToggleSwitch
          checked={banner.isVisible}
          onChange={(checked) => onToggleVisibility(banner.id, checked)}
          ariaLabel={`Hiển thị ${banner.title}`}
        />
      </td>

      {/* Cột 5: Thao tác */}
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(banner)}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100/80 font-medium text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
            <span>Chỉnh sửa</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(banner)}
            className="border border-red-200 text-red-500 hover:bg-red-50 font-medium text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa</span>
          </button>
        </div>
      </td>
    </tr>
  )
}
