import { useState, useEffect } from "react";
import {
 Container,
 EventsList,
 EventCard,
 EventTitle,
 EventDescription,
 EventDate,
 Organizer,
 ButtonLink,
 Pagination,
 PageNumber,
 ButtonBox,
 Arrow,
} from "./EventsBoard.styled";

const EventsBoard = () => {
 const [events, setEvents] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const eventsPerPage = 12;

 useEffect(() => {
  fetch("http://localhost:5000/events")
   .then((response) => response.json())
   .then((data) => setEvents(data))
   .catch((error) => console.error("Error fetching events:", error));
 }, []);

 const indexOfLastEvent = currentPage * eventsPerPage;
 const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
 const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 return (
  <Container>
   <h1>Events</h1>
   <EventsList>
    {currentEvents.map((event) => (
     <EventCard key={event.id}>
      <EventTitle>{event.title}</EventTitle>
      <EventDescription>{event.description}</EventDescription>
      <EventDate>{new Date(event.eventDate).toLocaleDateString()}</EventDate>
      <Organizer>Organizer: {event.organizer}</Organizer>
      <ButtonBox>
       <ButtonLink to={`/register/${event.id}`}>Register</ButtonLink>
       <ButtonLink to={`/participants/${event.id}`}>View</ButtonLink>
      </ButtonBox>
     </EventCard>
    ))}
   </EventsList>
   <Pagination>
    {currentPage > 1 && (
     <Arrow onClick={() => paginate(currentPage - 1)}>←</Arrow>
    )}
    {[...Array(Math.ceil(events.length / eventsPerPage)).keys()].map(
     (number) => (
      <PageNumber
       key={number + 1}
       onClick={() => paginate(number + 1)}
       $isActive={currentPage === number + 1}
      >
       {number + 1}
      </PageNumber>
     )
    )}
    {currentPage < Math.ceil(events.length / eventsPerPage) && (
     <Arrow onClick={() => paginate(currentPage + 1)}>→</Arrow>
    )}
   </Pagination>
  </Container>
 );
};

export default EventsBoard;
