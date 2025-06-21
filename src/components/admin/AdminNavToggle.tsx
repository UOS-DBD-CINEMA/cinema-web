import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

import { adminNavigations } from '@/components/admin/AdminHeader';
import { cn } from '@/lib/utils';

export function AdminNavToggle({ className }: React.ComponentProps<'button'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={cn(className)}>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <nav>
          {adminNavigations.map(nav => (
            <NavLink
              key={nav.to}
              to={`/admin${nav.to}`}
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'hover:opacity-80'
              }
            >
              <DropdownMenuItem>{nav.label}</DropdownMenuItem>
            </NavLink>
          ))}
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
