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


const postPrivilegeLevel = async (body) => {
  try {
    const url = REACT_APP_API_URL + "/persons/privilegeLevel";
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getPrivilegeLevel = async (raw_body) => {
  try {
    let url
    if(raw_body)
      url = REACT_APP_API_URL + `/persons/privilegeLevel?idFacility=${raw_body}`;
    else
      url = REACT_APP_API_URL + `/persons/privilegeLevel`;
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const putPrivilegeLevel = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + `/persons/privilegeLevel`;
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

const deletePrivilegeLevel = async (idPrivilegeLevel) => {
  try {
    const url = REACT_APP_API_URL + `/persons/privilegeLevel/${idPrivilegeLevel}`;
    const { data: { data } } = await axios.delete(url);
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

const deleteEmployee = async (idEmployee) => {
  try {
    const url = REACT_APP_API_URL + `/persons/employee/${idEmployee}`;
    const { data: { data } } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};




export { getEmployees, createEmployee, getPrivilegeLevel, deleteEmployee, putEmployee, postPrivilegeLevel, putPrivilegeLevel,deletePrivilegeLevel, putEmployeeBeacon };

export default createEmployee;
