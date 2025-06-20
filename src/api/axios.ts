import axios, { AxiosRequestConfig } from 'axios';

import {
  getAccessToken,
  removeTokens,
  setAccessToken,
} from '@/store/authStore';

import { refreshLoginAPI } from './auth.api';

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
    const accessToken = getAccessToken();
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
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
          const { data: newAccessToken } = await refreshLoginAPI();
          setAccessToken(newAccessToken);
          return instance(config);
        } catch (refreshError) {
          removeTokens();
          alert('로그인이 만료되었습니다.');
          window.location.replace('/');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(err);
    },
  );

  return instance;
};

export const httpClient = createClient();
