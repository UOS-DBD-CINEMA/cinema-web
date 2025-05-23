import { useEffect } from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { useAuth } from '@/hooks/useAuth';

export function Home() {
  const { memberJoin, memberLogin, getMember, deleteMember } = useAuth();

  useEffect(() => {
    // memberJoin({
    //   username: 'string',
    //   password: 'string',
    //   phone: 'string',
    //   birthdate: '2025-05-16',
    // });
    // memberLogin({
    //   username: 'string',
    //   password: 'string',
    // });
    getMember();
    deleteMember();
  }, []);

  return (
    <div>
      <ModeToggle></ModeToggle>
    </div>
  );
}
