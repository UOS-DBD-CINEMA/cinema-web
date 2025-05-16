import {
  deleteMemberAPI,
  getMemberAPI,
  joinAPI,
  JoinPayload,
  loginAPI,
  LoginPayload,
  patchMemberAPI,
  PatchMemberPayload,
} from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { storeLogin, storeLogout } = useAuthStore();

  const getMember = () => {
    getMemberAPI().then(res => {});
  };

  const memberJoin = (joinPayload: JoinPayload) => {
    joinAPI(joinPayload).then(res => {});
  };

  const memberLogin = (loginPayload: LoginPayload) => {
    loginAPI(loginPayload).then(
      res => {
        storeLogin(res.data);
      },
      err => {},
    );
  };

  const patchMember = (patchMemberPayload: PatchMemberPayload) => {
    patchMemberAPI(patchMemberPayload).then(res => {});
  };

  const deleteMember = () => {
    deleteMemberAPI().then(res => {
      storeLogout();
    });
  };

  return {
    getMember,
    memberJoin,
    memberLogin,
    patchMember,
    deleteMember,
  };
};
