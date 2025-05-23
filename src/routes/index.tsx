import { About } from '@pages/About';
import { Home } from '@pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
