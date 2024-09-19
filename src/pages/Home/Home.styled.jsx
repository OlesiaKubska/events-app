import styled from "styled-components";

export const HomeContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: 80vh;
 text-align: center;

 h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
 }

 p {
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
 }
`;
