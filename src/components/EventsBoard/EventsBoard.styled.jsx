import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
 max-width: 1200px;
 margin: 0 auto;
 padding: 20px;
`;

export const EventsList = styled.ul`
 display: grid;
 grid-template-columns: repeat(1, 1fr);
 gap: 20px;
 list-style-type: none;
 padding: 0;

 @media (min-width: ${({ theme }) => theme.breakpoint.tablet}) {
  grid-template-columns: repeat(2, 1fr);
 }

 @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
  grid-template-columns: repeat(4, 1fr);
 }
`;

export const EventCard = styled.li`
 border: 1px solid ${({ theme }) => theme.border};
 background-color: ${({ theme }) => theme.cardBackground};
 border-radius: 8px;
 padding: 16px;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 width: 250px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
`;

export const EventTitle = styled.h2`
 font-size: 1.5rem;
 margin-bottom: 8px;
 color: ${({ theme }) => theme.text};
`;

export const EventDescription = styled.p`
 font-size: 1rem;
 color: ${({ theme }) => theme.text};
`;

export const EventDate = styled.p`
 font-size: 0.9rem;
 color: ${({ theme }) => theme.text};
`;

export const Organizer = styled.p`
 font-size: 1rem;
 margin-bottom: 12px;
 color: ${({ theme }) => theme.text};
`;

export const ButtonBox = styled.div`
 display: flex;
 justify-content: space-between;
`;

export const ButtonLink = styled(Link)`
 margin: 0 10px;
 color: ${({ theme }) => theme.buttonBackground};
 text-decoration: none;

 &:hover {
  text-decoration: underline;
 }
`;

export const Pagination = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 margin-top: 20px;
 font-size: 1.2rem;
 color: ${({ theme }) => theme.text};
`;

export const PageNumber = styled.span`
 margin: 0 5px;
 cursor: pointer;
 color: ${({ theme }) => theme.buttonBackground};
 font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};

 &:hover {
  text-decoration: underline;
 }
`;

export const Arrow = styled(PageNumber)`
 font-size: 1.5rem;

 &:hover {
  text-decoration: none;
 }
`;
