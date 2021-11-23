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

const getAreas = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + `/facilities/areas/${raw_body}`;
    const { data } = await axios.get(url);
    return data.data;
  } catch ({ response }) {
    return response;
  }
};

const postAreas = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + "/areas";
    const body = { ...raw_body };
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const postFacility = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + "/facilities";
    const body = { ...raw_body };
    const {
      data: { data },
    } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const putArea = async (raw_body) => {
  try {
    const url = REACT_APP_API_URL + `/areas/${raw_body.idArea}`;
    const body = { ...raw_body };
    const {
      data: { data },
    } = await axios.put(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const deleteArea = async ({ idArea }) => {
  try {
    const url = REACT_APP_API_URL + `/facilities/area/${idArea}`;
    const {
      data: { data },
    } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const deleteFacility = async ( idFacility ) => {
  try {
    const url = REACT_APP_API_URL + `/facilities/${idFacility}`;
    const {
      data: { data },
    } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export {
  getFacilities,
  getAreas,
  putArea,
  deleteArea,
  postAreas,
  postFacility,
  deleteFacility,
};

export default getFacilities;
