import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod/v4';

import { Seat } from '@/api/seat.api';
import { postTicketAPI } from '@/api/ticket.api';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

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
    }).then(res => {
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
            <FormItem className="flex flex-col">
              <FormLabel className="text-md">결제 수단</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-50 justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? paymentTypes.find(
                            paymentType => paymentType.value === field.value,
                          )?.label
                        : 'Select paymentType'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-50 p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search paymentType..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No paymentType found.</CommandEmpty>
                      <CommandGroup>
                        {paymentTypes.map(paymentType => (
                          <CommandItem
                            value={paymentType.label}
                            key={paymentType.value}
                            onSelect={() => {
                              form.setValue('paymentType', paymentType.value);
                            }}
                          >
                            {paymentType.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                paymentType.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>카드/계좌이체</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-md">할인</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-50 justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? discountTypes.find(
                            discountType => discountType.value === field.value,
                          )?.label
                        : 'Select discountType'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-50 p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search discountType..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No discountType found.</CommandEmpty>
                      <CommandGroup>
                        {discountTypes.map(discountType => (
                          <CommandItem
                            value={discountType.label}
                            key={discountType.value}
                            onSelect={() => {
                              form.setValue('discountType', discountType.value);
                            }}
                          >
                            {discountType.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                discountType.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
