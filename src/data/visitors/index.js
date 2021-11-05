import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getVisitors = async () => {
  try {
    const url = REACT_APP_API_URL + "/persons/visitors";
    const { data } = await axios.get(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const removeVisitor = async (idVisitor) => {
  try {
    const url = REACT_APP_API_URL + `/persons/visitor/${idVisitor}`;
    const { data } = await axios.delete(url);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const postVisitor = async (body) => {
  try {
    const url = REACT_APP_API_URL + `/persons/visitor`;
    const { data } = await axios.post(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

const editVisitor = async (body) => {
  try {
    const url = REACT_APP_API_URL + `/persons/visitor`;
    const { data } = await axios.put(url, body);
    return data;
  } catch ({ response }) {
    return response;
  }
};

export { getVisitors, removeVisitor, postVisitor, editVisitor };

export default getVisitors;
