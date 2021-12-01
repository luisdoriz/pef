import { useEffect, useState } from "react";
import { getAtRiskPersons } from "../../data/cases";

export const useAtRiskPersons = (idCase) => {
  const [atRiskPersons, setAtRiskPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtRiskPersons = async () => {
      setLoading(true)
      const response = await getAtRiskPersons(idCase);
      setAtRiskPersons(response.data);
      setLoading(false)
    };
    if(idCase) {
      fetchAtRiskPersons();
    }
  }, [idCase]);

  return {
    loading,
    atRiskPersons
  };
};

export default useAtRiskPersons;