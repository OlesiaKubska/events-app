import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventParticipants = () => {
 const { eventId } = useParams();
 const [participants, setParticipants] = useState([]);

 useEffect(() => {
  fetch(`http://localhost:5000/participants/${eventId}`)
   .then((response) => response.json())
   .then((data) => setParticipants(data))
   .catch((error) => console.error("Error fetching participants:", error));
 }, [eventId]);

 return (
  <div>
   <h1>Participants for Event {eventId}</h1>
   <ul>
    {participants.map((participant) => (
     <li key={participant.id}>
      <p>
       {participant.fullName} - {participant.email}
      </p>
     </li>
    ))}
   </ul>
  </div>
 );
};

export default EventParticipants;
