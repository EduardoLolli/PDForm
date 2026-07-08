import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { MergePDF } from './components/MergePDF';
import { Layout } from './components/Layout';
import { ImagesToPDF } from './components/ImagesToPDF';
import { ComingSoon } from './pages/ComingSoon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
      },
      {
        path: 'coming-soon',
        element: <ComingSoon />
      }
    ],
  }, {
    path: '/teste',
  }
]);