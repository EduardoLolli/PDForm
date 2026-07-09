import { useState } from 'react';
import { Container, ConvertButton, ImageGrid, ListTitle, SectionResult, Title } from './style';
import { clearFileDropZone } from '../../util/modifications';
import { FileDropzone } from './FileDropZone';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableImageCard } from './SortableImageCard';



export const ImagesToPDF = () => {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

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
      clearFileDropZone(setImages);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
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
    <Container>
      <Title>Converter Imagens para PDF</Title>

      <FileDropzone
        onFilesAccepted={handleFilesAccepted}
        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
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
                    />
                  );
                })}
              </ImageGrid>
            </SortableContext>
          </DndContext>

          <ConvertButton onClick={handleConvert} disabled={loading}>
            {loading ? "Convertendo..." : "Converter para PDF ->"}
          </ConvertButton>
        </SectionResult>
      )}
    </Container>
  );
};