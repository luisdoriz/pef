import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;
const getActualPositions = async (idFacility) => {
  try {
    const url = REACT_APP_API_URL + `/positions?idFacility=${idFacility}`;
    const {
      data: { data },
    } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getActualPositions };

export default getActualPositions;
