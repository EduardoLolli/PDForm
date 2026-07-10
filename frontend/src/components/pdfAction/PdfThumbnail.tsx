import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import styled from 'styled-components';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
  file: File;
  uniqueId: string;
  pageNumber?: number;
}

const thumbnailCache: Record<string, string> = {};

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 160px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LoadingText = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const PdfThumbnail = ({ file, uniqueId, pageNumber = 1 }: PdfThumbnailProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const cacheKey = `${uniqueId}-p${pageNumber}`;

  useEffect(() => {
    if (thumbnailCache[cacheKey]) {
      setThumbnailUrl(thumbnailCache[cacheKey]);
      return;
    }

    let isMounted = true;

    const generateThumbnail = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({ scale: 0.4 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context && isMounted) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            canvas,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          if (isMounted) {
            const base64Image = canvas.toDataURL('image/jpeg', 0.7);
            thumbnailCache[cacheKey] = base64Image;
            setThumbnailUrl(base64Image);
          }
        }
      } catch (error) {
        console.error("Erro ao gerar miniatura:", error);
      }
    };

    generateThumbnail();

    return () => {
      isMounted = false;
    };
  }, [file, cacheKey, pageNumber]);

  return (
    <ThumbnailWrapper>
      {thumbnailUrl ? (
        <StyledImg src={thumbnailUrl} alt={`${file.name} - Página ${pageNumber}`} />
      ) : (
        <LoadingText>Carregando...</LoadingText>
      )}
    </ThumbnailWrapper>
  );
};