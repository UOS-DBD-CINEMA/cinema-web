import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useAdminAuthStore } from '@/store/adminAuthStore';

export function AdminToggle() {
  const { isLogin, storeLogout } = useAdminAuthStore();

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isLogin ? (
          <>
            <DropdownMenuItem
              onClick={() => {
                storeLogout();
                navigate('/');
              }}
            >
              관리자 페이지 로그아웃
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => {
                navigate('/');
              }}
            >
              관리자 페이지 나가기
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
