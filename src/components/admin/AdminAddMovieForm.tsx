import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@ui/textarea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { AdminMovie, postAdminMovieAPI } from '@/api/admin/movie.api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { genres } from '@/constants/genre';
import { ratings } from '@/constants/rating';

const formSchema = z.object({
  title: z.string().min(1, 'title must be at least 1 characters.'),
  runtime: z.number().nonnegative(),
  genre: z.string().min(1, 'genre must be at least 1 characters.'),
  rating: z.string().min(1, 'rating must be at least 1 characters.'),
  description: z.string().min(1, 'description must be at least 1 characters.'),
  posterUrl: z.url(),
});

type AdminAddMovieFormProps = {
  movies: AdminMovie[];
  setMovies: React.Dispatch<React.SetStateAction<AdminMovie[]>>;
};

export function AdminAddMovieForm({
  movies,
  setMovies,
}: AdminAddMovieFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    postAdminMovieAPI(values).then(res => {
      setMovies(movies.concat([res.data]));
      setOpen(false);
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button>영화 추가</Button>
        </DialogTrigger>
        <DialogContent className="w-sm">
          <DialogHeader>
            <DialogTitle>영화 추가</DialogTitle>
            <DialogDescription>검토 후 추가하세요</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="runtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Runtime</FormLabel>
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
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-50 justify-between">
                        <SelectValue placeholder="Select paymentType" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map(genre => (
                        <SelectItem key={genre.value} value={genre.value}>
                          {genre.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Rating</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-50 justify-between">
                        <SelectValue placeholder="Select paymentType" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ratings.map(rating => (
                        <SelectItem key={rating.value} value={rating.value}>
                          {rating.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="posterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>posterUrl</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">추가하기</Button>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
