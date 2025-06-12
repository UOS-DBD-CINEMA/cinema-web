import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Join() {
  return (
    <div className="flex min-h-[calc(100svh-(--spacing(14)))] w-full items-center justify-center p-4 sm:py-8">
      <div className="w-sm">
        <Card>
          <CardHeader>
            <CardTitle>회원가입</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
