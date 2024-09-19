import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const EventsBoard = lazy(() => import("./components/EventsBoard/EventsBoard"));
const EventRegistration = lazy(() =>
 import("./components/EventRegistration/EventRegistration")
);
const EventParticipants = lazy(() =>
 import("./components/EventParticipants/EventParticipants")
);

const App = () => {
 return (
  <Router>
   <Suspense fallback={<div>Loading...</div>}>
    <Routes>
     <Route path="/" element={<EventsBoard />} />
     <Route path="/register/:eventId" element={<EventRegistration />} />
     <Route path="/participants/:eventId" element={<EventParticipants />} />
    </Routes>
   </Suspense>
  </Router>
 );
};

export default App;
