export const clearFileDropZone = (fileState: React.Dispatch<React.SetStateAction<File[]>>) => {
    fileState([])
}