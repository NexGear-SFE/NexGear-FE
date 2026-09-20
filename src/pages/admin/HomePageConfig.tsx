import React from 'react'
import { TabNavigation } from '@/components/admin/home-config/TabNavigation'
import { TrustBadgeForm } from '@/components/admin/home-config/TrustBadgeForm'
import { FooterConfigTab } from '@/components/admin/footer-config/FooterConfigTab'
import { HomeProductsTab } from '@/components/admin/home-products/HomeProductsTab'
import { QuickAccessManager } from '@/components/admin/quick-access/QuickAccessManager'
import { BannerTable } from '@/components/admin/home-content/BannerTable'
import { BannerModal } from '@/components/admin/home-content/BannerModal'
import { DeleteConfirmModal } from '@/components/admin/home-content/DeleteConfirmModal'
import { Plus } from 'lucide-react'
import { useHomePageConfig } from '@/hooks/useHomePageConfig'

export const HomePageConfig: React.FC = () => {
  const {
    activeTab,
    handleTabChange,
    banners,
    setBanners,
    isModalOpen,
    editingBanner,
    deletingBanner,
    setDeletingBanner,
    handleToggleVisibility,
    handleOpenAddModal,
    handleOpenEditModal,
    handleSaveBanner,
    handleCloseModal,
    handleDeleteClick,
    handleConfirmDelete,
  } = useHomePageConfig()

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
        onClose={handleCloseModal}
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
