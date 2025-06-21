import { Button } from '@ui/button';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router';

import { AdminToggle } from '@/components/admin/AdminToggle';
import { ModeToggle } from '@/components/ModeToggle';
import { useAdminAuthStore } from '@/store/adminAuthStore';

const navigations = [
  { to: '/movies', label: '영화' },
  { to: '/tickets', label: '티켓' },
  { to: '/screenings', label: '상영일정' },
  { to: '/theaters', label: '상영관' },
  { to: '/codes', label: '코드' },
];

export function AdminHeader() {
  const { isLogin, storeLogout, updateLogin } = useAdminAuthStore();

  useEffect(() => {
    updateLogin();
  }, [updateLogin]);
  return (
    <header className="flex h-14 items-center justify-between gap-8 border-b px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Link to="/admin">
          <img
            className="h-14"
            src="/seoul-cinema-favicon.svg"
            alt="seoul cinema favicon"
          />
        </Link>
        <nav className="flex gap-4 text-lg font-bold">
          {navigations.map(nav => (
            <NavLink
              key={nav.to}
              to={`/admin${nav.to}`}
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'hover:scale-105 hover:opacity-80'
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {isLogin ? (
          <div className="flex gap-4 max-lg:hidden">
            <Button asChild variant="secondary">
              <Link
                to="/"
                onClick={() => {
                  storeLogout();
                }}
              >
                관리자 페이지 로그아웃
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 max-lg:hidden">
            <Button asChild variant="secondary">
              <Link to="/">관리자 페이지 나가기</Link>
            </Button>
          </div>
        )}
        <AdminToggle />
        <ModeToggle />
      </div>
    </header>
  );
}
