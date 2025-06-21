import { httpClientForAdmin } from '@/api/admin/adminInstance';

export const getAdminMoviesAPI = async () => {
  return await httpClientForAdmin.get('/api/admin/movies');
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
