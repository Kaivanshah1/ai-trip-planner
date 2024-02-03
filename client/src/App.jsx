import React from "react";
import Home from "./pages/Home";
import FormState from "./context/FormState";

export default function App() {
  return (
    <div>
      <FormState>
        <Home />
      </FormState>
    </div>
  );
}
