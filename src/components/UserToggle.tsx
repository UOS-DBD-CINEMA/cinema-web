import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useAuthStore } from '@/store/authStore';

export function UserToggle() {
  const { isLogin, storeLogout } = useAuthStore();

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
                navigate('/member/tickets');
              }}
            >
              예매내역
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                storeLogout();
                navigate('/');
              }}
            >
              로그아웃
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate('/join');
              }}
            >
              회원가입
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate('/admin');
          }}
        >
          관리자
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
