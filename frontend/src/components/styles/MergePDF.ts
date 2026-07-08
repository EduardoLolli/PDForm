import styled from "styled-components";

export const Container = styled.div`
  max-w-4xl: 896px;       /* max-w-4xl */
  max-width: 896px;
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

export const FileList = styled.ul`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem; /* rounded-md */
  margin-bottom: 1rem;     /* mb-4 */
  list-style: none;
  padding: 0;

  /* Simula o divide-y do Tailwind (borda entre itens da lista) */
  li:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

export const FileItem = styled.li`
  padding: 0.75rem;       /* p-3 */
  font-size: 0.875rem;    /* text-sm */
  color: #4b5563;         /* text-gray-600 */
`;

export const MergeButton = styled.button`
  background-color: #ef4444; /* bg-red-500 */
  color: #ffffff;
  font-weight: 700;       /* font-bold */
  padding: 0.75rem 1.5rem;/* py-3 px-6 */
  border-radius: 0.25rem;  /* rounded */
  border: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); /* shadow */
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #dc2626; /* hover:bg-red-600 */
  }

  /* Estado desabilitado (enquanto envia arquivos) */
  &:disabled {
    background-color: #9ca3af; /* disabled:bg-gray-400 */
    cursor: not-allowed;
  }
`;
