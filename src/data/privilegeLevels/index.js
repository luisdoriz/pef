import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getPrivilegeLevels = async () => {
  try {
    const url = REACT_APP_API_URL + "/persons/privilegeLevel";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getPrivilegeLevels };

export default getPrivilegeLevels;
