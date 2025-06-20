import { httpClient } from '@/api/axios';
import { getRefreshToken } from '@/store/authStore';

export const loginAPI = async (loginPayload: LoginPayload) => {
  return await httpClient.post('/api/auth/token/issue', loginPayload);
};

export const refreshLoginAPI = async () => {
  return await httpClient.post('/api/auth/token/reissue', {
    refreshToken: getRefreshToken(),
  });
};

export type LoginPayload = {
  username: string;
  password: string;
};
