import { useNavigate } from 'react-router';

import { loginAPI, type LoginPayload } from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { storeLogin } = useAuthStore();
  const navigate = useNavigate();

  const login = (loginPayload: LoginPayload) => {
    loginAPI(loginPayload).then(res => {
      storeLogin(res.data);
      navigate('/', { replace: true });
    });
  };

  return {
    login,
  };
};
