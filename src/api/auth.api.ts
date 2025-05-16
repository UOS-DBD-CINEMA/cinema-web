import { httpClient } from '@/api/axios';

export const getMemberAPI = async () => {
  return await httpClient.get('/api/member/me');
};

export const joinAPI = async (joinPayload: JoinPayload) => {
  return await httpClient.post('/api/member', joinPayload);
};

export const loginAPI = async (loginPayload: LoginPayload) => {
  return await httpClient.post('/api/auth/token/issue', loginPayload);
};

export const patchMemberAPI = async (
  patchMemberPayload: PatchMemberPayload,
) => {
  return await httpClient.patch('/api/member', patchMemberPayload);
};

export const deleteMemberAPI = async () => {
  return await httpClient.delete('/api/member');
};

export interface JoinPayload {
  username: string;
  password: string;
  phone: string;
  birthdate: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface PatchMemberPayload {
  password: string;
  phone: string;
  birthdate: string;
}
