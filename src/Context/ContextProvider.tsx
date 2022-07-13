import React, { createContext, useState } from "react";

const Context = createContext({
  location: [],

  locationDetails: [],
  currentLocation: [],
  setLocation: (a: any) => {},

  setLocationDetails: (a: any) => {},
  setCurrentLocation: (a: any) => {},
});

export function ContextProvider(props: any) {
  const [location, setLocation] = useState([]);

  const [locationDetails, setLocationDetails] = useState<any>([]);
  const [currentLocation, setCurrentLocation] = useState<any>([]);

  const context: any = {
    location,

    locationDetails,
    currentLocation,
    setLocationDetails,
    setCurrentLocation,
    setLocation,
  };

  return (
    <div>
      <Context.Provider value={context}>{props.children}</Context.Provider>
    </div>
  );
}

export default Context;
