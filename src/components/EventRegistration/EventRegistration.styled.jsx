import styled from "styled-components";

export const RegistrationContainer = styled.div`
 max-width: 600px;
 margin: 0 auto;
 padding: 20px;
`;

export const InputGroup = styled.div`
 margin-bottom: 20px;

 label {
  display: block;
  margin-bottom: 5px;
  font-size: 1.1rem;
 }

 input[type="text"],
 input[type="email"],
 input[type="date"] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
 }

 input[type="radio"] {
  margin-right: 10px;
 }

 p {
  margin-bottom: 5px;
  font-size: 1.1rem;
 }
`;

export const RadioGroup = styled.div`
 display: flex;
 justify-content: space-around;
 margin-top: 10px;

 label {
  display: flex;
  align-items: center;
  margin-right: 20px;
 }

 input[type="radio"] {
  margin-right: 8px;
 }
`;

export const SubmitButton = styled.button`
 background-color: ${({ theme }) => theme.buttonBackground};
 color: ${({ theme }) => theme.buttonText};
 padding: 10px 20px;
 border: none;
 border-radius: 4px;
 cursor: pointer;

 &:hover {
  background-color: darken(${({ theme }) => theme.buttonBackground}, 10%);
 }
`;
