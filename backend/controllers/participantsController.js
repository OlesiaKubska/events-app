import pool from "../config/db.js";

export const getParticipants = async (req, res) => {
 const { eventId } = req.params;

 try {
  const db = await pool.getConnection();
  const [participants] = await db.query(
   "SELECT * FROM participants WHERE eventId = ?",
   [eventId]
  );
  db.release();

  if (participants.length === 0) {
   return res.status(404).json({ message: "No participants found" });
  }
  res.json(participants);
 } catch (error) {
  console.error("Error fetching participants:", error);
  res.status(500).json({ error: "Failed to fetch participants" });
 }
};

export const registerParticipant = async (req, res) => {
 const { fullName, email, dob, heardFrom, eventId } = req.body;

 try {
  const db = await pool.getConnection();

  await db.query(
   "INSERT INTO participants (fullName, email, dob, heardFrom, eventId) VALUES (?, ?, ?, ?, ?)",
   [fullName, email, dob, heardFrom, eventId]
  );

  db.release();

  res
   .status(201)
   .json({ success: true, message: "Participant registered successfully." });
 } catch (error) {
  console.error("Error saving registration:", error);
  res.status(500).json({ success: false, message: "Registration failed." });
 }
};
