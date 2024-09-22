import pool from "../config/db.js";

export const getEvents = async (req, res) => {
 const page = Math.max(1, parseInt(req.query.page) || 1);
 const limit = Math.min(100, parseInt(req.query.limit) || 10);
 const offset = (page - 1) * limit;

 try {
  const db = await pool.getConnection();
  const [events] = await db.query("SELECT * FROM events LIMIT ? OFFSET ?", [
   limit,
   offset,
  ]);
  db.release();
  res.json(events);
 } catch (error) {
  console.error("Error fetching events:", error);
  res.status(500).json({ error: "Failed to fetch events" });
 }
};
