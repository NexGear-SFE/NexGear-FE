import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { HomeContentTab } from '@/types/admin/homeContent.type'
import { TabNavigation } from '@/components/admin/home-config/TabNavigation'
import { TrustBadgeForm } from '@/components/admin/home-config/TrustBadgeForm'
import { FooterConfigTab } from '@/components/admin/footer-config/FooterConfigTab'
import { HomeProductsTab } from '@/components/admin/home-products/HomeProductsTab'
import { QuickAccessManager } from '@/components/admin/quick-access/QuickAccessManager'
import { BannerTable } from '@/components/admin/homeContent/BannerTable'
import { BannerModal } from '@/components/admin/homeContent/BannerModal'
import { DeleteConfirmModal } from '@/components/admin/homeContent/DeleteConfirmModal'
import { INITIAL_HERO_BANNERS } from '@/mocks/storemanager/homeContent.mock'
import type { BannerItem, BannerFormData } from '@/types/admin/homeContent.type'
import { Plus } from 'lucide-react'



export const HomePageConfig: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // State tab lấy từ tham số URL (defaults to 'commitments' as per trust badges requirement)
  const activeTab = (searchParams.get('tab') as HomeContentTab) || 'commitments'

  const handleTabChange = (tab: HomeContentTab) => {
    setSearchParams({ tab })
  }

  // State danh sách banner cho tab hero
  const [banners, setBanners] = useState<BannerItem[]>(INITIAL_HERO_BANNERS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null)
  const [deletingBanner, setDeletingBanner] = useState<BannerItem | null>(null)

  const handleToggleVisibility = (id: string, isVisible: boolean) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isVisible } : b))
    )
  }

  const handleOpenAddModal = () => {
    setEditingBanner(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (banner: BannerItem) => {
    setEditingBanner(banner)
    setIsModalOpen(true)
  }

  const handleSaveBanner = (formData: BannerFormData) => {
    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) => (b.id === editingBanner.id ? { ...b, ...formData } : b))
      )
    } else {
      const newBanner: BannerItem = {
        id: `banner-${Date.now()}`,
        ...formData,
      }
      setBanners((prev) => [...prev, newBanner])
    }
  }

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
      {/* 1. Layout & Header */}
      <div>
        <h1 className="font-bold text-2xl text-slate-800 leading-tight">
          Quản lý Trang chủ
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Tuỳ chỉnh nội dung hiển thị trên trang chủ website
        </p>
      </div>

      {/* 2. Thanh Tabs Điều Hướng */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 3. Khung Cấu Hình Chính tương ứng với Tab */}
      {activeTab === 'commitments' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-6">
          <TrustBadgeForm />
        </div>
      )}

      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="border-l-4 border-red-600 pl-3 font-bold text-slate-900 text-base">
              Quản lý Hero Banner / Promo Slider
            </h2>
            <span className="text-xs text-slate-400">
              {banners.length} banner đang được cấu hình
            </span>
          </div>

          <BannerTable
            banners={banners}
            onToggleVisibility={handleToggleVisibility}
            onEditBanner={handleOpenEditModal}
            onDeleteBanner={handleDeleteClick}
            onReorderBanners={setBanners}
          />

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

      {activeTab === 'quick-access' && <QuickAccessManager />}

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


      {/* Modals for Hero Tab */}
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

      <DeleteConfirmModal
        banner={deletingBanner}
        onClose={() => setDeletingBanner(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
