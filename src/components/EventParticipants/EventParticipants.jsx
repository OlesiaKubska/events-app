import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
 ParticipantCard,
 ParticipantEmail,
 ParticipantName,
 ParticipantsContainer,
 ParticipantsList,
} from "./EventParticipants.styled";

const EventParticipants = () => {
 const { eventId } = useParams();
 const [participants, setParticipants] = useState([]);

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

 return (
  <ParticipantsContainer>
   <h1>Event Participants</h1>
   <ParticipantsList>
    {participants.map((participant) => (
     <ParticipantCard key={participant.id}>
      <ParticipantName>{participant.fullName}</ParticipantName>
      <ParticipantEmail>{participant.email}</ParticipantEmail>
     </ParticipantCard>
    ))}
   </ParticipantsList>
  </ParticipantsContainer>
 );
};

export default EventParticipants;
