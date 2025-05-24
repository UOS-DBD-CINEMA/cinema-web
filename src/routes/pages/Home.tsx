import { useEffect } from 'react';

import { useMember } from '@/hooks/useMember';

export function Home() {
  const { JoinMember } = useMember();

  useEffect(() => {
    JoinMember({
      username: 'string',
      password: 'string',
      phone: 'string',
      birthdate: '2025-05-16',
    });
  }, []);

  return <div>Home</div>;
}
