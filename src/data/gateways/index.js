import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

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

const deleteGateway = async ({ idGateway }) => {
    try {
        const url = REACT_APP_API_URL + `/gateways/${idGateway}`;
        const { data: { data } } = await axios.delete(url);
        return data;
    } catch ({ response }) {
        return response;
    }
};

export { postGateway, putGateway, deleteGateway };

export default postGateway;
