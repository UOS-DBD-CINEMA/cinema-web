import { httpClient } from '@/api/instance';
import { Movie } from '@/api/movie.api';
import { Theater } from '@/api/theater.api';

export const getScreeningsAPI = async (movieId: number) => {
  return await httpClient.get(`api/screenings/movies/${movieId}`);
};

export type Screening = {
  id: number;
  startTime: string;
  round: number;
  movie: Movie;
  theater: Theater;
};
