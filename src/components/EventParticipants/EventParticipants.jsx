import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
 ChartContainer,
 ParticipantCard,
 ParticipantEmail,
 ParticipantName,
 ParticipantsContainer,
 ParticipantsList,
 SearchInput,
} from "./EventParticipants.styled";
import {
 Chart,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend,
 Filler,
} from "chart.js";
import theme from "../ThemeProvider/ThemeToggle";

Chart.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend,
 Filler
);

const EventParticipants = () => {
 const { eventId } = useParams();
 const [participants, setParticipants] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [chartData, setChartData] = useState(null);

 useEffect(() => {
  const fetchParticipants = async () => {
   try {
    const response = await fetch(
     `http://localhost:5000/events/${eventId}/participants`
    );
    if (!response.ok) {
     throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    setParticipants(data);
    generateChartData(data);
   } catch (error) {
    console.error("Error fetching participants:", error);
   }
  };

  fetchParticipants();
 }, [eventId]);

 const generateChartData = (participants) => {
  const registrationsPerDay = {};

  participants.forEach((participant) => {
   const registrationDate = new Date(participant.dob).toLocaleDateString();
   registrationsPerDay[registrationDate] =
    (registrationsPerDay[registrationDate] || 0) + 1;
  });

  const labels = Object.keys(registrationsPerDay);
  const data = Object.values(registrationsPerDay);

  setChartData({
   labels,
   datasets: [
    {
     label: "Registrations per day",
     data,
     backgroundColor:
      theme === "light" ? "rgba(75,192,192,0.2)" : "rgba(255,99,132,0.2)",
     borderColor:
      theme === "light" ? "rgba(75,192,192,1)" : "rgba(255,99,132,1)",
     fill: true,
    },
   ],
  });
 };

 const filteredParticipants = participants.filter(
  (participant) =>
   participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
   participant.email.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <ParticipantsContainer>
   <h1>Event Participants</h1>
   <SearchInput
    type="text"
    placeholder="Search participants by name or email"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
   />
   {chartData && (
    <ChartContainer>
     <Line data={chartData} />
    </ChartContainer>
   )}
   <ParticipantsList>
    {filteredParticipants.length > 0 ? (
     filteredParticipants.map((participant) => (
      <ParticipantCard key={participant.id}>
       <ParticipantName>{participant.fullName}</ParticipantName>
       <ParticipantEmail>{participant.email}</ParticipantEmail>
      </ParticipantCard>
     ))
    ) : (
     <p>No participants found</p>
    )}
   </ParticipantsList>
  </ParticipantsContainer>
 );
};

export default EventParticipants;
