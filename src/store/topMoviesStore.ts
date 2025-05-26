import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

import { getMoviesAPI, type Movie } from '@/api/movie.api';

export const getTopMoviesFromLocalStorage = () => {
  const topMoviesJSON = localStorage.getItem('topMovies');
  if (topMoviesJSON) {
    const topMovies = JSON.parse(topMoviesJSON) satisfies Movie[] as Movie[];
    return topMovies;
  }
  return [];
};

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
