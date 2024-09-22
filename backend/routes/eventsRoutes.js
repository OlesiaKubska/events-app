import express from "express";
import { getEvents } from "../controllers/eventsController.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
 try {
  const db = await pool.getConnection();
  await getEvents(req, res, db);
  db.release();
 } catch (error) {
  console.error("Error fetching events:", error);
  res.status(500).json({ message: "Error fetching events" });
 }
});

export default router;
