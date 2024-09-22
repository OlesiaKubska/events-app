import express from "express";
import {
 getParticipants,
 registerParticipant,
} from "../controllers/participantsController.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/:eventId/participants", async (req, res) => {
 try {
  const db = await pool.getConnection();
  await getParticipants(req, res, db);
  db.release();
 } catch (error) {
  console.error("Error fetching participants:", error);
  res.status(500).json({ message: "Error fetching participants" });
 }
});

router.post("/register", async (req, res) => {
 try {
  const db = await pool.getConnection();
  await registerParticipant(req, res, db);
  db.release();
 } catch (error) {
  console.error("Error registering participant:", error);
  res.status(500).json({ message: "Error registering participant" });
 }
});

export default router;
