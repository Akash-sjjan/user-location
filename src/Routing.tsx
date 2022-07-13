import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Map" element={<Map />} />
    </Routes>
  );
}

export default Routing;
