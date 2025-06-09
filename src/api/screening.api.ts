import { httpClient } from '@/api/axios';
import { Movie } from '@/api/movie.api';
import { Theater } from '@/api/theater.api';

export const getScreeningInfosAPI = async (movieId: number) => {
  return await httpClient.get(`api/screenings/movies/${movieId}`);
};

export type ScreeningInfo = {
  id: number;
  startTime: string;
  round: number;
  movie: Movie;
  theater: Theater;
};
