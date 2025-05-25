import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const initialState = {
  isLogin: getAccessToken() ? true : false,
};

export const useAuthStore = create(
  devtools(
    combine(initialState, set => ({
      storeLogin: (tokens: Tokens) => {
        set({ isLogin: true });
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
      },
      storeLogout: () => {
        set({ isLogin: false });
        removeTokens();
      },
    })),
  ),
);

type Tokens = {
  accessToken: string;
  refreshToken: string;
};
