import { useNavigate } from 'react-router';

import { adminLoginAPI, AdminLoginPayload } from '@/api/admin/auth.api';
import { useAdminAuthStore } from '@/store/adminAuthStore';

export const useAdminAuth = () => {
  const { storeLogin } = useAdminAuthStore();
  const navigate = useNavigate();

  const adminLogin = (loginPayload: AdminLoginPayload) => {
    adminLoginAPI(loginPayload).then(res => {
      storeLogin(res.data);
      navigate('/admin', { replace: true });
    });
  };

  return {
    adminLogin,
  };
};
