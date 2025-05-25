import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

import { getMoviesAPI } from '@/api/movie.api';

const setInitialIsTopMovies = () => {
  const topMovies = localStorage.getItem('topMovies');
  if (topMovies) return true;

  getMoviesAPI().then(
    res => {
      localStorage.setItem('topMovies', JSON.stringify(res.data));
      return true;
    },
    err => {
      return false;
    },
  );
};

const initialState = {
  isTopMovies: setInitialIsTopMovies(),
};

export const useTopMoviesStore = create(
  devtools(combine(initialState, () => ({}))),
);
