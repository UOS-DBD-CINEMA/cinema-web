'use client';

import { Button } from '@ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router';

import { type Movie } from '@/api/movie.api';

type MovieComboboxProps = {
  movies: Movie[];
  admin?: boolean;
};

export function MovieCombobox({ movies, admin }: MovieComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-muted-foreground w-60 justify-between"
        >
          영화 검색
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder="Search movie..." className="h-9" />
          <CommandList>
            <CommandEmpty>No movie found.</CommandEmpty>
            <CommandGroup>
              {movies.map(movie => (
                <CommandItem
                  key={movie.id}
                  value={String(movie.id)}
                  onSelect={selectedMovieId => {
                    navigate(
                      admin
                        ? `/admin/movies/${selectedMovieId}`
                        : `/movies/${selectedMovieId}`,
                      {
                        state: { movie },
                      },
                    );
                    setOpen(false);
                  }}
                >
                  {movie.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
