import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import type { BannerItem, BannerFormData, HomeContentTab } from '@/types/admin/homeContent.type'
import { DEFAULT_HOME_TAB } from '@/constants/homeContent'
import { INITIAL_HERO_BANNERS } from '@/mocks/storemanager/homeContent.mock'
import { HomeConfigSubNav } from '@/components/admin/home-content/HomeConfigSubNav'
import { BannerTable } from '@/components/admin/home-content/BannerTable'
import { BannerModal } from '@/components/admin/home-content/BannerModal'
import { DeleteConfirmModal } from '@/components/admin/home-content/DeleteConfirmModal'
import { QuickAccessManager } from '@/components/admin/quick-access/QuickAccessManager'
import { TrustBadgeForm } from '@/components/admin/home-config/TrustBadgeForm'
import { FooterConfigTab } from '@/components/admin/footer-config/FooterConfigTab'
import { HomeProductsTab } from '@/components/admin/home-products/HomeProductsTab'


export const HomeContentManagerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Trạng thái tab lấy trực tiếp từ tham số URL: ?tab=hero
  const activeTab = (searchParams.get('tab') as HomeContentTab) || DEFAULT_HOME_TAB

  const handleTabChange = (tab: HomeContentTab) => {
    setSearchParams({ tab })
  }

  // Trạng thái danh sách banner
  const [banners, setBanners] = useState<BannerItem[]>(INITIAL_HERO_BANNERS)

  // Trạng thái các modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null)
  const [deletingBanner, setDeletingBanner] = useState<BannerItem | null>(null)

  // Bật/tắt trạng thái hiển thị
  const handleToggleVisibility = (id: string, isVisible: boolean) => {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, isVisible } : banner
      )
    )
  }

  // Mở modal thêm mới
  const handleOpenAddModal = () => {
    setEditingBanner(null)
    setIsModalOpen(true)
  }

  // Mở modal chỉnh sửa
  const handleOpenEditModal = (banner: BannerItem) => {
    setEditingBanner(banner)
    setIsModalOpen(true)
  }

  // Lưu banner (thêm mới hoặc cập nhật)
  const handleSaveBanner = (formData: BannerFormData) => {
    if (editingBanner) {
      // Cập nhật
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBanner.id
            ? { ...b, ...formData }
            : b
        )
      )
    } else {
      // Thêm mới
      const newBanner: BannerItem = {
        id: `banner-${Date.now()}`,
        ...formData,
      }
      setBanners((prev) => [...prev, newBanner])
    }
  }

  // Hàm xử lý xóa
  const handleDeleteClick = (banner: BannerItem) => {
    setDeletingBanner(banner)
  }

  const handleConfirmDelete = () => {
    if (deletingBanner) {
      setBanners((prev) => prev.filter((b) => b.id !== deletingBanner.id))
      setDeletingBanner(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Trang */}
      <div>
        <h1 className="font-bold text-2xl text-gray-900 leading-tight">
          Quản lý Trang chủ
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tuỳ chỉnh nội dung hiển thị trên trang chủ website
        </p>
      </div>

      {/* Sub-navbar (Tabs chuyển trang) */}
      <HomeConfigSubNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Nội dung tương ứng với Tab */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">
          {/* Tiêu đề nhóm */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="border-l-4 border-red-600 pl-3 font-bold text-gray-900 text-base">
              Quản lý Banner trang chủ & Khuyến mãi
            </h2>
            <span className="text-xs text-gray-400">
              {banners.length} banner đang được cấu hình
            </span>
          </div>

          {/* Bảng Dữ liệu */}
          <BannerTable
            banners={banners}
            onToggleVisibility={handleToggleVisibility}
            onEditBanner={handleOpenEditModal}
            onDeleteBanner={handleDeleteClick}
            onReorderBanners={setBanners}
          />

          {/* Nút Thêm mới */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="border border-dashed border-red-500 text-red-600 hover:bg-red-50 font-medium text-sm px-4 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm banner mới</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Cấu hình Truy cập nhanh */}
      {activeTab === 'quick-access' && <QuickAccessManager />}

      {activeTab === 'commitments' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">
          <TrustBadgeForm />
        </div>
      )}


      {activeTab === 'products' && (
        <div className="mt-6">
          <HomeProductsTab />
        </div>
      )}


      {activeTab === 'footer' && (
        <div className="mt-6">
          <FooterConfigTab />
        </div>
      )}


      {/* Modal Thêm mới / Chỉnh sửa Banner */}
      <BannerModal
        isOpen={isModalOpen}
        editingBanner={editingBanner}
        nextOrder={banners.length + 1}
        onClose={() => {
          setIsModalOpen(false)
          setEditingBanner(null)
        }}
        onSave={handleSaveBanner}
      />

      {/* Modal Xác nhận Xóa */}
      <DeleteConfirmModal
        banner={deletingBanner}
        onClose={() => setDeletingBanner(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
