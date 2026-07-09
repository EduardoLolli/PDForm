import { useState } from "react";
import { clearFileDropZone, reorderList } from "../../util/modifications";
import { Container, FileItem, FileList, IndexBadge, ListTitle, MergeButton, RemoveButton, SectionResult, Title } from "./style";
import { FileDropzone } from "./FileDropZone";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";


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
      clearFileDropZone(setFiles)
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedFiles = reorderList(
      files,
      result.source.index,
      result.destination.index
    );
    setFiles(reorderedFiles);
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
          <ListTitle>Arquivos selecionados ({files.length})</ListTitle>

          <DragDropContext onDragEnd={onDragEnd}>

            <Droppable droppableId="pdf-files-list">
              {(provided) => (
                <FileList {...provided.droppableProps} ref={provided.innerRef}>

                  {files.map((file, idx) => (
                    <Draggable key={file.name + idx} draggableId={file.name + idx} index={idx}>
                      {(provided, snapshot) => (
                        <FileItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging ? '#fef2f2' : '#ffffff',
                            borderLeft: snapshot.isDragging ? '4px solid #ef4444' : '1px solid #e5e7eb'
                          }}
                        >
                          <IndexBadge>{idx + 1}</IndexBadge>
                          <span>{file.name}</span>
                          <RemoveButton type="button" onClick={() => handleRemoveFile(idx)}>
                            ✕
                          </RemoveButton>
                        </FileItem>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </FileList>
              )}
            </Droppable>
          </DragDropContext>

        </SectionResult>
      )}
    </Container>
  );
};