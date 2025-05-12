import { requestHandler } from '@/api/axios';

export const login = async loginData => {
  return await requestHandler('post', '/api/auth/token/issue', loginData);
};

export const join = async joinData => {
  return await requestHandler('post', '/api/member', joinData);
};
