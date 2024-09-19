import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Імпортуємо mysql2

const app = express();
app.use(cors());
app.use(express.json());

// Налаштування підключення до MySQL
const db = await mysql.createConnection({
 host: "localhost", // або інший хост, якщо ви використовуєте віддалений сервер
 user: "root",
 password: "J1k9t8#c2z",
 database: "eventsDB", // назва вашої бази даних
});

// Створення таблиці для подій
await db.query(`
  CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    eventDate DATE,
    organizer VARCHAR(255)
  )
`);

// Роут для отримання всіх подій
app.get("/events", async (req, res) => {
 const [rows] = await db.query("SELECT * FROM events");
 res.json(rows);
});

// Роут для додавання нового учасника
app.post("/register", async (req, res) => {
 const { fullName, email, dob, eventId } = req.body;
 await db.query(
  "INSERT INTO participants (fullName, email, dob, eventId) VALUES (?, ?, ?, ?)",
  [fullName, email, dob, eventId]
 );
 res.json({ success: true });
});

app.listen(5000, () => {
 console.log("Server is running on port 5000");
});
