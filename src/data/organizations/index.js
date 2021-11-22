import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const getOrganizations = async (raw_body) => {
    try {
        const url = REACT_APP_API_URL + `/organizations`;
        const { data } = await axios.get(url);
        return data.data;
    } catch ({ response }) {
        return response;
    }
};

const postOrganization = async (raw_body) => {
    try {
        const url = REACT_APP_API_URL + "/organizations";
        const body = { ...raw_body };
        const { data: { data } } = await axios.post(url, body);
        return data;
    } catch ({ response }) {
        return response;
    }
};

const putOrganization = async (raw_body) => {
    try {
        const url = REACT_APP_API_URL + `/organizations/${raw_body.idOrganization}`;
        const body = { ...raw_body };
        const {
            data: { data },
        } = await axios.put(url, body);
        return data;
    } catch ({ response }) {
        return response;
    }
};

const deleteOrganization = async ( idOrganization ) => {
    try {
        const url = REACT_APP_API_URL + `/organizations/${idOrganization}`;
        const { data: { data } } = await axios.delete(url);
        return data;
    } catch ({ response }) {
        return response;
    }
};

export { postOrganization, putOrganization, deleteOrganization, getOrganizations };

export default getOrganizations;
