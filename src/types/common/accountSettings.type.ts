import type { UserProfile } from '@/types/customer/account.type';

export interface AccountSettingsPageProps {
  onBack?: () => void;
}

export interface SharedAccountSettingsProps {
  user: UserProfile;
  onBack?: () => void;
  pageTitle?: string;
}
