import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getAlerts = async () => {
  try {
    const url = REACT_APP_API_URL + "/alerts";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getAlertsTypes = async () => {
  try {
    const url = REACT_APP_API_URL + "/alerts/types";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const postForgottenBeaconAlert = async (raw_body) => {
  try {
      const url = REACT_APP_API_URL + "/alerts";
      const body = { ...raw_body };
      const { data: { data } } = await axios.post(url, body);
      return data;
  } catch ({ response }) {
      return response;
  }
};

const deleteAlert = async ({idAlert}) => {
  try {
    const url = REACT_APP_API_URL + `/alerts/${idAlert}`;
    const { data: { data } } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getAlerts, deleteAlert, postForgottenBeaconAlert, getAlertsTypes };

export default getAlerts;