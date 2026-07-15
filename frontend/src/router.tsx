import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './components/Layout';
import { ImagesToPDF } from './pages/ImagesToPDF';
import { ComingSoon } from './pages/ComingSoon';
import { SplitPDF } from './pages/SplitPDF';
import { MergePDF } from './pages/MergePDF';
import { ConvertDocToPDF } from './pages/DocsToPDF';

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
        path: '/split-pdf',
        element: <SplitPDF />,
      },
      {
        path: '/doc-to-pdf',
        element: <ConvertDocToPDF />,
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