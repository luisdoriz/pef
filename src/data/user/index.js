import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;
const createUser = async (data) => {
  try {
    const url = REACT_APP_API_URL + "/users";
    const body = { idOrganization: 1, idRole: 1, ...data };
    console.log(body);
    const response = await axios.post(url, body);
    return response;
  } catch (error) {
    console.log("error", error.data);
    throw error;
  }
};

const postLogin = async (data) => {
  try {
    const url = REACT_APP_API_URL + "/users/login";
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.log("error", error.data);
    throw error;
  }
};

export { createUser, postLogin };

export default createUser;
