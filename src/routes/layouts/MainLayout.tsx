import { Outlet, ScrollRestoration } from 'react-router';

import { MainHeader } from '@/components/MainHeader';

export function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
