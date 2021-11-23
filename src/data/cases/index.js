import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getActiveCases = async () => {
  try {
    const url = REACT_APP_API_URL + "/cases/active";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getAtRiskPersons = async (idCase) => {
  try {
    const url = REACT_APP_API_URL + `/cases/${idCase}/atRisk`;
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getRecoveredCases = async () => {
  try {
    const url = REACT_APP_API_URL + "/cases/recovered";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const getEmployeesFacilities = async () => {
  try {
    const url = REACT_APP_API_URL + "/persons/employees/facilities";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const postCase = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + "/cases";
    const body = { ...raw_body };
    const { data: { data } } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const deleteCase = async ({idCase}) => {
  try {
    const url = REACT_APP_API_URL + `/cases/${idCase}`;
    const { data: { data } } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const putInactiveCase = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + `/cases`;
    const body = { ...raw_body, ongoing: false };
    const {
      data: { data },
    } = await axios.put(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};


export { getActiveCases, getRecoveredCases, getEmployeesFacilities, postCase, deleteCase, getAtRiskPersons, putInactiveCase };

export default getActiveCases;