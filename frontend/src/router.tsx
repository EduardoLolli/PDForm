import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { MergePDF } from './components/pdfAction/MergePDF';
import { Layout } from './components/Layout';
import { ImagesToPDF } from './components/pdfAction/ImagesToPDF';
import { ComingSoon } from './pages/ComingSoon';
import { SplitPDF } from './components/pdfAction/SplitPDF';

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
        path: 'coming-soon',
        element: <ComingSoon />
      }
    ],
  }, {
    path: '/teste',
  }
]);