import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;
const createEmployee = async (body) => {
  try {
    const url = REACT_APP_API_URL + "/employees";
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getEmployees = async () => {
  try {
    const url = REACT_APP_API_URL + "/employees";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getPrivilegeLevel = async () => {
  try {
    const url = REACT_APP_API_URL + "/persons/privilegeLevel";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};


export { getEmployees, createEmployee, getPrivilegeLevel };

export default getEmployees;
