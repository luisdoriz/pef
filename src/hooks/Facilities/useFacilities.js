import { useEffect, useState } from "react";
import { getFacilities, postAreas, postFacility, deleteFacility } from "../../data/facilities";

export const useFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      const response = await getFacilities();
      setFacilities(response.data);
      setLoading(false)
    };
    if (facilities.length === 0 && loading) {
      fetchFacilities();
    }
  }, [facilities, loading]);

  const createArea = async (body) => {
    const status = await postAreas(body);
    setLoading(true);
    setFacilities([])
  }

  const createFacility = async (body) => {
    const { response } = await postFacility(body);
    setLoading(true);
    setFacilities([])
    return response;
  }

  const removeFacility = async (body) => {
    const status = await deleteFacility(body);
    setLoading(true);
    setFacilities([]);
  }

  return {
    facilities,
    setFacilities,
    createArea,
    loading,
    createFacility,
    removeFacility
  };
};

export default useFacilities;