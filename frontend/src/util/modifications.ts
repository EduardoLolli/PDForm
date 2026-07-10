export const clearFileDropZone = (fileState: React.Dispatch<React.SetStateAction<File[]>>) => {
    fileState([])
}

export const reorderList = (list: File[] , startIndex: number, endIndex: number): File[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed)
    return result
}