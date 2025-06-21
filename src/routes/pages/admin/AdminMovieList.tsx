import { useNavigate } from 'react-router';

import { AdminMovie } from '@/api/admin/movie.api';
import { Button } from '@/components/ui/button';

type AdminMovieListProps = {
  movies: AdminMovie[];
  setMovies: React.Dispatch<React.SetStateAction<AdminMovie[]>>;
};

export function AdminMovieList({ movies, setMovies }: AdminMovieListProps) {
  const navigate = useNavigate();

  return (
    <>
      {movies.map(movie => {
        return (
          <div
            key={movie.id}
            className="flex flex-wrap items-center justify-center gap-4 border-t border-dashed py-2"
          >
            <div className="flex w-xs items-center gap-2 sm:w-md">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="aspect-3/4 w-30 rounded-2xl"
              />
              <div className="flex flex-col items-start">
                <p className="truncate text-2xl font-semibold">{movie.title}</p>
                <p>상영 시간: {movie.runtime}분</p>
                <p>장르: {movie.genre}</p>
                <p>
                  {movie.staffs.map(({ movieName, personName, role }, i) => (
                    <span key={i}>
                      {personName}-{role}-{movieName}
                      &ensp;
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setMovies(movies.filter(m => m.id !== movie.id));
                }}
              >
                삭제하기
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  navigate(`/admin/movies/${movie.id}`);
                }}
              >
                수정하기
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
