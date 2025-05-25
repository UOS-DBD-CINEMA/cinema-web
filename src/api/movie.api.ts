import { httpClient } from './axios';

export const getMoviesAPI = async () => {
  return await httpClient.get('/api/movies');
};
