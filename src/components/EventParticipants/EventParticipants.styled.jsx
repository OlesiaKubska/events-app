import styled from "styled-components";

export const ParticipantsContainer = styled.div`
 max-width: 1200px;
 margin: 0 auto;
 padding: 20px;
 background-color: ${({ theme }) => theme.body};
 color: ${({ theme }) => theme.text};
 position: relative;
 z-index: 1;
`;

export const ParticipantsList = styled.ul`
 list-style: none;
 padding: 0;
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
 gap: 20px;
`;

export const ParticipantCard = styled.li`
 background-color: ${({ theme }) => theme.cardBackground};
 border: 1px solid ${({ theme }) => theme.border};
 border-radius: 8px;
 padding: 16px;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 color: ${({ theme }) => theme.text};
`;

export const ParticipantName = styled.h3`
 margin-bottom: 8px;
 font-size: 1.2rem;
`;

export const ParticipantEmail = styled.p`
 color: ${({ theme }) => theme.text};
 font-size: 0.9rem;
`;

export const SearchInput = styled.input`
 padding: 10px;
 margin-bottom: 20px;
 width: 100%;
 max-width: 400px;
 border: 1px solid ${({ theme }) => theme.border};
 border-radius: 5px;
 font-size: 1rem;
 background-color: ${({ theme }) => theme.cardBackground};
 color: ${({ theme }) => theme.text};
`;

export const ChartContainer = styled.div`
 width: 100%;
 max-width: 800px;
 margin: 20px auto;
 background-color: ${({ theme }) => theme.cardBackground};
 color: ${({ theme }) => theme.text};
`;
