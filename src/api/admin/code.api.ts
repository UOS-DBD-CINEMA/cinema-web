import { httpClientForAdmin } from './adminInstance';

export const getAdminCodeGroupsAPI = async () => {
  return await httpClientForAdmin.get('/api/admin/code-groups');
};

export const getAdminCodedetailsAPI = async (groupId: string) => {
  return await httpClientForAdmin.get(
    `/api/admin/code-details/groups/${groupId}`,
  );
};

export const postAdminCodeDetailAPI = async (
  codeDetailPayload: CodeDetailPayload,
) => {
  return await httpClientForAdmin.post(
    '/api/admin/code-details',
    codeDetailPayload,
  );
};

export const deleteAdminCodeDetailAPI = async (detailId: number) => {
  return await httpClientForAdmin.delete(`/api/admin/code-details/${detailId}`);
};

type CodeDetailPayload = {
  codeGroupId: string;
  value: string;
};
