import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import styled from 'styled-components';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
  file: File;
}

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 220px;
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

export const PdfThumbnail = ({ file }: PdfThumbnailProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
            canvas: canvas,
          };

          await page.render(renderContext).promise;

          setThumbnailUrl(canvas.toDataURL());
        }
      } catch (error) {
        console.error("Erro ao gerar miniatura do PDF:", error);
      }
    };

    generateThumbnail();
  }, [file]);

  return (
    <ThumbnailWrapper>
      {thumbnailUrl ? (
        <StyledImg src={thumbnailUrl} alt={file.name} />
      ) : (
        <LoadingText>Carregando...</LoadingText>
      )}
    </ThumbnailWrapper>
  );
};