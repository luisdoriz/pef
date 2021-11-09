import { useEffect, useState } from "react";
import { getAreas, putArea, deleteArea, postGateway, putGateway, deleteGateway } from "../../data/facilities";

export const useFacility = (idFacility) => {
  const [areas, setAreas] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
        const response = await getAreas(idFacility);
        setAreas(response.areas);
        setGateways(response.gateways);
        setLoading(false);
      };
    if (areas.length === 0 && loading){
      fetchAreas();
    }
  },[areas, loading]);

  const editArea = async (body) => {
    const status = await putArea(body);
    setLoading(true);
    setAreas([]);
  }
  const removeArea = async (body) => {
    const status = await deleteArea(body);
    setLoading(true);
    setAreas([]);
  }

  const createGateway = async (body) => {
    const { status } = await postGateway(body);
    setLoading(true);
    setAreas([])
  }

  const editGateway = async (body) => {
    const status = await putGateway(body);
    setLoading(true);
    setAreas([]);
  }

  const removeGateway = async (body) => {
    const { status } = await deleteGateway(body);
    setLoading(true);
    setAreas([])
  }

  return {
    areas,
    setAreas,
    editArea,
    gateways,
    setGateways,
    createGateway,
    editGateway,
    removeGateway,
    loading,
    removeArea
  };
};

export default useFacility;