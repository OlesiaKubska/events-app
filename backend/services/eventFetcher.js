import fetch from "node-fetch";
import pool from "../config/db.js";

const fetchEventsFromTicketmaster = async () => {
 console.log("Fetching events from Ticketmaster API...");

 try {
  const response = await fetch(
   `https://app.ticketmaster.com/discovery/v2/events.json?apikey=RigLbdNLS7lxZeCCWV78ioM4HheOMKOG`
  );

  const data = await response.json();
  console.log("Data fetched from API:", data);

  const db = await pool.getConnection();

  data._embedded.events.forEach(async (event) => {
   const { id, name, dates } = event;
   const eventDate = new Date(dates.start.dateTime).toISOString().split("T")[0]; // Формат дати у форматі YYYY-MM-DD

   console.log(`Processing event: ${name}`);

   const [existingEvent] = await db.query(
    "SELECT id FROM events WHERE ticketmaster_id = ?",
    [id]
   );

   if (!existingEvent.length) {
    await db.query(
     "INSERT INTO events (ticketmaster_id, title, eventDate, organizer) VALUES (?, ?, ?, ?)",
     [id, name, eventDate, event.classifications[0].segment.name]
    );
    console.log(`Inserted event: ${name}`);
   } else {
    console.log(`Event ${name} already exists`);
   }
  });

  db.release();
 } catch (error) {
  console.error("Error fetching events from API:", error);
 }
};

setInterval(fetchEventsFromTicketmaster, 60000);
