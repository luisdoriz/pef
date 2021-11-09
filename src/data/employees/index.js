import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;
const createEmployee = async (body) => {
  try {
    const url = REACT_APP_API_URL + "/persons/employee";
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
    const url = REACT_APP_API_URL + "/persons/employees";
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

const putEmployee = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + `/persons/employee/${raw_body.idEmployee}`;
    const body = { ...raw_body };
    const {
      data: { data },
    } = await axios.put(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const putEmployeeBeacon = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + `/persons/beacon/`;
    const body = { ...raw_body };
    const {
      data: { data },
    } = await axios.put(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const deleteEmployee = async (idEmployee) => {
  try {
    const url = REACT_APP_API_URL + `/persons/employee/${idEmployee}`;
    const { data: { data } } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const postBeacon = async (body) => {
  try {
    const url = REACT_APP_API_URL + "/beacons";
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};


export { putEmployeeBeacon, getEmployees, createEmployee, getPrivilegeLevel, deleteEmployee, putEmployee, postBeacon };

export default createEmployee;
