import { useState } from "react";
import { Container, ImageCard, ImageGrid, ListTitle, MenuToggleButton, PreContainerGrid, SectionResult, Title, IndexBadge, ImageName } from "./style";
import { FileDropzone } from "./FileDropZone";
import { Sidebar } from "../sidebar";
import { downloadBlob, loadPdfPages, type PageItem } from "../../util/pdf";
import { PdfThumbnail } from "./PdfThumbnail";
import axios from "axios";

export const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfPages, setPdfPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFilesAccepted = async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setLoading(true);
    const pages = await loadPdfPages(selectedFile);
    setPdfPages(pages);
    setSidebarOpen(true);
    setLoading(false);
  };

  const togglePageSelection = (pageIndex: number) => {
    setPdfPages((prev) =>
      prev.map((page, idx) =>
        idx === pageIndex ? { ...page, isSelected: !page.isSelected } : page
      )
    );
  };

  const handleSplit = async () => {
    const pagesToKeep = pdfPages
      .filter((page) => page.isSelected)
      .map((page) => page.pageNumber);
    if (pagesToKeep.length === 0) {
      return alert("Você precisa selecionar pelo menos 1 página do arquivo.");
    }
    if (!file) return
    setLoading(true);


    try {

      const formData = new FormData();

      formData.append("file", file);
      formData.append("pages", JSON.stringify(pagesToKeep));

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/v1/pdf/split",
        formData,
        { responseType: 'blob' }
      );

      if (response.status !== 200) {
        throw new Error("Erro ao processar a divisão do PDF no servidor.");
      }

      const blob = response.data as Blob;
      downloadBlob(blob, "file");

      // setFile(null);
      // setPdfPages([]);
      // setSidebarOpen(false);
    } catch (error) {
      console.error("Erro na requisição de split:", error);
      alert("Falha ao dividir o arquivo PDF. Verifique a conexão com o servidor.");
    } finally {
      setLoading(false);
    }



  };

  return (
    <PreContainerGrid>
      <Container>
        <Title>Dividir arquivos PDF</Title>

        <FileDropzone
          onFilesAccepted={handleFilesAccepted}
          accept={{ 'application/pdf': ['.pdf'] }}
          disabled={loading}
        />

        {pdfPages.length > 0 && file && (
          <SectionResult>
            <ListTitle>Páginas do documento ({pdfPages.length}):</ListTitle>
            <ImageGrid>
              {pdfPages.map((page, idx) => (
                <ImageCard
                  key={idx}
                  onClick={() => togglePageSelection(idx)}
                  style={{
                    opacity: page.isSelected ? 1 : 0.45,
                    border: page.isSelected ? '2px solid #ef4444' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <PdfThumbnail
                    file={file}
                    uniqueId={file.name}
                    pageNumber={page.pageNumber}
                  />

                  <IndexBadge style={{ margin: '0.25rem 0' }}>
                    {page.pageNumber}
                  </IndexBadge>

                  <ImageName style={{ fontSize: '0.7rem' }}>
                    {page.isSelected ? "Manter página" : "Remover página"}
                  </ImageName>
                </ImageCard>
              ))}
            </ImageGrid>
          </SectionResult>
        )}
      </Container>

      {pdfPages.length > 0 && (
        <Sidebar
          title="Dividir PDF"
          actionButtonText={loading ? "Processando..." : "Salvar Alterações →"}
          onAction={handleSplit}
          isActionDisabled={loading}
          isOpen={sidebarOpen}
        >


          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>
              Clique nas páginas que deseja <strong>remover</strong> do arquivo final.
            </p>
            <div style={{ backgroundColor: '#f3f4f6', padding: '0.75rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
              Páginas mantidas: <strong>{pdfPages.filter(p => p.isSelected).length}</strong>
            </div>
          </div>

        </Sidebar>
      )}

      {pdfPages.length > 0 && (
        <MenuToggleButton type="button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '✕' : '⚙️'}
        </MenuToggleButton>
      )}
    </PreContainerGrid>
  );
};