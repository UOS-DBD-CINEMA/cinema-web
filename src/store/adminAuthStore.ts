import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

export const getAdminAccessToken = () => {
  const adminAccessToken = localStorage.getItem('adminAccessToken');
  return adminAccessToken;
};

export const getAdminRefreshToken = () => {
  const adminRefreshToken = localStorage.getItem('adminRefreshToken');
  return adminRefreshToken;
};

export const setAdminAccessToken = (adminAccessToken: string) => {
  localStorage.setItem('adminAccessToken', adminAccessToken);
};

const setAdminRefreshToken = (adminRefreshToken: string) => {
  localStorage.setItem('adminRefreshToken', adminRefreshToken);
};

export const removeAdminTokens = () => {
  localStorage.removeItem('adminAccessToken');
  localStorage.removeItem('adminRefreshToken');
};

const initialState = {
  isLogin: getAdminAccessToken() ? true : false,
};

export const useAdminAuthStore = create(
  devtools(
    combine(initialState, set => ({
      storeLogin: (tokens: AdminTokens) => {
        set({ isLogin: true });
        setAdminAccessToken(tokens.accessToken);
        setAdminRefreshToken(tokens.refreshToken);
      },
      storeLogout: () => {
        set({ isLogin: false });
        removeAdminTokens();
      },
      updateLogin: () => {
        set({ isLogin: getAdminAccessToken() ? true : false });
      },
    })),
  ),
);

type AdminTokens = {
  accessToken: string;
  refreshToken: string;
};
