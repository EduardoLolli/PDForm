import { Link } from "react-router-dom";
import styled from "styled-components";


export const Nav = styled.nav`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const NavContainer = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 900;
  color: #111827;
  text-decoration: none;
  letter-spacing: 0.05em;

  &:hover {
    opacity: 0.8;
  }

  span {
    color: #ef4444; /* O "Form" em vermelho */
  }
`;

export const NavLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  text-decoration: none;

  &:hover {
    color: #111827;
  }
`;

export const MainContent = styled.main`
  background-color: #f1f5f8;
  min-height: calc(100vh - 65px);
  padding: 2.5rem 0;
`;