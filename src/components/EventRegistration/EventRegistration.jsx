import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
 InputGroup,
 RadioGroup,
 RegistrationContainer,
 SubmitButton,
} from "./EventRegistration.styled";

const EventRegistration = () => {
 const { eventId } = useParams();

 const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
   .email("Invalid email address")
   .required("Email is required"),
  dob: Yup.date().required("Date of birth is required"),
  heardFrom: Yup.string().required("Please select an option"),
 });

 const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
   const response = await fetch(`http://localhost:5000/register`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     ...values,
     eventId,
    }),
   });

   if (response.ok) {
    alert("Registration successful!");
    resetForm();
   } else {
    alert("Registration failed.");
   }
  } catch (error) {
   console.error("Error submitting registration:", error);
  } finally {
   setSubmitting(false);
  }
 };

 return (
  <RegistrationContainer>
   <h1>Event Registration</h1>
   <Formik
    initialValues={{
     fullName: "",
     email: "",
     dob: "",
     heardFrom: "",
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
   >
    {({ isSubmitting }) => (
     <Form>
      <InputGroup>
       <label htmlFor="fullName">Full name</label>
       <Field type="text" id="fullName" name="fullName" />
       <ErrorMessage name="fullName" component="div" className="error" />
      </InputGroup>

      <InputGroup>
       <label htmlFor="email">Email</label>
       <Field type="email" id="email" name="email" />
       <ErrorMessage name="email" component="div" className="error" />
      </InputGroup>

      <InputGroup>
       <label htmlFor="dob">Date of birth</label>
       <Field type="date" id="dob" name="dob" />
       <ErrorMessage name="dob" component="div" className="error" />
      </InputGroup>

      <InputGroup>
       <p>Where did you hear about this event?</p>
       <RadioGroup>
        <label>
         <Field type="radio" name="heardFrom" value="Social media" />
         Social media
        </label>
        <label>
         <Field type="radio" name="heardFrom" value="Friends" />
         Friends
        </label>
        <label>
         <Field type="radio" name="heardFrom" value="Found myself" />
         Found myself
        </label>
       </RadioGroup>
       <ErrorMessage name="heardFrom" component="div" className="error" />
      </InputGroup>

      <SubmitButton type="submit" disabled={isSubmitting}>
       {isSubmitting ? "Registering..." : "Register"}
      </SubmitButton>
     </Form>
    )}
   </Formik>
  </RegistrationContainer>
 );
};

export default EventRegistration;
