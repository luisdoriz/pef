import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;
const getFacilities = async () => {
    try {
      const url = REACT_APP_API_URL + "/facilities";
      const { data } = await axios.get(url);
      return data;
    } catch ({ response }) {
      return response;
    }
  };

  const getAreas = async (raw_body) => {
    try {
      const url = REACT_APP_API_URL + `/facilities/areas/${raw_body}`;
      const { data } = await axios.get(url);
      return data.data;
    } catch ({ response }) {
      return response;
    }
  };

  const putArea = async (raw_body) => {
    try {
      const url = REACT_APP_API_URL + `/facilities/area/${raw_body.idArea}`;
      const body = { ...raw_body };
      const {
        data: { data },
      } = await axios.put(url, body);
      return data;
    } catch ({ response }) {
      return response;
    }
  };

  export { getFacilities, getAreas, putArea };

export default getFacilities;
