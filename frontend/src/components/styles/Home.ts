import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1152px; /* max-w-6xl */
  margin: 0 auto;    /* mx-auto */
  padding: 2rem;     /* p-8 */
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.25rem;    /* text-4xl */
  font-weight: 800;      /* font-extrabold */
  color: #111827;        /* text-gray-900 */
  margin-bottom: 1rem;   /* mb-4 */
`;

export const Subtitle = styled.p`
  color: #4b5563;        /* text-gray-600 */
  margin-bottom: 3rem;   /* mb-12 */
`;

export const Grid = styled.div`
  display: grid;
  grid-template-cols: 1fr;
  gap: 1.5rem;           /* gap-6 */
  max-width: 768px;      /* max-w-3xl */
  margin: 0 auto;        /* mx-auto */

  /* Media query simulando o md:grid-cols-2 */
  @media (min-width: 768px) {
    grid-template-cols: repeat(2, 1fr);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;    /* text-xl */
  font-weight: 700;      /* font-bold */
  color: #1f2937;        /* text-gray-800 */
  margin-bottom: 0.5rem; /* mb-2 */
  transition: color 0.2s;
`;

// Estilizando o Link do react-router-dom e criando o efeito "group-hover"
export const CardLink = styled(Link)`
  display: block;
  padding: 1.5rem;       /* p-6 */
  background-color: #ffffff;
  border: 1px solid #e5e7eb; /* border-gray-200 */
  border-radius: 0.75rem;    /* rounded-xl */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  text-align: left;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* hover:shadow-md */
    
    /* Quando o mouse passar no CardLink, mude a cor do CardTitle que está dentro dele */
    ${CardTitle} {
      color: #ef4444;    /* group-hover:text-red-500 */
    }
  }
`;

export const CardIcon = styled.div`
  color: #ef4444;        /* text-red-500 */
  font-size: 1.875rem;   /* text-3xl */
  font-weight: 700;      /* font-bold */
  margin-bottom: 0.75rem;/* mb-3 */
`;

export const CardDescription = styled.p`
  color: #6b7280;        /* text-gray-500 */
  font-size: 0.875rem;   /* text-sm */
`;