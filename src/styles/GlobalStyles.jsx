import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Arial', sans-serif;
    transition: background-color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.buttonBackground};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  button {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
    }
  }
`;
