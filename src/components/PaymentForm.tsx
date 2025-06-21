import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod/v4';

import { Seat } from '@/api/seat.api';
import { postTicketAPI } from '@/api/ticket.api';

const paymentTypes = [
  { label: '카드', value: '카드' },
  { label: '계좌이체', value: '계좌이체' },
] as const;

const discountTypes = [
  { label: '포인트', value: '포인트' },
  { label: '통신사', value: '통신사' },
] as const;

const formSchema = z.object({
  paymentType: z.string().min(1, 'Please select a paymentType.'),
  discountType: z.string().min(1, 'Please select a discountType.'),
});

type PaymentFormProps = {
  screeningId: number;
  selectedSeats: Seat[];
};

export function PaymentForm({ screeningId, selectedSeats }: PaymentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentType: '',
      discountType: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (payment: z.infer<typeof formSchema>) => {
    postTicketAPI({
      screeningId,
      seats: selectedSeats.map(seat => ({ ...seat, available: undefined })),
      payment,
    }).then(() => {
      navigate('/member/tickets');
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">결제 수단</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-50 justify-between">
                    <SelectValue placeholder="Select paymentType" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentTypes.map(paymentType => (
                    <SelectItem
                      key={paymentType.value}
                      value={paymentType.value}
                    >
                      {paymentType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>카드/계좌이체</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">할인</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-50 justify-between">
                    <SelectValue placeholder="Select discountType" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {discountTypes.map(discountType => (
                    <SelectItem
                      key={discountType.value}
                      value={discountType.value}
                    >
                      {discountType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>포인트/통신사</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">결제하기</Button>
      </form>
    </Form>
  );
}
