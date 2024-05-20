import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RouterComponent } from "./component/RouterComponent";

export default function App() {
  return (
    <>
      <Router>
        <RouterComponent />
      </Router>
    </>
  );
}
