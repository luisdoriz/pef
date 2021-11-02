import { useEffect, useState } from "react";
import { getFacilities, getAreas, putArea, postAreas } from "../../data/facilities";

export const useFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      const response = await getFacilities();
      setFacilities(response.data);
      setLoading(false)
    };
    if (facilities.length === 0 && loading){
      fetchFacilities();
    }
  },[facilities, loading]);

  const createArea = async (body) => {
    const status = await postAreas(body);
    setLoading(true);
    setFacilities([])
  }

  return {
    facilities,
    setFacilities,
    createArea
  };
};

export default useFacilities;