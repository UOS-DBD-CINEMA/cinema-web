import { AdminCodes } from '@pages/admin/AdminCodes';
import { AdminHome } from '@pages/admin/AdminHome';
import { AdminMovieDetail } from '@pages/admin/AdminMovieDetail';
import { AdminMovies } from '@pages/admin/AdminMovies';
import { Home } from '@pages/Home';
import { Join } from '@pages/Join';
import { Login } from '@pages/Login';
import { MemberTickets } from '@pages/MemberTickets';
import { MovieDetail } from '@pages/MovieDetail';
import { Movies } from '@pages/Movies';
import { NotFound } from '@pages/NotFound';
import { Payment } from '@pages/Payment';
import { Seats } from '@pages/Seats';
import { Ticketing } from '@pages/Ticketing';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { AdminLayout } from '@/routes/layouts/AdminLayout';
import { MainLayout } from '@/routes/layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'join', Component: Join },
      {
        path: 'movies',
        children: [
          { index: true, Component: Movies },
          { path: ':movieId', Component: MovieDetail },
        ],
      },
      {
        path: 'ticketing',
        children: [
          { index: true, Component: Ticketing },
          { path: 'seats', Component: Seats },
          { path: 'payment', Component: Payment },
        ],
      },
      {
        path: 'member',
        children: [{ path: 'tickets', Component: MemberTickets }],
      },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminHome },
      {
        path: 'movies',
        children: [
          { index: true, Component: AdminMovies },
          { path: ':movieId', Component: AdminMovieDetail },
        ],
      },
      { path: 'codes', Component: AdminCodes },
      { path: '*', Component: NotFound },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
