import { useEffect, useState } from "react";
import { getAreas, putArea, deleteArea} from "../../data/facilities";
import getActualPositions from "../../data/positions";

export const useFacility = (idFacility) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const fetchAreas = async () => {
        const response = await getAreas(idFacility);
        setAreas(response);
        setLoading(false);
      };
    if (areas.length === 0 && loading){
      fetchAreas();
    }
  },[areas, loading]);

  useEffect(() => {
    const fetchPositions = async () => {
        const positionsData = await getActualPositions(idFacility)
        setPositions(positionsData)
        setLoading(false);
    };
    fetchPositions();
  }, [idFacility]);

  const getPositions = async () => {
    const positionsData = await getActualPositions(idFacility)
    setPositions(positionsData)
    setLoading(false);
};

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
  
  return {
    areas,
    setAreas,
    editArea,
    loading,
    removeArea,
    positions,
    getPositions
  };
};

export default useFacility;