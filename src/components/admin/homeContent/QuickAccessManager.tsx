import React, { useState } from 'react'
import { Plus, Edit2, Trash2, AlertTriangle, Check, ChevronUp, ChevronDown } from 'lucide-react'
import type { QuickAccessItem, QuickAccessFormData } from '@/types/homeContent.type'
import { INITIAL_QUICK_ACCESS_ITEMS } from '@/mocks/storemanager/homeContent.mock'
import { QuickAccessIcon } from './QuickAccessIcon'
import { QuickAccessModal } from './QuickAccessModal'

export const QuickAccessManager: React.FC = () => {
  // State list
  const [items, setItems] = useState<QuickAccessItem[]>(INITIAL_QUICK_ACCESS_ITEMS)
  const [savedBaseline, setSavedBaseline] = useState<QuickAccessItem[]>(INITIAL_QUICK_ACCESS_ITEMS)

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<QuickAccessItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<QuickAccessItem | null>(null)

  // Feedback banner state
  const [showSavedFeedback, setShowSavedFeedback] = useState(false)

  // Sort items by order
  const sortedItems = [...items].sort((a, b) => a.order - b.order)

  // Handlers for reordering (move up / down)
  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    const reordered = [...sortedItems]
    const temp = reordered[index]
    reordered[index] = reordered[index - 1]
    reordered[index - 1] = temp

    const updated = reordered.map((it, idx) => ({
      ...it,
      order: idx + 1,
    }))
    setItems(updated)
  }

  const handleMoveDown = (index: number) => {
    if (index >= sortedItems.length - 1) return
    const reordered = [...sortedItems]
    const temp = reordered[index]
    reordered[index] = reordered[index + 1]
    reordered[index + 1] = temp

    const updated = reordered.map((it, idx) => ({
      ...it,
      order: idx + 1,
    }))
    setItems(updated)
  }

  // Handlers for Add / Edit
  const handleOpenAddModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item: QuickAccessItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleSaveItem = (data: QuickAccessFormData) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((it) => (it.id === editingItem.id ? { ...it, ...data } : it))
      )
    } else {
      const newItem: QuickAccessItem = {
        id: Date.now(),
        ...data,
      }
      setItems((prev) => [...prev, newItem])
    }
  }

  // Handlers for Delete
  const handleDeleteClick = (item: QuickAccessItem) => {
    setDeletingItem(item)
  }

  const handleConfirmDelete = () => {
    if (deletingItem) {
      setItems((prev) => prev.filter((it) => it.id !== deletingItem.id))
      setDeletingItem(null)
    }
  }

  // Footer Actions: Cancel and Save Changes
  const handleCancelChanges = () => {
    setItems(savedBaseline)
  }

  const handleSaveAllChanges = () => {
    setSavedBaseline(items)
    setShowSavedFeedback(true)
    setTimeout(() => {
      setShowSavedFeedback(false)
    }, 3000)
  }

  const hasUnsavedChanges = JSON.stringify(items) !== JSON.stringify(savedBaseline)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">
      {/* Tiêu đề Section */}
      <div className="flex items-center justify-between">
        <h2 className="border-l-4 border-red-600 pl-3 font-bold text-gray-900 text-base">
          | 2. Truy cập nhanh (Quick Access Pills)
        </h2>
        <span className="text-xs text-gray-400">
          {items.length} danh mục hiển thị
        </span>
      </div>

      {/* Success notification banner */}
      {showSavedFeedback && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-green-600 shrink-0" />
          <span>Đã lưu các thay đổi cấu hình Truy cập nhanh thành công!</span>
        </div>
      )}

      {/* Khu vực Xem Trước (Live Preview) */}
      <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 my-5 flex items-center gap-3 flex-wrap">
        <span className="font-bold text-xs text-gray-400 tracking-wider mr-2 shrink-0">
          XEM TRƯỚC:
        </span>
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200/80 shadow-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-gray-800 hover:shadow transition-all cursor-default select-none"
            >
              <QuickAccessIcon name={item.icon} className="w-4 h-4 text-gray-700 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))
        ) : (
          <span className="text-xs text-gray-400 italic">
            Chưa có pill danh mục nào để xem trước.
          </span>
        )}
      </div>

      {/* Bảng Dữ liệu (Quick Access Table) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-gray-50/60 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
              <th scope="col" className="py-3 px-4 font-semibold w-16 text-center">
                #
              </th>
              <th scope="col" className="py-3 px-4 font-semibold w-20 text-center">
                ICON
              </th>
              <th scope="col" className="py-3 px-4 font-semibold w-[32%]">
                NHÃN HIỂN THỊ
              </th>
              <th scope="col" className="py-3 px-4 font-semibold w-[30%]">
                ĐƯỜNG DẪN
              </th>
              <th scope="col" className="py-3 px-4 font-semibold w-28 text-center">
                THỨ TỰ
              </th>
              <th scope="col" className="py-3 px-4 font-semibold w-32 text-right">
                THAO TÁC
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.length > 0 ? (
              sortedItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  {/* # Index */}
                  <td className="py-3.5 px-4 text-center font-medium text-xs text-gray-400">
                    #{index + 1}
                  </td>

                  {/* Icon */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100/80 text-gray-700">
                      <QuickAccessIcon name={item.icon} className="w-4 h-4" />
                    </div>
                  </td>

                  {/* Nhãn hiển thị */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-sm text-gray-900">
                      {item.label}
                    </span>
                  </td>

                  {/* Đường dẫn */}
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100/70 px-2 py-1 rounded-md">
                      {item.url}
                    </span>
                  </td>

                  {/* Thứ tự */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                        {item.order}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          title="Di chuyển lên"
                          aria-label={`Di chuyển ${item.label} lên`}
                          className="p-0.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === sortedItems.length - 1}
                          title="Di chuyển xuống"
                          aria-label={`Di chuyển ${item.label} xuống`}
                          className="p-0.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thao tác */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(item)}
                        className="border border-gray-200 text-gray-700 hover:bg-gray-100 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                        <span>Sửa</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item)}
                        title="Xóa danh mục"
                        className="border border-red-200 text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400 text-sm">
                  Chưa có mục truy cập nhanh nào. Nhấn "+ Thêm danh mục" để tạo mới.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Nút Thêm mới */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="border border-dashed border-red-500 text-red-600 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm danh mục</span>
        </button>
      </div>

      {/* Khu vực Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={handleCancelChanges}
          disabled={!hasUnsavedChanges}
          className={`border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
            !hasUnsavedChanges ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={handleSaveAllChanges}
          className="bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          Lưu thay đổi
        </button>
      </div>

      {/* Modal Thêm mới / Chỉnh sửa */}
      <QuickAccessModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        nextOrder={items.length + 1}
        onClose={() => {
          setIsModalOpen(false)
          setEditingItem(null)
        }}
        onSave={handleSaveItem}
      />

      {/* Confirmation Modal for Delete */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">
                  Xác nhận xóa danh mục
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Bạn có chắc chắn muốn xóa mục{' '}
                  <strong className="text-gray-800 font-semibold">
                    "{deletingItem.label}"
                  </strong>
                  ? Mục này sẽ không còn xuất hiện trong thanh truy cập nhanh ở trang chủ.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
