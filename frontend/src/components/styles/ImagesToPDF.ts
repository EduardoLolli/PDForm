import styled from "styled-components";

export const Container = styled.div`
  max-width: 896px;       /* max-w-4xl */
  margin: 0 auto;         /* mx-auto */
  padding: 1.5rem;        /* p-6 */
`;

export const Title = styled.h1`
  font-size: 1.875rem;    /* text-3xl */
  font-weight: 700;       /* font-bold */
  color: #1f2937;         /* text-gray-800 */
  margin-bottom: 1.5rem;  /* mb-6 */
`;

export const SectionResult = styled.div`
  margin-top: 1.5rem;     /* mt-6 */
`;

export const ListTitle = styled.h3`
  font-weight: 600;       /* font-semibold */
  color: #374151;         /* text-gray-700 */
  margin-bottom: 0.5rem;  /* mb-2 */
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-cols: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;  /* mb-6 */

  @media (min-width: 640px) {
    grid-template-cols: repeat(4, 1fr);
  }
`;

export const ImageCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const ImageName = styled.span`
  font-size: 0.75rem;
  color: #4b5563;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

export const ConvertButton = styled.button`
  background-color: #ef4444; /* bg-red-500 */
  color: #ffffff;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  border: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;