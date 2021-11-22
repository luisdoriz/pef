/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getOrganizations, postOrganization, putOrganization, deleteOrganization } from "../../data/organizations";

export const useOrganizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizations = async () => {
            const response = await getOrganizations();
            setOrganizations(response);
            setLoading(false);
        };
        if (organizations.length === 0 && loading) {
            fetchOrganizations();
        }
    }, [organizations, loading]);

    const createOrganization = async (body) => {
        const status = await postOrganization(body);
        setLoading(true);
        setOrganizations([]);
    }

    const removeOrganization = async (body) => {
        const status = await deleteOrganization(body);
        setLoading(true);
        setOrganizations([])
    }

    const editOrganization = async (body) => {
        const status = await putOrganization(body);
        setLoading(true);
        setOrganizations([]);
    }

    return {
        organizations,
        createOrganization,
        removeOrganization,
        editOrganization,
        loading,
    };
};

export default useOrganizations;