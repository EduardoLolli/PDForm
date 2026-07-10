import styled from 'styled-components';
interface AsideProps {
  $isOpen: boolean;
}
export const Aside = styled.aside<AsideProps>`
  width: 320px; 
  height: 100%; 
  background-color: #ffffff;
  border-left: 1px solid #e5e7eb;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0; 

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    margin-top: 60px;
    padding-bottom: 100px;
    width: 320px;
    z-index: 99;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

export const ActionButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;



