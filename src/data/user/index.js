import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;
const createUser = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + "/users";
    const body = { idOrganization: 1, idRole: 1, ...raw_body };
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const sendLogin = async (body) => {
  try {
    const url = REACT_APP_API_URL + "/users/login";
    const {
      data: {
        data: { token },
      },
    } = await axios.post(url, body);
    return token;
  } catch ({ response: { status } }) {
    return status;
  }
};

const getUser = async () => {
  try {
    const url = REACT_APP_API_URL + "/users";
    const response = await axios.get(url);
    return response;
  } catch ({ response }) {
    return response;
  }
};

export { createUser, sendLogin, getUser };

export default createUser;
