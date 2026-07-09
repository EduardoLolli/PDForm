import { useSortable } from "@dnd-kit/sortable";
import { ImageCard, ImageName, ImagePreview, IndexBadge, RemoveImageButton } from "./style";
import { CSS } from '@dnd-kit/utilities';

interface SortableImageCardProps {
    id: string;
    img: File;
    idx: number;
    onRemove: () => void;
}

export const SortableImageCard = ({ id, img, idx, onRemove }: SortableImageCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: isDragging ? '#fef2f2' : '#ffffff',
        border: isDragging ? '2px solid #ef4444' : '1px solid #e5e7eb',
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 999 : 1,
    };

    return (
        <ImageCard
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <RemoveImageButton
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
            >
                ✕
            </RemoveImageButton>

            <ImagePreview
                src={window.URL.createObjectURL(img)}
                alt={img.name}
            />
            <IndexBadge>{idx + 1}</IndexBadge>
            <ImageName>{img.name}</ImageName>
        </ImageCard>
    );
};