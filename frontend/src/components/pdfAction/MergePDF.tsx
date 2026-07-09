import { useState } from "react";
import { clearFileDropZone, reorderList } from "../../util/modifications";
import { Container, ConvertButton, FileItem, FileList, ImageGrid, IndexBadge, ListTitle, MenuToggleButton, MergeButton, PreContainerGrid, RemoveButton, SectionResult, Title } from "./style";
import { FileDropzone } from "./FileDropZone";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { SortablePdfCard } from "./SortablePdfCard";
import { Sidebar } from "../sidebar";


export const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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
      clearFileDropZone(setFiles)
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFiles((prev) => {
        const oldIndex = prev.findIndex((f, idx) => `${f.name}-${idx}` === active.id);
        const newIndex = prev.findIndex((f, idx) => `${f.name}-${idx}` === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const itemIds = files.map((f, idx) => `${f.name}-${idx}`);

  return (

    <PreContainerGrid>
      <Container>
        <Title>Juntar arquivos PDF</Title>

        <FileDropzone
          onFilesAccepted={handleFilesAccepted}
          accept={{ 'application/pdf': ['.pdf'] }}
          disabled={loading}
        />



        {files.length > 0 && (
          <SectionResult>
            <ListTitle>Arquivos selecionados ({files.length}):</ListTitle>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                <ImageGrid>
                  {files.map((file, idx) => {
                    const uniqueId = `${file.name}-${idx}`;
                    return (
                      <SortablePdfCard
                        key={uniqueId}
                        id={uniqueId}
                        file={file}
                        idx={idx}
                        onRemove={() => handleRemoveFile(idx)}
                        disabled={loading}
                      />
                    );
                  })}
                </ImageGrid>
              </SortableContext>
            </DndContext>

            <ConvertButton onClick={handleMerge} disabled={loading}>
              {loading ? "Processando..." : "Mesclar PDF ->"}
            </ConvertButton>
          </SectionResult>
        )}
      </Container>
      {files.length > 0 && (
        <Sidebar
          title="Mesclar PDF"
          actionButtonText={loading ? "Convertendo..." : "Converter para PDF →"}
          onAction={handleMerge}
          isActionDisabled={loading}
          isOpen={sidebarOpen}
        >
          <></>
        </Sidebar>
      )}
      {files.length > 0 && (
        <MenuToggleButton type="button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '✕' : '⚙️'}
        </MenuToggleButton>
      )}

    </PreContainerGrid>
  );
};