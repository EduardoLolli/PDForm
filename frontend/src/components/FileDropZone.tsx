import React from 'react';
import { useDropzone } from 'react-dropzone';
import { DropArea, DropText, HighlightText } from './styles/FileDropZone';


interface FileDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
  accept: Record<string, string[]>;
}



export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesAccepted, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesAccepted,
    accept: accept
  });

  return (
    <DropArea {...getRootProps()} $isDragActive={isDragActive}>
      <input {...getInputProps()} />
      
      {isDragActive ? (
        <DropText $isDragActive={isDragActive}>Solte os arquivos aqui...</DropText>
      ) : (
        <DropText $isDragActive={isDragActive}>
          Arraste e solte seus arquivos aqui, ou <HighlightText>clique para selecionar</HighlightText>
        </DropText>
      )}
    </DropArea>
  );
};