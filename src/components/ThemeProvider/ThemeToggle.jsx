import { func, string } from "prop-types";
import { Button } from "./ThemeToggleButton.styled";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ theme, toggleTheme }) => {
 return (
  <Button onClick={toggleTheme}>
   {theme === "light" ? <FaMoon /> : <FaSun />}
  </Button>
 );
};

ThemeToggle.propTypes = {
 theme: string.isRequired,
 toggleTheme: func.isRequired,
};

export default ThemeToggle;
