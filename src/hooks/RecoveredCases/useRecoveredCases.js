import { useEffect, useState } from "react";
import { getRecoveredCases } from "../../data/cases";

export const useRecoveredCases = () => {
  const [recoveredCases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecoveredCases = async () => {
      const response = await getRecoveredCases();
      setCases(response.data);
      setLoading(false)
    };
    if (recoveredCases.length === 0 && loading)
      fetchRecoveredCases();
  },[recoveredCases, loading]);

  return {
    recoveredCases,
    setCases,
    loading
  };
};

export default useRecoveredCases;