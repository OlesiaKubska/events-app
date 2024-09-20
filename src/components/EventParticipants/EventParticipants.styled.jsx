import styled from "styled-components";

export const ParticipantsContainer = styled.div`
 max-width: 800px;
 margin: 0 auto;
 padding: 20px;
`;

export const ParticipantsList = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
 gap: 20px;
`;

export const ParticipantCard = styled.div`
 border: 1px solid #ccc;
 border-radius: 8px;
 padding: 16px;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ParticipantName = styled.h3`
 margin-bottom: 8px;
 font-size: 1.2rem;
`;

export const ParticipantEmail = styled.p`
 color: #666;
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
`;
