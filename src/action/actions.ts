import axios from "axios";

const access_key = "606f0850eb2141b4a84c5e9168d6bde9";
const locationAPI = axios.create({
  baseURL: "https://api.opencagedata.com/",
});

const postBaseUrl = "https://httpstat.us/200";

const getLocationDetails = (lng: number, lat: number) => {
  return locationAPI.get(`geocode/v1/json?key=${access_key}&q=${lat}+${lng}&pretty=1&no_annotations=1`);
};

const postLocationDetails = (locName: string, time: string) => {
  return axios({
    method: "post",
    url: postBaseUrl,
    headers: {},
    data: {
      location_name: `${locName}`,
      time: `${time}`,
    },
  });
};

export { getLocationDetails, postLocationDetails };
