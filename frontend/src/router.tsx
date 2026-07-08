import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { MergePDF } from './components/pdfAction/MergePDF';
import { Layout } from './components/Layout';
import { ImagesToPDF } from './components/pdfAction/ImagesToPDF';
import { ComingSoon } from './pages/ComingSoon';
import { CutPDF } from './components/pdfAction/CutPDF';

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
        path: '/cut-pdf',
        element: <CutPDF />,
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