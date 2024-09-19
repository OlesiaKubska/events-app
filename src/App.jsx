import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lightTheme, darkTheme } from "./styles/themes";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Header from "./components/Header/Header";

const Home = lazy(() => import("./pages/Home/Home"));
const EventsBoard = lazy(() => import("./components/EventsBoard/EventsBoard"));
const EventRegistration = lazy(() =>
 import("./components/EventRegistration/EventRegistration")
);
const EventParticipants = lazy(() =>
 import("./components/EventParticipants/EventParticipants")
);

const App = () => {
 const [theme, setTheme] = useState("light");

 const toggleTheme = () => {
  setTheme(theme === "light" ? "dark" : "light");
 };

 return (
  <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
   <GlobalStyles />

   <Router>
    <Header theme={theme} toggleTheme={toggleTheme} />
    <Suspense fallback={<div>Loading...</div>}>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventsBoard />} />
      <Route path="/register/:eventId" element={<EventRegistration />} />
      <Route path="/participants/:eventId" element={<EventParticipants />} />
     </Routes>
    </Suspense>
   </Router>
  </ThemeProvider>
 );
};

export default App;
