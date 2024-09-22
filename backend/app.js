import express from "express";
import cors from "cors";
import eventsRoutes from "./routes/eventsRoutes.js";
import participantsRoutes from "./routes/participantsRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/events", eventsRoutes);
app.use("/participants", participantsRoutes);

app.listen(5000, () => {
 console.log("Server is running on port 5000");
});
