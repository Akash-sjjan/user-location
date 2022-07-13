import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Map from "./Map";
import { GoogleMap, Marker, MarkerProps } from "@react-google-maps/api";
import { mount, shallow } from "enzyme";

let instance: google.maps.Circle | null;

function getMarker(props: MarkerProps) {
  return (
    <GoogleMap>
      <Marker {...props} />
    </GoogleMap>
  );
}
const center = {
  lat: 0,
  lng: 0,
};

const Comp = () => {
  return (
    <BrowserRouter>
      <Map />
    </BrowserRouter>
  );
};
describe("Circle", () => {
  let wrapper = shallow(
    <BrowserRouter>
      <Map />
    </BrowserRouter>
  );
  it("Should render Map Comp correctly", () => {
    render(<Comp />);
  });
  it("should call onLoad only once", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
