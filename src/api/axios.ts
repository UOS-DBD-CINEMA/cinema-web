import axios, { AxiosRequestConfig } from 'axios';

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
    return config;
  });

  axiosInstance.interceptors.response.use(
    res => res,
    err => {
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

const httpClient = createClient();

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T | undefined,
) => {
  try {
    let res;

    switch (method) {
      case 'get':
        res = await httpClient.get(url, payload as AxiosRequestConfig<T>);
        break;
      case 'post':
        res = await httpClient.post(url, payload);
        break;
      case 'put':
        res = await httpClient.put(url, payload);
        break;
      case 'delete':
        res = await httpClient.delete(url);
        break;
    }
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};
