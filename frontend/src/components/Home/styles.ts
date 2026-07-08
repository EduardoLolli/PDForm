import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1444px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  @media (max-width: 640px) {
  display:flex;
  flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  color: #4b5563;
  margin-bottom: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
  gap: 1.5rem; 
  margin: 0 auto;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
`;

export const CardLink = styled(Link)`
  display: flex;
  align-items: center;
  max-width: 240px;
  gap: 1rem;             
  flex-direction: column;
  padding: 1rem 1.25rem;  
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;  
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px); 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    
    ${CardTitle} {
      color: #ef4444;
    }
  }
`;

export const CardIcon = styled.div`
  color: #ef4444;       
  font-size: 1.875rem;   
  font-weight: 700;     
  margin-bottom: 0.75rem;
`;

export const CardDescription = styled.p`
  color: #6b7280;        
  font-size: 0.875rem;  
`;