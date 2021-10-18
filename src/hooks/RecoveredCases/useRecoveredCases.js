import { useEffect, useState } from "react";
import { getRecoveredCases } from "../../data/cases";

export const useRecoveredCases = () => {
  const [rCases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecoveredCases = async () => {
      const response = await getRecoveredCases();
      setCases(response.data);
      setLoading(false)
    };
    if (rCases.length ==0 && loading)
      fetchRecoveredCases();
  },[rCases, loading]);

  return {
    rCases,
    setCases
  };
};

export default useRecoveredCases;