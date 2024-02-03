import React, { useState } from "react";
import { FormContext } from "./FormContext";

export default function FormState(props) {
  const [formData, setFormData] = useState({
    location: "",
    days: 0,
    style: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {props.children}
    </FormContext.Provider>
  );
}
