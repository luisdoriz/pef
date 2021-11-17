import { getGateways, postGateway, putGateway, deleteGateway } from "../../data/gateways";
import { useEffect, useState } from "react";

export const useGateways = (idFacility) => {
    const [gateways, setGateways] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGateways = async () => {
            const response = await getGateways(idFacility);
            setGateways(response);
            setLoading(false);
        };
        if (gateways.length === 0 && loading) {
            fetchGateways();
        }
    }, [gateways, loading]);

    const createGateway = async (body) => {
        const { status } = await postGateway(body);
        setLoading(true);
        setGateways([]);
    }

    const editGateway = async (body) => {
        const status = await putGateway(body);
        setLoading(true);
        setGateways([]);
    }

    const removeGateway = async (body) => {
        const status = await deleteGateway(body);
        setLoading(true);
        setGateways([]);
    }

    return {
        gateways,
        createGateway,
        editGateway,
        removeGateway,
    };
};

export default useGateways;