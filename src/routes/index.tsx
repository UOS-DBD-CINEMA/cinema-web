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
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/join',
        element: <Join />,
      },
      {
        path: '/movies',
        element: <Movies />,
        children: [{ path: ':movieId', element: <MovieDetail /> }],
      },
      {
        path: '/ticket',
        element: <Ticket />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
