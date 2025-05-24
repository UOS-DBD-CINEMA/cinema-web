import { Home } from '@pages/Home';
import { Join } from '@pages/Join';
import { Login } from '@pages/Login';
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
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
