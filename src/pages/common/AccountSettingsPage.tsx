import { useNavigate } from 'react-router-dom';
import { SharedAccountSettings } from '@/components/common/SharedAccountSettings';
import type { UserProfile } from '@/types/account.type';

interface AccountSettingsPageProps {
  onBack?: () => void;
}

export const AccountSettingsPage = ({ onBack }: AccountSettingsPageProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const storeManagerUser: UserProfile = {
    name: "Store Manager",
    email: "storemanager@gmail.com",
    phone: "0923 456 789",
    roleName: "Super Admin — Store Manager",
    roleBadge: "SUPER ADMIN",
    roleDescription: "Quản trị viên toàn quyền hệ thống NexGear Store Manager",
    avatarUrl: "",
    avatarInitials: "SM",
  };

  return (
    <SharedAccountSettings 
      user={storeManagerUser} 
      onBack={handleBack} 
      pageTitle="Cài đặt tài khoản" 
    />
  );
};
