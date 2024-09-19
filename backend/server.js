import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

async function initializeDB() {
 try {
  const db = await mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "J1k9t8#c2z",
   database: "eventsDB",
  });

  await db.query(`
  CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    eventDate DATE,
    organizer VARCHAR(255)
  )
`);
  await db.query(`
      CREATE TABLE IF NOT EXISTS participants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255),
        email VARCHAR(255),
        dob DATE,
        heardFrom VARCHAR(255),
        eventId INT,
        FOREIGN KEY (eventId) REFERENCES events(id)
      )
    `);

  return db;
 } catch (error) {
  console.error("Error initializing database:", error);
 }
}

let db;
initializeDB().then((connection) => {
 db = connection;
});

app.get("/events", async (req, res) => {
 try {
  const [rows] = await db.query("SELECT * FROM events");
  res.json(rows);
 } catch (error) {
  console.error("Error fetching events:", error);
  res.status(500).json({ error: "Failed to fetch events" });
 }
});

app.post("/register", async (req, res) => {
 const { fullName, email, dob, heardFrom, eventId } = req.body;

 try {
  await db.query(
   "INSERT INTO participants (fullName, email, dob, heardFrom, eventId) VALUES (?, ?, ?, ?, ?)",
   [fullName, email, dob, heardFrom, eventId]
  );

  res.status(201).json({ success: true });
 } catch (error) {
  console.error("Error saving registration:", error);
  res.status(500).json({ success: false, message: "Registration failed." });
 }
});

app.get("/events/:eventId/participants", async (req, res) => {
 const { eventId } = req.params;

 try {
  const [participants] = await db.query(
   "SELECT * FROM participants WHERE eventId = ?",
   [eventId]
  );
  if (participants.length === 0) {
   return res.status(404).json({ message: "No participants found" });
  }
  res.json(participants);
 } catch (error) {
  console.error("Error fetching participants:", error);
  res.status(500).json({ error: "Failed to fetch participants" });
 }
});

app.listen(5000, () => {
 console.log("Server is running on port 5000");
});
