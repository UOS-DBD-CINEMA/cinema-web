import axios, { AxiosRequestConfig } from 'axios';

import { adminRefreshLoginAPI } from '@/api/admin/auth.api';
import {
  getAdminAccessToken,
  removeAdminTokens,
  setAdminAccessToken,
} from '@/store/adminAuthStore';

const createClient = (config?: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  instance.interceptors.request.use(config => {
    const adminAccessToken = getAdminAccessToken();
    config.headers.Authorization = adminAccessToken
      ? `Bearer ${adminAccessToken}`
      : '';
    return config;
  });

  instance.interceptors.response.use(
    res => res,
    async err => {
      const {
        config,
        response: { status },
      } = err;

      if (status === 401 && !config._retry) {
        config._retry = true;
        try {
          const { data: newAccessToken } = await adminRefreshLoginAPI();
          setAdminAccessToken(newAccessToken);
          return instance(config);
        } catch (refreshError) {
          removeAdminTokens();
          alert('관리자 로그인이 만료되었습니다.');
          window.location.replace('/admin');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(err);
    },
  );

  return instance;
};

export const httpClientForAdmin = createClient();
