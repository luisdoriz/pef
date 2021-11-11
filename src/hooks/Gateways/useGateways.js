import { postGateway, putGateway, deleteGateway } from "../../data/gateways";

export const useGateways = () => {

    const createGateway = async (body) => {
        const { status } = await postGateway(body);
    }

    const editGateway = async (body) => {
        const status = await putGateway(body);
    }

    const removeGateway = async (body) => {
        const { status } = await deleteGateway(body);
    }

    return {
        createGateway,
        editGateway,
        removeGateway,
    };
};

export default useGateways;