import styled from "styled-components";

// Interface para as propriedades que controlam o estilo dinâmico
interface DropAreaProps {
  $isDragActive: boolean;
}

// --- Componentes Estilizados ---

// Usamos o prefixo "$" (Transient Props) para evitar que a prop vaze para a tag HTML nativa <div>
export const DropArea = styled.div<DropAreaProps>`
  border-2: 2px solid;
  border-style: dashed;
  border-radius: 0.5rem;    /* rounded-lg */
  padding: 3rem;            /* p-12 */
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;     /* transition-colors */

  /* Alterna as cores baseado no estado de arrastar (isDragActive) */
  border-color: ${props => props.$isDragActive ? '#ef4444' : '#d1d5db'}; /* border-red-500 : border-gray-300 */
  background-color: ${props => props.$isDragActive ? '#fef2f2' : 'transparent'}; /* bg-red-50 : transparente */

  &:hover {
    border-color: ${props => props.$isDragActive ? '#ef4444' : '#f87171'}; /* hover:border-red-400 */
  }
`;

export const DropText = styled.p<DropAreaProps>`
  font-weight: 500;
  color: ${props => props.$isDragActive ? '#ef4444' : '#4b5563'}; /* text-red-500 : text-gray-600 */
  margin: 0;
`;

export const HighlightText = styled.span`
  color: #ef4444;           /* text-red-500 */
  font-weight: 500;         /* font-medium */
`;