import { useEffect, useState } from "react";
import { getAreas, putArea } from "../../data/facilities";

export const useFacility = (idFacility) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
        const response = await getAreas(idFacility);
        setAreas(response.areas);
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

  return {
    areas,
    setAreas,
    editArea
  };
};

export default useFacility;