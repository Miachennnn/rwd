import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import RoomBookingContextProvider from "./context/BookingContext";

ReactDOM.render(
  <React.StrictMode>
    <RoomBookingContextProvider>
      <Router>
        <App />
      </Router>
    </RoomBookingContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
