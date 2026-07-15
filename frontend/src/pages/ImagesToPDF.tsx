import { useState } from 'react';
import {
  Container,
  ImageGrid,
  ListTitle,
  PreContainerGrid,
  SectionResult,
  Title,
  MenuToggleButton
} from '../components/pdfAction/style';
import { clearFileDropZone } from '../util/modifications';
import { FileDropzone } from '../components/pdfAction/FileDropZone';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableImageCard } from '../components/pdfAction/SortableImageCard';
import { Sidebar } from '../components/sidebar';

export const ImagesToPDF = () => {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
    setSidebarOpen(true);
  };

  const handleConvert = async () => {
    if (images.length === 0) return alert("Selecione pelo menos 1 imagem");
    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => formData.append("files", image));

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/v1/pdf/from-images", {
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
      clearFileDropZone(setImages);
      setSidebarOpen(false);
    } catch (error) {
      console.error(error);
      alert("Falha ao converter as imagens em PDF.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, idx) => idx !== indexToRemove);
    setImages(updatedImages);
    if (updatedImages.length === 0) setSidebarOpen(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex((img, idx) => `${img.name}-${idx}` === active.id);
        const newIndex = prevImages.findIndex((img, idx) => `${img.name}-${idx}` === over.id);
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }
  };

  const itemIds = images.map((img, idx) => `${img.name}-${idx}`);

  return (
    <PreContainerGrid>
      <Container>
        <Title>Converter Imagens para PDF</Title>

        <FileDropzone
          onFilesAccepted={handleFilesAccepted}
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
          disabled={loading}
        />

        {images.length > 0 && (
          <SectionResult>
            <ListTitle>Imagens selecionadas ({images.length}):</ListTitle>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                <ImageGrid>
                  {images.map((img, idx) => {
                    const uniqueId = `${img.name}-${idx}`;
                    return (
                      <SortableImageCard
                        key={uniqueId}
                        id={uniqueId}
                        img={img}
                        idx={idx}
                        onRemove={() => handleRemoveImage(idx)}
                        loading={loading}
                      />
                    );
                  })}
                </ImageGrid>
              </SortableContext>
            </DndContext>
          </SectionResult>
        )}
      </Container>

      {images.length > 0 && (
        <Sidebar
          title="Conversão de Imagens"
          actionButtonText={loading ? "Convertendo..." : "Converter para PDF →"}
          onAction={handleConvert}
          isActionDisabled={loading}
          isOpen={sidebarOpen}
        >
          <></>
        </Sidebar>
      )}
      {images.length > 0 && (
        <MenuToggleButton type="button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '✕' : '⚙️'}
        </MenuToggleButton>
      )}

    </PreContainerGrid>
  );
};