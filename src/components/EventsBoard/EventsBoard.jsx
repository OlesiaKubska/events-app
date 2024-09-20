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
 Select,
} from "./EventsBoard.styled";

const EventsBoard = () => {
 const [events, setEvents] = useState([]);
 const [sortOption, setSortOption] = useState("all");
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

 const handleSort = (option) => {
  setSortOption(option);
  if (option === "all") {
   return;
  }
  const sortedEvents = [...events].sort((a, b) => {
   if (option === "title") return a.title.localeCompare(b.title);
   if (option === "eventDate")
    return new Date(a.eventDate) - new Date(b.eventDate);
   if (option === "organizer") return a.organizer.localeCompare(b.organizer);
  });
  setEvents(sortedEvents);
  setCurrentPage(1);
 };

 return (
  <Container>
   <h1>Events</h1>
   <Select value={sortOption} onChange={(e) => handleSort(e.target.value)}>
    <option value="all">All</option>
    <option value="title">Sort by Title</option>
    <option value="eventDate">Sort by Date</option>
    <option value="organizer">Sort by Organizer</option>
   </Select>
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
