import { httpClient } from './axios';

export const getMoviesAPI = async () => {
  return await httpClient.get('/api/movies');
};

export interface Movie {
  id: number;
  title: string;
  description: string;
  runtime: number;
  genre: string;
  rating: string;
  posterUrl: string;
}
