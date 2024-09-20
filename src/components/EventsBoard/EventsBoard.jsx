import { useState, useEffect, useRef } from "react";
import {
 Container,
 EventsList,
 EventCard,
 EventTitle,
 EventDescription,
 EventDate,
 Organizer,
 ButtonLink,
 //  Pagination,
 //  PageNumber,
 ButtonBox,
 //  Arrow,
 Select,
} from "./EventsBoard.styled";

const EventsBoard = () => {
 const [events, setEvents] = useState([]);
 const [sortOption, setSortOption] = useState("all");
 const [currentPage, setCurrentPage] = useState(1);
 const eventsPerPage = 12;
 const [hasMore, setHasMore] = useState(true);
 const observer = useRef();

 useEffect(() => {
  const fetchEvents = async () => {
   const response = await fetch(
    `http://localhost:5000/events?page=${currentPage}&limit=${eventsPerPage}`
   );
   const data = await response.json();

   const newEvents = data.filter(
    (event) => !events.some((e) => e.id === event.id)
   );

   if (newEvents.length > 0) {
    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
   } else {
    setHasMore(false);
   }
  };

  fetchEvents();
 }, [currentPage, events]);

 const lastEventElementRef = (node) => {
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver((entries) => {
   if (entries[0].isIntersecting && hasMore) {
    setCurrentPage((prevPage) => prevPage + 1);
   }
  });
  if (node) observer.current.observe(node);
 };

 const handleSort = (option) => {
  setSortOption(option);
  setCurrentPage(1);
  setEvents([]);
  setHasMore(true);

  if (option !== "all") {
   const sortedEvents = [...events].sort((a, b) => {
    if (option === "title") return a.title.localeCompare(b.title);
    if (option === "eventDate")
     return new Date(a.eventDate) - new Date(b.eventDate);
    if (option === "organizer") return a.organizer.localeCompare(b.organizer);
   });
   setEvents(sortedEvents);
  }
 };

 const uniqueEvents = events.reduce((acc, current) => {
  const x = acc.find((item) => item.id === current.id);
  if (!x) {
   return acc.concat([current]);
  } else {
   return acc;
  }
 }, []);

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
    {uniqueEvents.map((event, index) =>
     events.length === index + 1 ? (
      <EventCard key={`${event.id}-${index}`} ref={lastEventElementRef}>
       <EventTitle>{event.title}</EventTitle>
       <EventDescription>{event.description}</EventDescription>
       <EventDate>{new Date(event.eventDate).toLocaleDateString()}</EventDate>
       <Organizer>Organizer: {event.organizer}</Organizer>
       <ButtonBox>
        <ButtonLink to={`/register/${event.id}`}>Register</ButtonLink>
        <ButtonLink to={`/participants/${event.id}`}>View</ButtonLink>
       </ButtonBox>
      </EventCard>
     ) : (
      <EventCard key={`${event.id}-${index}`}>
       <EventTitle>{event.title}</EventTitle>
       <EventDescription>{event.description}</EventDescription>
       <EventDate>{new Date(event.eventDate).toLocaleDateString()}</EventDate>
       <Organizer>Organizer: {event.organizer}</Organizer>
       <ButtonBox>
        <ButtonLink to={`/register/${event.id}`}>Register</ButtonLink>
        <ButtonLink to={`/participants/${event.id}`}>View</ButtonLink>
       </ButtonBox>
      </EventCard>
     )
    )}
   </EventsList>
  </Container>
 );
};

export default EventsBoard;
