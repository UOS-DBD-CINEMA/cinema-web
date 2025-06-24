import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
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

import { CodeDetail, postAdminCodeDetailAPI } from '@/api/admin/code.api';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const formSchema = z.object({
  value: z.string().min(1, 'Value must be at least 2 characters.'),
});

type AdminAddCodeDetailDialogProps = {
  codeGroupId: string;
  codeDetails: CodeDetail[];
  setCodeDetails: React.Dispatch<React.SetStateAction<CodeDetail[]>>;
};

export function AdminAddCodeDetailDialog({
  codeGroupId,
  codeDetails,
  setCodeDetails,
}: AdminAddCodeDetailDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    postAdminCodeDetailAPI({ codeGroupId, ...values }).then(res => {
      setCodeDetails(codeDetails.concat([res.data]));
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>추가하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>CodeDetail 추가</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose>
              <Button type="submit">추가하기</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
