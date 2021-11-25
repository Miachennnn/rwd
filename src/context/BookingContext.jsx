import React, { useState } from "react";

export const BookingContext = React.createContext();

const RoomBookingContextProvider = props => {
  const [booked, setBooked] = useState([]); //array date
  return <BookingContext.Provider value={{ booked, setBooked }}>{props.children}</BookingContext.Provider>;
};

export default RoomBookingContextProvider;
