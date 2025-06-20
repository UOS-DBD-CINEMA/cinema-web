import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useMovie } from '@/hooks/useMovie';

export function MovieDetail() {
  const [movieId, setMovieId] = useState<number>(0);
  const { data } = useMovie(movieId);

  const params = useParams();

  useEffect(() => {
    if (params.movieId) {
      const movieId = parseInt(params.movieId);
      setMovieId(movieId);
    }
  }, [params]);
  return (
    <>
      <h1>MovieDetail</h1>
    </>
  );
}
