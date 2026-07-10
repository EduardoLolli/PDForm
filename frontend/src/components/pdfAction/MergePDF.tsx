import { useState } from "react";
import { clearFileDropZone } from "../../util/modifications";
import { Container, ImageGrid, ListTitle, MenuToggleButton, PreContainerGrid, SectionResult, Title } from "./style";
import { FileDropzone } from "./FileDropZone";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { SortablePdfCard } from "./SortablePdfCard";
import { Sidebar } from "../sidebar";
import axios from "axios";
import { downloadBlob } from "../../util/pdf";


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
      const resp = await axios.post(
        import.meta.env.VITE_API_URL + "/v1/pdf/merge",
        formData, {
        responseType: 'blob'
      }
      )
      const blob = resp.data;
      downloadBlob(blob, "pdf_mesclado.pdf");
    } catch (error) {
      console.error(error);
      alert("Falha ao juntar os arquivos.");
    } finally {
      setLoading(false);
      clearFileDropZone(setFiles);
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