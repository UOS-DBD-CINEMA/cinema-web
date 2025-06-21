import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Input } from '@ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { postAdminAPI } from '@/api/admin/admin.api';

const formSchema = z.object({
  password: z.string().min(2, 'Password must be at least 2 characters.'),
});

export function AdminJoinForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    postAdminAPI(values).then(res => {
      alert(
        `adminId는 ${res.data.adminId}입니다. 
        로그인할 때 필요하니 기억해주세요.`,
      );
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>관리자 회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
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
            <Button type="submit">관리자 회원가입</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
