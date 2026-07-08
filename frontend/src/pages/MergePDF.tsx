import { useState } from 'react';
import { FileDropzone } from '../components/FileDropZone';
import { Container, FileItem, FileList, ListTitle, MergeButton, SectionResult, Title } from '../components/styles/MergePDF';


export const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const handleMerge = async () => {
    if (files.length < 2) return alert("Selecione pelo menos 2 PDFs");
    
    setLoading(true);
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:8000/api/v1/pdf/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao processar PDFs");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pdf_mesclado.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert("Falha ao juntar os arquivos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Juntar arquivos PDF</Title>
      
      <FileDropzone 
        onFilesAccepted={handleFilesAccepted} 
        accept={{ 'application/pdf': ['.pdf'] }} 
      />

      {files.length > 0 && (
        <SectionResult>
          <ListTitle>Arquivos selecionados ({files.length}):</ListTitle>
          
          <FileList>
            {files.map((file, idx) => (
              <FileItem key={idx}>{file.name}</FileItem>
            ))}
          </FileList>
          
          <MergeButton onClick={handleMerge} disabled={loading}>
            {loading ? "Processando..." : "Mesclar PDF ->"}
          </MergeButton>
        </SectionResult>
      )}
    </Container>
  );
};