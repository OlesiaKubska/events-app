import { useState } from "react";
import { useParams } from "react-router-dom";

const EventRegistration = () => {
 const { eventId } = useParams();
 const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  dob: "",
  source: "",
 });

 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  fetch(`http://localhost:5000/register`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ ...formData, eventId }),
  })
   .then((response) => response.json())
   .then((data) => {
    if (data.success) {
     alert("Registration successful!");
    }
   })
   .catch((error) => console.error("Error registering:", error));
 };

 return (
  <div>
   <h1>Register for Event</h1>
   <form onSubmit={handleSubmit}>
    <div>
     <label>Full Name:</label>
     <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
     />
    </div>
    <div>
     <label>Email:</label>
     <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
     />
    </div>
    <div>
     <label>Date of Birth:</label>
     <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
     />
    </div>
    <div>
     <label>Where did you hear about this event?</label>
     <input
      type="text"
      name="source"
      value={formData.source}
      onChange={handleChange}
     />
    </div>
    <button type="submit">Submit</button>
   </form>
  </div>
 );
};

export default EventRegistration;
