import { Card } from '@ui/card';

import { AdminJoinForm } from '@/components/admin/AdminJoinForm';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { useAdminAuthStore } from '@/store/adminAuthStore';

export function AdminHome() {
  const { isLogin } = useAdminAuthStore();

  return (
    <div className="flex justify-center p-4 sm:py-8">
      {isLogin ? (
        <Card className="w-5xl gap-0 p-0">
          <div className="h-full p-2">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-4xl font-semibold">Hi, admin</h1>
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex w-sm flex-col gap-12">
          <AdminLoginForm />
          <AdminJoinForm />
        </div>
      )}
    </div>
  );
}
