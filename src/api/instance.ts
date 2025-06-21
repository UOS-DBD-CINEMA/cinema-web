import axios, { AxiosRequestConfig } from 'axios';

import { refreshLoginAPI } from '@/api/auth.api';
import {
  getAccessToken,
  removeTokens,
  setAccessToken,
} from '@/store/authStore';

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
          refreshLoginAPI().then(res => {
            setAccessToken(res.data);
            return instance(config);
          });
        } catch (err) {
          removeTokens();
          alert('로그인 후 이용 가능합니다.');
          window.location.replace('/');
          return Promise.reject(err);
        }
      }

      return Promise.reject(err);
    },
  );

  return instance;
};

export const httpClient = createClient();
