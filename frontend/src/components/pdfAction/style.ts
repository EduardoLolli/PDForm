import styled from "styled-components";


export const Title = styled.h1`
  text-align: center;
  font-size: 2.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 50px;
  margin-bottom: 1.5rem;
`;


export const ImageGrid = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 220px;
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

export const PreContainerGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 64px); 
  position: relative;
  overflow: hidden; 

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    overflow: visible;
  }
`;

export const Container = styled.div`
  flex: 1;
  /* max-width: 1200px; */
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  overflow-y: auto; 
  transition: all 0.3s ease;
  box-sizing: border-box;
`;

export interface DropAreaProps {
  $isDragActive: boolean;
}

export const DropArea = styled.div<DropAreaProps>`
  border-style: dashed;
  margin-top: 40px;
  margin: 0 auto;
  border-radius: 0.5rem;
  padding: 5.5rem 2rem; 
  text-align: center;
  cursor: pointer;
  max-width: 1200px; 
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  border-color: ${props => props.$isDragActive ? '#ef4444' : '#d1d5db'}; 
  background-color: ${props => props.$isDragActive ? '#fef2f2' : 'transparent'}; 

  &:hover {
    border-color: ${props => props.$isDragActive ? '#ef4444' : '#f87171'}; 
  }
`;

export const MenuToggleButton = styled.button`
  display: none;
  position: fixed;
  top: 5.5rem;
  right: 1.5rem; 
  z-index: 100;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;





export const SectionResult = styled.div`
  margin-top: 1.5rem;
  max-width:1200px;
  margin: 0 auto;
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

export const IndexBadge = styled.span`
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 0.75rem;
  font-weight: 700;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;


// ********* FILE DROP ZONE ************* //






export const DropText = styled.p<DropAreaProps>`
  font-weight: 500;
  color: ${props => props.$isDragActive ? '#ef4444' : '#4b5563'}; 
  margin: 0;
`;

export const HighlightText = styled.span`
  color: #ef4444;
  font-weight: 500;
`;