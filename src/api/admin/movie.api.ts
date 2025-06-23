import { httpClientForAdmin } from '@/api/admin/adminInstance';

export const getAdminMoviesAPI = async () => {
  return await httpClientForAdmin.get('/api/admin/movies');
};

export const postAdminMovieAPI = async (movie: Partial<AdminMovie>) => {
  return await httpClientForAdmin.post('/api/admin/movies', movie);
};

export const patchAdminMovieAPI = async (movie: AdminMovie) => {
  return await httpClientForAdmin.patch(`/api/admin/movies/${movie.id}`, {
    ...movie,
    id: undefined,
    staffs: undefined,
  });
};

export const deleteAdminMovieAPI = async (movieId: number) => {
  return await httpClientForAdmin.delete(`/api/admin/movies/${movieId}`);
};

export type AdminMovie = {
  id: number;
  title: string;
  runtime: number;
  genre: string;
  rating: string;
  description: string;
  posterUrl: string;
  staffs: Staff[];
};

type Staff = {
  movieName: string;
  personName: string;
  role: string;
};
