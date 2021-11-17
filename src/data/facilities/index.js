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

const getFacility = async (idFacility) => {
  try {
    const url = REACT_APP_API_URL + `/facilities/areas/${idFacility}`;
    const { data: {data} } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getFacilities, getFacility };

export default getFacilities;
