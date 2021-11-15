import { useEffect, useState } from "react";
import { getAreas, putArea, deleteArea} from "../../data/facilities";

export const useFacility = (idFacility) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

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
    removeArea
  };
};

export default useFacility;