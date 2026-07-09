import React from 'react';
import { useDropzone } from 'react-dropzone';
import { DropArea, DropText, HighlightText } from './style';

interface FileDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
  accept: Record<string, string[]>;
  disabled?: boolean;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFilesAccepted,
  accept,
  disabled = false
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesAccepted,
    accept: accept,
    disabled: disabled
  });

  return (
    <DropArea
      {...getRootProps()}
      $isDragActive={isDragActive}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: disabled ? '#f3f4f6' : undefined,
      }}
    >
      <input {...getInputProps()} />

      {disabled ? (
        <DropText $isDragActive={false}>Processando arquivos, aguarde...</DropText>
      ) : isDragActive ? (
        <DropText $isDragActive={isDragActive}>Solte os arquivos aqui...</DropText>
      ) : (
        <DropText $isDragActive={isDragActive}>
          Arraste e solte seus arquivos aqui, ou <HighlightText>clique para selecionar</HighlightText>
        </DropText>
      )}
    </DropArea>
  );
};