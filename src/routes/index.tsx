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

import { DefaultLayout } from '@/routes/layouts/Default';

const router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
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
        ],
      },
      {
        path: 'memberPage',
        children: [{ path: 'tickets', Component: MemberTickets }],
      },
      { path: '*', Component: NotFound },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
