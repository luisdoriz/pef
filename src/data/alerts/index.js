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

export { getAlerts };

export default getAlerts;