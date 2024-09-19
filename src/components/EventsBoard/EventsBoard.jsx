import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventsBoard = () => {
 const [events, setEvents] = useState([]);

 useEffect(() => {
  fetch("http://localhost:5000/events")
   .then((response) => response.json())
   .then((data) => setEvents(data))
   .catch((error) => console.error("Error fetching events:", error));
 }, []);

 return (
  <div>
   <h1>Available Events</h1>
   <ul>
    {events.map((event) => (
     <li key={event.id}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.eventDate).toLocaleDateString()}</p>
      <p>Organizer: {event.organizer}</p>
      <Link to={`/register/${event.id}`}>Register</Link> |{" "}
      <Link to={`/participants/${event.id}`}>View Participants</Link>
     </li>
    ))}
   </ul>
  </div>
 );
};

export default EventsBoard;
