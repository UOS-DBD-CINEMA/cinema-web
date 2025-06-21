import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Input } from '@ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod/v4';

import { postMemberAPI } from '@/api/member.api';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  username: z.string().min(2, 'Id must be at least 2 characters.'),
  phone: z
    .string()
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, { error: 'ex) 010-1234-5678' }),
  birthdate: z.date({
    error: issue =>
      issue.input === undefined
        ? 'A date of birth is required'
        : 'Not a string',
  }),
  password: z.string().min(2, 'Id must be at least 2 characters.'),
});

export function JoinForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const navigate = useNavigate();

  function regPhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const result = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    form.setValue('phone', result);
  }
  //job-dongsani.tistory.com/16 [잡동사니 공부방:티스토리]

  function onSubmit(values: z.infer<typeof formSchema>) {
    postMemberAPI({
      ...values,
      birthdate: format(values.birthdate, 'yyyy-MM-dd'),
    }).then(() => {
      navigate('/login', { replace: true });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>핸드폰 번호</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  maxLength={13}
                  placeholder="010-1234-5678"
                  {...field}
                  onChange={regPhoneNumber}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'yyyy-MM-dd')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
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
        <Button type="submit">가입하기</Button>
      </form>
    </Form>
  );
}
