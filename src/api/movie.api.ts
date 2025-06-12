import { httpClient } from '@/api/axios';

export const getMoviesAPI = async () => {
  return await httpClient.get('/api/movies');
};

export const getMovieDetailAPI = async (movieId: number) => {
  return await httpClient.get(`/api/movies/${movieId}`);
};

export type Movie = {
  id: number;
  title: string;
  description: string;
  runtime: number;
  genre: string;
  rating: string;
  posterUrl: string;
};

type Staff = {
  name: string;
  role: string;
};

export type MovieDetail = Movie & {
  staff: Staff[];
};
