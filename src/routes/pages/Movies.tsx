import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMovies } from '@/hooks/useMovies';

export function Movies() {
  const [hoveringMovieId, setHoveringMovieId] = useState<number | null>(null);
  const { data: movies } = useMovies();

  const navigate = useNavigate();

  return (
    <div className="flex justify-center p-4 sm:py-8">
      <Card className="w-6xl gap-0 p-0">
        <div className="flex h-full flex-wrap justify-center gap-4 p-2">
          {movies?.map(movie => (
            <div key={movie.id} className="flex w-50 flex-col">
              <div
                className="relative w-fit"
                onMouseOver={() => {
                  setHoveringMovieId(movie.id);
                }}
                onMouseOut={() => {
                  setHoveringMovieId(null);
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
      </Card>
    </div>
  );
}
