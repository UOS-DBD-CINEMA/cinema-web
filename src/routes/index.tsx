import { createBrowserRouter, RouterProvider } from 'react-router';

import About from './pages/About';
import Home from './pages/Home';

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

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
