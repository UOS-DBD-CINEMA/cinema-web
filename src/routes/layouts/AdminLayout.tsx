import { Outlet, ScrollRestoration } from 'react-router';

import { AdminHeader } from '@/components/admin/AdminHeader';

export function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
