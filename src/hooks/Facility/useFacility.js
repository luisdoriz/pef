/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getFacility } from "../../data/facilities";
import getActualPositions from "../../data/positions";

export const useReports = (idFacility) => {
  const [areas, setAreas] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInfo = async () => {
        const areasData = await getFacility(idFacility)
        setAreas(areasData)
        const positionsData = await getActualPositions(idFacility)
        setPositions(positionsData)
        setLoading(false);
    };
    fetchInfo();
  }, [idFacility]);

  const fetchPositions = async () => {
    setLoading(true);
    const positionsData = await getActualPositions(idFacility)
    setPositions(positionsData)
    setLoading(false);
};

  return {
    loading,
    areas,
    positions,
    fetchPositions,
  };
};

export default useReports;
