import styled from "styled-components";

export const Button = styled.button`
 border: 2px solid ${({ theme }) => theme.toggleBorder};
 border-radius: 30px;
 font-size: 0.8rem;
 padding: 0.6rem;
 display: flex;
 align-items: center;
 justify-content: center;
`;
