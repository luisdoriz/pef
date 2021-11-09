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
      const { data: { data } } = await axios.post(url, body);
      return data;
    } catch ({ response }) {
      return response;
    }
  };

  const postFacility = async (raw_body) => {
    try {
      const url = REACT_APP_API_URL + "/facilities";
      const body = { ...raw_body };
      const { data: { data } } = await axios.post(url, body);
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

  const deleteArea = async ({idArea}) => {
    try {
      const url = REACT_APP_API_URL + `/facilities/area/${idArea}`; //TODO: CHECAR ESTA RUTA
      const { data: { data } } = await axios.delete(url);
      return data;
    } catch ({ response }) {
      return response;
    }
  };

  const postGateway = async (raw_body) => {
    try {
      const url = REACT_APP_API_URL + "/gateways";
      const body = { ...raw_body };
      const { data: { data } } = await axios.post(url, body);
      return data;
    } catch ({ response }) {
      return response;
    }
  };

  const putGateway = async (raw_body) => {
    try {
      const url = REACT_APP_API_URL + `/gateways/${raw_body.idGateway}`;
      const body = { ...raw_body };
      const {
        data: { data },
      } = await axios.put(url, body);
      return data;
    } catch ({ response }) {
      return response;
    }
  };

  const deleteGateway = async ({idGateway}) => {
    try {
      const url = REACT_APP_API_URL + `/gateways/${idGateway}`;
      const { data: { data } } = await axios.delete(url);
      return data;
    } catch ({ response }) {
      return response;
    }
  };

  export { getFacilities, getAreas, putArea, deleteArea, postGateway, putGateway, deleteGateway, postAreas,postFacility };

export default getFacilities;
