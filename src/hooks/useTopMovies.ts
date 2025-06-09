import { useQuery } from '@tanstack/react-query';

import { getMoviesAPI, Movie } from '@/api/movie.api';

export const useTopMovies = () => {
  const { data } = useQuery<Movie[]>({
    queryKey: ['topMovies'],
    queryFn: async () => await getMoviesAPI().then(res => res.data),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { data };
};
