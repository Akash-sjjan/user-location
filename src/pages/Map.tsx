import React, { useContext, useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import Context from "../Context/ContextProvider";

const key = "";  /* Enter Google Map API Key*/

const Map = () => {
  const context: any = useContext(Context);

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    context.locationDetails.forEach(({ geometry }: any) => bounds.extend(geometry));
    map.fitBounds(bounds);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key,
  });
  if (!isLoaded) {
    return <div>Loading.....</div>;
  }
  return (
    <div className="App">
      <GoogleMap onLoad={handleOnLoad} zoom={15} mapContainerStyle={{ width: "100%", height: "100vh" }}>
        {context.locationDetails.map((data: any, index: any) => (
          <Marker key={index} position={data.geometry} label={(index + 1).toString()}></Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
