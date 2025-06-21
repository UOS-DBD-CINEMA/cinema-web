import { httpClient } from '@/api/instance';

export const getMemberAPI = async () => {
  return await httpClient.get('/api/member/me');
};

export const postMemberAPI = async (joinPayload: JoinPayload) => {
  return await httpClient.post('/api/member', joinPayload);
};

export const patchMemberAPI = async (
  patchMemberPayload: PatchMemberPayload,
) => {
  return await httpClient.patch('/api/member', patchMemberPayload);
};

export const deleteMemberAPI = async () => {
  return await httpClient.delete('/api/member');
};

type PatchMemberPayload = {
  password: string;
  phone: string;
  birthdate: string;
};

type JoinPayload = {
  username: string;
  password: string;
  phone: string;
  birthdate: string;
};
