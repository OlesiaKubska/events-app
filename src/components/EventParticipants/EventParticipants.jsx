import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
 ParticipantCard,
 ParticipantEmail,
 ParticipantName,
 ParticipantsContainer,
 ParticipantsList,
 SearchInput,
} from "./EventParticipants.styled";

const EventParticipants = () => {
 const { eventId } = useParams();
 const [participants, setParticipants] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
  const fetchParticipants = async () => {
   try {
    const response = await fetch(
     `http://localhost:5000/events/${eventId}/participants`
    );
    if (!response.ok) {
     throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    setParticipants(data);
   } catch (error) {
    console.error("Error fetching participants:", error);
   }
  };

  fetchParticipants();
 }, [eventId]);

 const filteredParticipants = participants.filter(
  (participant) =>
   participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
   participant.email.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <ParticipantsContainer>
   <h1>Event Participants</h1>
   <SearchInput
    type="text"
    placeholder="Search participants by name or email"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
   />
   <ParticipantsList>
    {filteredParticipants.length > 0 ? (
     filteredParticipants.map((participant) => (
      <ParticipantCard key={participant.id}>
       <ParticipantName>{participant.fullName}</ParticipantName>
       <ParticipantEmail>{participant.email}</ParticipantEmail>
      </ParticipantCard>
     ))
    ) : (
     <p>No participants found</p>
    )}
   </ParticipantsList>
  </ParticipantsContainer>
 );
};

export default EventParticipants;
