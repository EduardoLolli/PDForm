import styled from "styled-components";

export const Container = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const Title = styled.h1`
text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
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