import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
 display: flex;
 justify-content: space-between;
 align-items: center;
 background-color: ${({ theme }) => theme.body};
 padding: 20px;
 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.div`
 h1 {
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
 }
`;

export const NavMenu = styled.ul`
 display: flex;
 list-style: none;
 gap: 20px;
`;

export const NavItem = styled.li`
 margin: 0;
`;

export const StyledLink = styled(NavLink)`
 text-decoration: none;
 font-size: 1.2rem;
 color: ${({ theme }) => theme.text};
 transition: color 0.3s ease;

 &.active {
  font-weight: bold;
  color: ${({ theme }) => theme.buttonBackground};
 }

 &:hover {
  color: ${({ theme }) => theme.buttonBackground};
 }
`;
