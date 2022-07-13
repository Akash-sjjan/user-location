import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./Home";
import Context from "../Context/ContextProvider";

const Comp = () => {
  const context: any = {
    locationDetails: [
      [
        {
          formatted:
            "Ravindu Toyota, Chord Road(D. R Bendre Road), Mahalakshmi Layout, Bengaluru - 560086, Karnataka, India",
          date: "07/05/2022",
          time: "07:47:38",
        },
        {
          formatted:
            "Ravindu Toyota, Chord Road(D. R Bendre Road), Mahalakshmi Layout, Bengaluru - 560086, Karnataka, India",
          date: "07/05/2022",
          time: "07:47:38",
        },
        {
          formatted:
            "Ravindu Toyota, Chord Road(D. R Bendre Road), Mahalakshmi Layout, Bengaluru - 560086, Karnataka, India",
          date: "07/05/2022",
          time: "07:47:39",
        },
        {
          formatted:
            "Ravindu Toyota, Chord Road(D. R Bendre Road), Mahalakshmi Layout, Bengaluru - 560086, Karnataka, India",
          date: "07/05/2022",
          time: "07:47:39",
        },
      ],
    ],
    currentLocation: [
      {
        formatted: "unnamed road, Ibrahimpura, Vijayapura - 586101, Karnataka, India",
        date: "07/05/2022",
        time: "09:12:00",
      },
    ],
    setLocationDetails: jest.fn(),
    setCurrentLocation: jest.fn(),
  };
  return (
    <BrowserRouter>
      <Context.Provider value={context}>
        <Home />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe("Home component", () => {
  it("should render page correctly", () => {
    render(<Comp />);
  });

  it("should render  Button", () => {
    render(<Comp />);
    const btn = screen.getByTestId("list-clear-all-button");
    expect(btn).toBeEnabled();
  });
  it("should render current location label", () => {
    render(<Comp />);
    const current = screen.getByTestId("list-current-label");
    expect(current).toHaveTextContent("Current Location");
  });
  it("should render current location item", () => {
    render(<Comp />);
    const current = screen.getByTestId("list-current-item");
    expect(current).toBeVisible();
  });
  it("should render current location icon", () => {
    render(<Comp />);
    const logo = screen.getByTestId("list-current-icon");
    expect(logo).toHaveAttribute("src", "images/logo192.png");
    expect(logo).toHaveAttribute("alt", "Logo");
  });

  it("Should render current location name", () => {
    render(<Comp />);
    let currentLoc = screen.getByTestId("list-current-name");
    expect(currentLoc).toHaveTextContent("unnamed road, Ibrahimpura, Vijayapura - 586101, Karnataka, India");
  });

  it("Should render current location time", () => {
    render(<Comp />);
    let currentLoc = screen.getByTestId("list-current-time");
    expect(currentLoc).toHaveTextContent("07/05/2022, 09:12:00");
  });

  it("Should render previous location name", () => {
    render(<Comp />);
    let prevLoc = screen.getByTestId("List-previous-name-0");
    expect(prevLoc).toHaveTextContent("");
  });

  it("Should render previous location time", () => {
    render(<Comp />);
    let prevLoc = screen.getByTestId("list-previous-time-0");
    expect(prevLoc).toHaveTextContent(",");
  });

  it("Should render previous location remove button", () => {
    render(<Comp />);
    let removeBtn = screen.getByTestId("list-previous-remove-0");
    let click = fireEvent.click(removeBtn);
    expect(click).toBe(true);
  });

  it("Should render remove all button", () => {
    render(<Comp />);
    let removeBtn = screen.getByTestId("list-clear-all-button");
    let click = fireEvent.click(removeBtn);
    expect(click).toBe(true);
  });
});
