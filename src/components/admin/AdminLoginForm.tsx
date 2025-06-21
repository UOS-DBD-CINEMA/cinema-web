import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Input } from '@ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { useAdminAuth } from '@/hooks/admin/useAdminAuth';

const formSchema = z.object({
  adminId: z.number().gt(0),
  password: z.string().min(2, 'Password must be at least 2 characters.'),
});

export function AdminLoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { adminLogin } = useAdminAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
    adminLogin(values);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>관리자 로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="adminId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AdminId</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>맨 앞의 0은 무시</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">관리자 로그인</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
