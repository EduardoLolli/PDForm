import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { MergePDF } from './pages/MergePDF';
import { Layout } from './components/Layout';
import { ImagesToPDF } from './components/ImagesToPDF';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Se quiser uma Navbar fixa em todas as páginas
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/merge',
        element: <MergePDF />,
      },
      {
        path: '/from-images',
        element: <ImagesToPDF />,
      }
    ],
  },
]);