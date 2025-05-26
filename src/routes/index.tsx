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
    Component: DefaultLayout,
    children: [
      { path: '/', Component: Home },
      { path: '/login', Component: Login },
      { path: '/join', Component: Join },
      { path: '/ticket', Component: Ticket },
      {
        path: '/movies',

        children: [
          { index: true, Component: Movies },
          { path: ':movieId', Component: MovieDetail },
        ],
      },
      { path: '*', Component: NotFound },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
