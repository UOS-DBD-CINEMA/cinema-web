import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
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
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
};

export default Home;
