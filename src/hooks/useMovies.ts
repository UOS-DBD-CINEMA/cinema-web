import { useQuery } from '@tanstack/react-query';

import { getMoviesAPI, Movie } from '@/api/movie.api';

export const useMovies = () => {
  const { data } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: async () => await getMoviesAPI().then(res => res.data),
    staleTime: 5000,
    gcTime: Infinity,
  });

  return { data };
};
