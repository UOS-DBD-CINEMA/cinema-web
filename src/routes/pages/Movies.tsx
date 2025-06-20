import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { MovieCombobox } from '@/components/MovieCombobox';
import { useMovies } from '@/hooks/useMovies';

export function Movies() {
  const [hoveringMovieId, setHoveringMovieId] = useState<number>(0);
  const { data: movies } = useMovies();

  const navigate = useNavigate();

  return (
    <div className="flex p-4 sm:justify-center sm:py-8">
      <Card className="w-6xl gap-0 p-0">
        <div className="flex flex-col items-center gap-6 p-2">
          <h1 className="text-xl font-semibold">영화 목록</h1>
          <MovieCombobox movies={movies ?? []} />
          <div className="flex flex-wrap justify-center gap-4">
            {movies?.map(movie => (
              <div key={movie.id} className="flex w-50 flex-col">
                <div
                  className="relative w-full"
                  onMouseOver={() => {
                    setHoveringMovieId(movie.id);
                  }}
                  onMouseOut={() => {
                    setHoveringMovieId(0);
                  }}
                  onClick={() => {
                    navigate(`/movies/${movie.id}`);
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="aspect-3/4 rounded-2xl"
                  />
                  {hoveringMovieId === movie.id ? (
                    <div className="absolute top-0 flex h-full w-full flex-col justify-center gap-2 rounded-2xl bg-black/10 p-2">
                      <Button
                        className="rounded-xl"
                        onClick={event => {
                          event.stopPropagation();
                          navigate(`/ticketing`, {
                            state: { movieId: movie.id },
                          });
                        }}
                      >
                        예매하기
                      </Button>
                      <Button variant="secondary" className="rounded-xl">
                        상세보기
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-center text-xl">{movie.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
