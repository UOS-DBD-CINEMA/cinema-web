import { httpClientForAdmin } from '@/api/admin/adminInstance';
import { getAdminRefreshToken } from '@/store/adminAuthStore';

export const adminLoginAPI = async (loginPayload: AdminLoginPayload) => {
  return await httpClientForAdmin.post(
    '/api/admin/auth/token/issue',
    loginPayload,
  );
};

export const adminRefreshLoginAPI = async () => {
  return await httpClientForAdmin.post('/api/admin/auth/token/reissue', {
    refreshToken: getAdminRefreshToken(),
  });
};

export type AdminLoginPayload = {
  adminId: number;
  password: string;
};
