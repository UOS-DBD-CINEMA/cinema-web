import { AdminMovies } from '@pages/admin/AdminMovies';
import { Home } from '@pages/Home';
import { Join } from '@pages/Join';
import { Login } from '@pages/Login';
import { MemberTickets } from '@pages/MemberTickets';
import { MovieDetail } from '@pages/MovieDetail';
import { Movies } from '@pages/Movies';
import { NotFound } from '@pages/NotFound';
import { Seats } from '@pages/Seats';
import { Ticketing } from '@pages/Ticketing';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { MainLayout } from '@/routes/layouts/MainLayout';

import { AdminLayout } from './layouts/AdminLayout';
import { AdminHome } from './pages/admin/AdminHome';
import { Payment } from './pages/Payment';

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
      { path: 'movies', Component: AdminMovies },
      { path: '*', Component: NotFound },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
