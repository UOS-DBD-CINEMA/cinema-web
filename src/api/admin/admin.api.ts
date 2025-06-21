import { httpClientForAdmin } from '@/api/admin/adminInstance';

export const postAdminAPI = async (joinPayload: AdminJoinPayload) => {
  return await httpClientForAdmin.post('/api/admin', joinPayload);
};

type AdminJoinPayload = {
  password: string;
};
