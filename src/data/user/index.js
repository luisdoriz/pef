import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;
const createAdmin = async (raw_body) => {
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

const createUser = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + "/users";
    const body = { idOrganization: 1, ...raw_body };
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const putUser = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + `/users/${raw_body.idUser}`;
    const body = { ...raw_body };
    const {
      data: { data },
    } = await axios.put(url, body);
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
    const url = REACT_APP_API_URL + "/users/individual";
    const response = await axios.get(url);
    return response;
  } catch ({ response }) {
    return response;
  }
};

const getUsers = async () => {
  try {
    const url = REACT_APP_API_URL + "/users";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};


const getRoles = async () => {
  try {
    const url = REACT_APP_API_URL + "/users/roles";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const deleteUser = async (idUser) => {
  try {
    const url = REACT_APP_API_URL + `/users/${idUser}`;
    const { data: { data } } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { createAdmin, createUser, sendLogin, getUsers, getRoles, deleteUser, getUser, putUser };

export default createUser;
