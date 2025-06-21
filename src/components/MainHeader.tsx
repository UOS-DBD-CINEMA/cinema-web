import { useEffect } from 'react';
import { Link, NavLink } from 'react-router';

import { postMemberAPI } from '@/api/member.api';
import { useAuthStore } from '@/store/authStore';

import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { UserToggle } from './UserToggle';

const navigations = [
  { to: '/movies', label: '영화' },
  { to: '/ticketing', label: '티켓' },
];

export function MainHeader() {
  const { isLogin, storeLogout, updateLogin } = useAuthStore();

  useEffect(() => {
    updateLogin();

    postMemberAPI({
      username: 'uos',
      password: 'uos',
      phone: '012-3456-7890',
      birthdate: '2000-01-01',
    });
  }, [updateLogin]);

  return (
    <header className="flex h-14 items-center justify-between gap-8 border-b px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            className="h-0 md:h-14"
            src="/seoul-cinema-logo.svg"
            alt="seoul cinema logo"
          />
          <img
            className="h-0 max-md:h-14"
            src="/seoul-cinema-favicon.svg"
            alt="seoul cinema favicon"
          />
        </Link>
        <nav className="flex gap-4 text-lg font-bold">
          {navigations.map(nav => (
            <NavLink
              key={nav.to}
              to={nav.to}
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
            <Button asChild>
              <Link to="/member/tickets">예매내역</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link
                to="/"
                onClick={() => {
                  storeLogout();
                }}
              >
                로그아웃
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 max-lg:hidden">
            <Button asChild>
              <Link to="/login">로그인</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/join">회원가입</Link>
            </Button>
          </div>
        )}
        <UserToggle />
        <ModeToggle />
      </div>
    </header>
  );
}
