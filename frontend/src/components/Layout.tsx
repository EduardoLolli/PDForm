
import { Outlet } from 'react-router-dom';
import { Logo, MainContent, Nav, NavContainer, NavLink } from './styles/Layout';


export const Layout = () => {
    return (
        <div>
            <Nav>
                <NavContainer>
                    <Logo to="/">
                        PD<span>Form</span>
                    </Logo>
                    <NavLink to="/">Início</NavLink>
                </NavContainer>
            </Nav>

            <MainContent>
                <Outlet />
            </MainContent>
        </div>
    );
};