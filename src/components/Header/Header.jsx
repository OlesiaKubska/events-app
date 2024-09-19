import PropTypes from "prop-types";
import ThemeToggle from "../ThemeProvider/ThemeToggle";
import { Nav, Logo, NavMenu, NavItem, StyledLink } from "./Header.styled";

const Header = ({ theme, toggleTheme }) => {
 return (
  <Nav>
   <Logo>
    <h1>Events App</h1>
   </Logo>
   <NavMenu>
    <NavItem>
     <StyledLink to="/">Home</StyledLink>
    </NavItem>
    <NavItem>
     <StyledLink to="/events">Events</StyledLink>
    </NavItem>
   </NavMenu>
   <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
  </Nav>
 );
};

Header.propTypes = {
 theme: PropTypes.string.isRequired,
 toggleTheme: PropTypes.func.isRequired,
};

export default Header;
