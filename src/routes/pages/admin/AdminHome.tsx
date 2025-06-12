import { Card } from '@/components/ui/card';

export function AdminHome() {
  return (
    <div className="flex justify-center p-4 sm:py-8">
      <Card className="w-5xl gap-0 p-0">
        <div className="h-full p-2">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-semibold">Hi, admin</h1>
          </div>
        </div>
      </Card>
    </div>
  );
}
