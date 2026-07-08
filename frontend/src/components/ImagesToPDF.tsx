import { useState } from 'react';
import styled from 'styled-components';
import { FileDropzone } from './FileDropZone';
import { Container, ConvertButton, ImageCard, ImageGrid, ImageName, ImagePreview, ListTitle, RemoveImageButton, SectionResult, Title } from './styles/ImagesToPDF';
import { clearFileDropZone } from '../util/FileDropZone';


export const ImagesToPDF = () => {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const handleConvert = async () => {
    if (images.length === 0) return alert("Selecione pelo menos 1 imagem");

    setLoading(true);
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await fetch("http://localhost:8000/api/v1/pdf/from-images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao converter imagens");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'imagens_convertidas.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert("Falha ao converter as imagens em PDF.");
    } finally {
      setLoading(false);
      clearFileDropZone(setImages)
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <Container>
      <Title>Converter Imagens para PDF</Title>

      <FileDropzone
        onFilesAccepted={handleFilesAccepted}
        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
      />

      {images.length > 0 && (
        <SectionResult>
          <ListTitle>Imagens selecionadas ({images.length}):</ListTitle>

          <ImageGrid>
            {images.map((file, idx) => (
              <ImageCard key={idx}>
                <RemoveImageButton type="button" onClick={() => handleRemoveImage(idx)}>
                  ✕
                </RemoveImageButton>
                <ImagePreview
                  src={window.URL.createObjectURL(file)}
                  alt={file.name}
                />
                <ImageName>{file.name}</ImageName>
              </ImageCard>
            ))}
          </ImageGrid>

          <ConvertButton onClick={handleConvert} disabled={loading}>
            {loading ? "Convertendo..." : "Converter para PDF ->"}
          </ConvertButton>
        </SectionResult>
      )}
    </Container>
  );
};