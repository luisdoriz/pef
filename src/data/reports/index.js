import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getFacilityReport = async (body) => {
  try {
    const url = REACT_APP_API_URL + "/reports/facility";
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getFacilityReport };

export default getFacilityReport;
