import { deleteMemberAPI } from '@/api/member.api';
import { useAuthStore } from '@/store/authStore';

export const useMember = () => {
  const { storeLogout } = useAuthStore();

  const deleteMember = () => {
    deleteMemberAPI().then(() => {
      storeLogout();
    });
  };

  return {
    deleteMember,
  };
};
