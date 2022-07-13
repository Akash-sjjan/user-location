import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Context from "../Context/ContextProvider";
import Button from "@mui/material/Button";
import styles from "./Home.module.scss";
import { getLocationDetails, postLocationDetails } from "../action/actions";

const Home = () => {
  const [lng, setLng] = useState<number>(77.594566);
  const [lat, setLat] = useState<number>(12.971599);
  const context: any = useContext(Context);
  const navigation = useNavigate();

  const getLocation = async () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        },
        (error) => {
          alert(error);
        }
      );
    }
    await context.setCurrentLocation([]);
    getLocationDetails(lng, lat).then(async (response: any) => {
      // console.log(response.data.results[0], "current location");

      await context.setLocationDetails((prevRes: any) => {
        let res = {
          geometry: response.data.results[0].geometry,
          formatted: response.data.results[0].formatted,
          date: moment().format("MM/DD/YYYY"),
          time: moment().format("HH:mm:ss"),
        };
        // console.log(res, "RES");
        return [...prevRes, res];
      });
      console.log(context.locationDetails, "Details");
      await context.setCurrentLocation((prevRes: any) => {
        let res = {
          formatted: response.data.results[0].formatted,
          date: moment().format("MM/DD/YYYY"),
          time: moment().format("HH:mm:ss"),
        };
        // console.log(res, "RES");
        return [res];
      });
      console.log(context.currentLocation, "CURRENT LOCATION");
      postLocationDetails(response.data.results[0].formatted, moment().format("HH:mm:ss"));
    });
  };

  const updateLocation = async () => {
    if (context.locationDetails?.length > 29) {
      await context.locationDetails?.shift();
      getLocation();
    } else {
      getLocation();
    }
  };

  const handleRemoveAll = () => {
    context.setLocationDetails([]);
    context.setCurrentLocation([]);
  };

  const navigateToMapView = () => {
    navigation("/Map");
  };

  const handleRemoveLocation = (time: Date) => {
    context.setLocationDetails(
      context.locationDetails?.filter((data: any, index: number) => {
        return data.time !== time;
      })
    );
  };

  useEffect(() => {
    if (context.locationDetails?.length === 0) {
      updateLocation();
    } else {
      const timer = setInterval(() => {
        updateLocation();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [context.locationDetails]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Location Manager</h1>
        <div className={styles.btnContainer}>
          <div className={styles.removeAllBtn}>
            <Button
              data-testid="list-clear-all-button"
              variant="contained"
              onClick={() => {
                handleRemoveAll();
              }}
            >
              Clear All
            </Button>
          </div>
          <div className={styles.mapViewBtn}>
            <Button data-testid="navigation-map-tab" variant="contained" onClick={navigateToMapView}>
              Map View
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.currentContainer}>
          <div>
            <h1 data-testid="list-current-label" className={styles.current}>
              Current Location
            </h1>
          </div>
          <div className={styles.box_alignment} data-testid="list-current-item">
            <div className={styles.box}>
              <img
                className={styles.logo}
                src={process.env.PUBLIC_URL + "images/logo192.png"}
                alt="Logo"
                data-testid="list-current-icon"
              />
            </div>
            <div className={styles.location}>
              <div>
                <p data-testid="list-current-name" className={styles.location_p}>
                  {context.currentLocation?.length > 0
                    ? context.currentLocation[0]?.formatted
                    : "Wait location is loading.."}
                </p>
              </div>
              <div>
                <p className={styles.time} data-testid="list-current-time">
                  {context.currentLocation[0]?.date}, {context.currentLocation[0]?.time}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h1 className={styles.current}>Previous Location</h1>
            </div>
          </div>
          <div aria-labelledby="location-list">
            {context.locationDetails?.length > 0 &&
              context.locationDetails?.map((itemdata: any, index: number) => {
                return (
                  <li data-testid="List-previous" className={styles.location_data}>
                    <div className={styles.serialNum}>{index + 1}</div>
                    <div className={styles.box}>
                      <img
                        className={styles.logo}
                        src={process.env.PUBLIC_URL + "images/logo192.png"}
                        alt="Italian Trulli"
                      />
                    </div>
                    <div className={styles.location}>
                      <div className={styles.location_p}>
                        <p data-testid={`List-previous-name-${index}`}>{itemdata.formatted}</p>
                      </div>
                      <div className={styles.time}>
                        <p data-testid={`list-previous-time-${index}`}>
                          {itemdata.date}, {itemdata.time}
                        </p>
                      </div>
                    </div>
                    <div className={styles.remove_btn}>
                      <Button
                        data-testid={`list-previous-remove-${index}`}
                        sx={{ fontSize: 12 }}
                        variant="outlined"
                        onClick={() => {
                          handleRemoveLocation(itemdata.time);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
