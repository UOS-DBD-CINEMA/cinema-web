import { Home } from '@pages/Home';
import { Join } from '@pages/Join';
import { Login } from '@pages/Login';
import { MovieDetail } from '@pages/MovieDetail';
import { Movies } from '@pages/Movies';
import { NotFound } from '@pages/NotFound';
import { Ticket } from '@pages/Ticket';
import { createBrowserRouter, RouterProvider } from 'react-router';

import DefaultLayout from '@/routes/layouts/Default';

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
        path: 'ticket',
        children: [
          { index: true, Component: Ticket },
          { path: ':movieId', Component: Ticket },
        ],
      },
      { path: '*', Component: NotFound },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
