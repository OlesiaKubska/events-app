import mysql from "mysql2/promise";

const pool = mysql.createPool({
 host: "localhost",
 user: "root",
 password: "J1k9t8#c2z",
 database: "eventsDB",
 waitForConnections: true,
 connectionLimit: 10,
 queueLimit: 0,
});

export const initializeDB = async () => {
 try {
  const db = await pool.getConnection();

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

  db.release();
 } catch (error) {
  console.error("Error initializing database:", error);
 }
};

export default pool;
