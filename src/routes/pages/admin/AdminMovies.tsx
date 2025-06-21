import { useEffect, useState } from 'react';

import { AdminMovie, getAdminMoviesAPI } from '@/api/admin/movie.api';
import { MovieCombobox } from '@/components/MovieCombobox';
import { Card } from '@/components/ui/card';

import { AdminMovieList } from './AdminMovieList';

export function AdminMovies() {
  const [movies, setMovies] = useState<AdminMovie[]>([]);
  console.log(movies);

  useEffect(() => {
    getAdminMoviesAPI().then(res => {
      setMovies(res.data);
    });
  }, []);
  return (
    <div className="flex overflow-auto p-4 sm:justify-center sm:py-8">
      <Card className="w-3xl gap-0 p-0">
        <div className="flex flex-col items-center gap-6 p-2">
          <h1 className="text-xl font-semibold">영화 목록</h1>
          <MovieCombobox movies={movies} admin />
          <AdminMovieList movies={movies} setMovies={setMovies} />
        </div>
      </Card>
    </div>
  );
}
