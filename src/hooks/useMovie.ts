import { useQuery } from '@tanstack/react-query';

import { getMovieDetailAPI, type MovieDetail } from '@/api/movie.api';

export const useMovie = (movieId: number) => {
  const { data } = useQuery<MovieDetail>({
    queryKey: ['movie', movieId],
    queryFn: async () => await getMovieDetailAPI(movieId).then(res => res.data),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!movieId,
  });

  return { data };
};
