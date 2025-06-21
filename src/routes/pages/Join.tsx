import { JoinForm } from '@/components/JoinForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Join() {
  return (
    <div className="flex min-h-[calc(100svh-(--spacing(14)))] w-full items-center justify-center p-4 sm:py-8">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <JoinForm />
        </CardContent>
      </Card>
    </div>
  );
}
