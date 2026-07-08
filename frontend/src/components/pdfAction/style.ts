import styled from "styled-components";


export const Title = styled.h1`
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 50px;
  margin-bottom: 1.5rem;
`;


export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 1rem;
  margin-bottom: 1.5rem;  /* mb-6 */

  @media (min-width: 640px) {
    grid-template-cols: repeat(4, 1fr);
  }
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

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
  color: #6b7280;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    color: #ffffff;
    background-color: #ef4444;
    border-color: #ef4444;
  }
`;


export const Container = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 1.5rem;
`;



export const SectionResult = styled.div`
  margin-top: 1.5rem;
`;

export const ListTitle = styled.h3`
  font-weight: 600;
  color: #374151; 
  margin-bottom: 0.5rem;
`;

export const FileList = styled.ul`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  list-style: none;
  padding: 0;

  li:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

export const MergeButton = styled.button`
  background-color: #ef4444;
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
export const FileItem = styled.li`
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    color: #ef4444;
    background-color: #fee2e2;
  }
`;


// ********* FILE DROP ZONE ************* //


interface DropAreaProps {
  $isDragActive: boolean;
}


export const DropArea = styled.div<DropAreaProps>`
  border-style: dashed;
  margin-top: 90px;
  border-radius: 0.5rem;
  padding: 5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  border-color: ${props => props.$isDragActive ? '#ef4444' : '#d1d5db'}; 
  background-color: ${props => props.$isDragActive ? '#fef2f2' : 'transparent'}; 

  &:hover {
    border-color: ${props => props.$isDragActive ? '#ef4444' : '#f87171'}; 
  }
`;

export const DropText = styled.p<DropAreaProps>`
  font-weight: 500;
  color: ${props => props.$isDragActive ? '#ef4444' : '#4b5563'}; 
  margin: 0;
`;

export const HighlightText = styled.span`
  color: #ef4444;
  font-weight: 500;
`;