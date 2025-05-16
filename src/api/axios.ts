import axios, { AxiosRequestConfig } from 'axios';

import { getAccessToken } from '@/store/authStore';

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(config => {
    const accessToken = getAccessToken();
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
    return config;
  });

  axiosInstance.interceptors.response.use(
    res => res,
    err => {
      if (err.response) {
        const { status } = err.response;

        switch (status) {
          case 401:
        }
      }
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
