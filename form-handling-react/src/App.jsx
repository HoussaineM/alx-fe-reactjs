import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

export default function App() {
  return (
    <div>
       <h1>Uncotrolled Registration Form with FormikForm</h1>
      <FormikForm/>
      <h2>Controlled Registration RegistrationForm Form </h2>
      <RegistrationForm/>
    </div>
  )
}