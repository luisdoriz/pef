import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getAvailableBeacons = async () => {
  try {
    const url = REACT_APP_API_URL + "/beacons/available";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getAvailableBeacons };

export default getAvailableBeacons;
