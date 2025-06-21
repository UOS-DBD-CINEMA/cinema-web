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
        adminRefreshLoginAPI().then(
          res => {
            setAdminAccessToken(res.data);
            return instance(config);
          },
          err => {
            removeAdminTokens();
            alert('관리자 로그인 후 이용 가능합니다.');
            window.location.replace('/admin');
            return Promise.reject(err);
          },
        );
      }

      if (status === 403) {
        alert('관리자 전용 페이지입니다.');
        window.location.replace('/');
      }

      return Promise.reject(err);
    },
  );

  return instance;
};

export const httpClientForAdmin = createClient();
