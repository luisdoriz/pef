import { useEffect, useState } from "react";
import { getEmployeesFacilities } from "../../data/cases";

export const useEmployeesFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployeesFacilities();
      setFacilities(response.data);
      setLoading(false)
    };
    if (facilities.length ==0 && loading)
      fetchEmployees();
  },[facilities, loading]);

  return {
    facilities,
    setFacilities
  };
};

export default useEmployeesFacilities;