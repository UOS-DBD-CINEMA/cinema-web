import { Link, NavLink } from 'react-router';

import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';

const navigations = [
  { to: '/movies', label: '영화' },
  { to: '/tickets', label: '티켓' },
  { to: '/screenings', label: '상영일정' },
  { to: '/theaters', label: '상영관' },
  { to: '/codes', label: '코드' },
];

export function AdminHeader() {
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
        <div className="flex gap-4">
          <Button asChild variant="secondary">
            <Link to="/">관리자 페이지 나가기</Link>
          </Button>
        </div>
        <ModeToggle></ModeToggle>
      </div>
    </header>
  );
}
