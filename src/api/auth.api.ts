import { httpClient } from '@/api/axios';

export const loginAPI = async (loginPayload: LoginPayload) => {
  return await httpClient.post('/api/auth/token/issue', loginPayload);
};

export type LoginPayload = {
  username: string;
  password: string;
};
