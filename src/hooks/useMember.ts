import {
  deleteMemberAPI,
  getMemberAPI,
  JoinPayload,
  patchMemberAPI,
  PatchMemberPayload,
  postMemberAPI,
} from '@/api/member.api';
import { useAuthStore } from '@/store/authStore';

export const useMember = () => {
  const { storeLogout } = useAuthStore();

  const getMember = () => {
    getMemberAPI().then(res => {});
  };

  const JoinMember = (joinPayload: JoinPayload) => {
    postMemberAPI(joinPayload).then(res => {});
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
    JoinMember,
    patchMember,
    deleteMember,
  };
};
