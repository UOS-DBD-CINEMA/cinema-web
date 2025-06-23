import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useMovie } from '@/hooks/useMovie';

export function MovieDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [movieId, setMovieId] = useState<number>(0);
  const { data: movie } = useMovie(movieId);
  console.log(movie);

  useEffect(() => {
    if (params.movieId) {
      setMovieId(parseInt(params.movieId));
    }
  }, [params]);
  return (
    <div className="flex overflow-auto p-4 sm:justify-center sm:py-8">
      <Card className="w-6xl gap-0 p-0">
        <div className="flex h-full flex-col items-center gap-6 p-2">
          {movie && (
            <div className="flex flex-col gap-8 lg:w-3xl">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-12">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="aspect-3/4 w-50 rounded-2xl sm:w-80"
                />
                <div className="flex flex-col items-start gap-2 sm:scale-120">
                  <p className="text-2xl font-semibold">{movie.title}</p>
                  <p>상영 시간: {movie.runtime}분</p>
                  <p>장르: {movie.genre}</p>
                  <p>등급: {movie.rating}</p>
                  <p>
                    {movie.staff.map(({ name, role }, i) => (
                      <span key={i}>
                        {name}-{role}
                        &ensp;
                      </span>
                    ))}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate(`/ticketing`, {
                        state: { movieId: movie.id },
                      });
                    }}
                  >
                    예매하기
                  </Button>
                </div>
              </div>
              <p className="whitespace-pre-wrap">{movie.description}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
