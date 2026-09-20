import React, { useState } from 'react'
import type { BannerItem } from '@/types/admin/homeContent.type'
import { BannerTableRow } from './BannerTableRow'
import { Image as ImageIcon } from 'lucide-react'

interface BannerTableProps {
  banners: BannerItem[]
  onToggleVisibility: (id: string, isVisible: boolean) => void
  onEditBanner: (banner: BannerItem) => void
  onDeleteBanner: (banner: BannerItem) => void
  onReorderBanners: (reordered: BannerItem[]) => void
}

export const BannerTable: React.FC<BannerTableProps> = ({
  banners,
  onToggleVisibility,
  onEditBanner,
  onDeleteBanner,
  onReorderBanners,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (_e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, _index: number) => {
    e.preventDefault()
  }

  const handleDrop = (_e: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return

    const updated = [...banners]
    const [movedItem] = updated.splice(draggedIndex, 1)
    updated.splice(targetIndex, 0, movedItem)

    // Re-assign order based on new index
    const reindexed = updated.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }))

    onReorderBanners(reindexed)
    setDraggedIndex(null)
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    const updated = [...banners]
    const temp = updated[index]
    updated[index] = updated[index - 1]
    updated[index - 1] = temp

    const reindexed = updated.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }))
    onReorderBanners(reindexed)
  }

  const handleMoveDown = (index: number) => {
    if (index >= banners.length - 1) return
    const updated = [...banners]
    const temp = updated[index]
    updated[index] = updated[index + 1]
    updated[index + 1] = temp

    const reindexed = updated.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }))
    onReorderBanners(reindexed)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-gray-50/75 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
            <th scope="col" className="py-3 px-4 font-semibold w-[40%]">
              TIÊU ĐỀ BANNER
            </th>
            <th scope="col" className="py-3 px-4 font-semibold w-[18%]">
              GIÁ NỔI BẬT
            </th>
            <th scope="col" className="py-3 px-4 font-semibold w-[12%]">
              THỨ TỰ
            </th>
            <th scope="col" className="py-3 px-4 font-semibold w-[12%]">
              HIỂN THỊ
            </th>
            <th scope="col" className="py-3 px-4 font-semibold w-[18%]">
              THAO TÁC
            </th>
          </tr>
        </thead>
        <tbody>
          {banners.length > 0 ? (
            banners.map((banner, index) => (
              <BannerTableRow
                key={banner.id}
                banner={banner}
                index={index}
                onToggleVisibility={onToggleVisibility}
                onEdit={onEditBanner}
                onDelete={onDeleteBanner}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
                isFirst={index === 0}
                isLast={index === banners.length - 1}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-12 text-center text-gray-400">
                <div className="flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                  <span className="text-sm font-medium text-gray-500">
                    Chưa có banner nào trong danh sách.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
