import * as pdfjsLib from 'pdfjs-dist';

export interface PageItem {
  pageNumber: number;
  isSelected: boolean;
}


export const loadPdfPages = async (file: File): Promise<PageItem[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const pagesArray: PageItem[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      pagesArray.push({
        pageNumber: i,
        isSelected: true,
      });
    }

    return pagesArray;
  } catch (error) {
    console.error("Erro ao ler as páginas do PDF:", error);
    return [];
  }
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}