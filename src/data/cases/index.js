import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getActiveCases = async () => {
  try {
    const url = REACT_APP_API_URL + "/cases/active";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getRecoveredCases = async () => {
  try {
    const url = REACT_APP_API_URL + "/cases/recovered";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getActiveCases, getRecoveredCases };

export default getActiveCases;