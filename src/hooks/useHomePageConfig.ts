import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { HomeContentTab, BannerItem, BannerFormData } from '@/types/admin/homeContent.type';
import { INITIAL_HERO_BANNERS } from '@/mocks/storemanager/homeContent.mock';

export function useHomePageConfig() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get('tab') as HomeContentTab) || 'commitments';

  const handleTabChange = (tab: HomeContentTab) => {
    setSearchParams({ tab });
  };

  const [banners, setBanners] = useState<BannerItem[]>(INITIAL_HERO_BANNERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [deletingBanner, setDeletingBanner] = useState<BannerItem | null>(null);

  const handleToggleVisibility = (id: string, isVisible: boolean) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isVisible } : b))
    );
  };

  const handleOpenAddModal = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (banner: BannerItem) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleSaveBanner = (formData: BannerFormData) => {
    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) => (b.id === editingBanner.id ? { ...b, ...formData } : b))
      );
    } else {
      const newBanner: BannerItem = {
        id: `banner-${Date.now()}`,
        ...formData,
      };
      setBanners((prev) => [...prev, newBanner]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (banner: BannerItem) => {
    setDeletingBanner(banner);
  };

  const handleConfirmDelete = () => {
    if (deletingBanner) {
      setBanners((prev) => prev.filter((b) => b.id !== deletingBanner.id));
      setDeletingBanner(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  return {
    activeTab,
    handleTabChange,
    banners,
    setBanners,
    isModalOpen,
    setIsModalOpen,
    editingBanner,
    setEditingBanner,
    deletingBanner,
    setDeletingBanner,
    handleToggleVisibility,
    handleOpenAddModal,
    handleOpenEditModal,
    handleSaveBanner,
    handleCloseModal,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
