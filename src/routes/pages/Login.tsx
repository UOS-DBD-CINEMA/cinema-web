import { LoginForm } from '@/components/LoginForm';

export function Login() {
  return (
    <div className="flex min-h-[calc(100svh-(--spacing(14)))] w-full items-center justify-center p-4 sm:py-8">
      <div className="w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
