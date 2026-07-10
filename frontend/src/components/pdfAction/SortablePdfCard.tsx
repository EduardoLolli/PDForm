
import { ImageCard, ImageName, IndexBadge, RemoveImageButton, } from './style';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PdfThumbnail } from './PdfThumbnail';

interface SortablePdfCardProps {
    id: string;
    file: File;
    idx: number;
    onRemove: () => void;
    disabled: boolean
}

export const SortablePdfCard = ({ id, file, idx, onRemove, disabled }: SortablePdfCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: isDragging ? '#fef2f2' : '#ffffff',
        border: isDragging ? '2px solid #ef4444' : '1px solid #e5e7eb',
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 999 : 1,
    };

    return (
        <ImageCard ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <RemoveImageButton
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                disabled={disabled}
            >
                ✕
            </RemoveImageButton>

            <PdfThumbnail
                file={file}
                uniqueId={id} 
                />

            <IndexBadge>{idx + 1}</IndexBadge>
            <ImageName>{file.name}</ImageName>
        </ImageCard>
    );
};


