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

const deleteBeacon = async ({idBeacon}) => {
  try {
    const url = REACT_APP_API_URL + `/beacons/${idBeacon}`;
    const { data: { data } } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const postBeacon = async (body) => {
  try {
    const url = REACT_APP_API_URL + "/beacons";
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getAvailableBeacons, deleteBeacon, postBeacon};

export default getAvailableBeacons;
