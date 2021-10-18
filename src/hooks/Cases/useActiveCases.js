import { useEffect } from "react";
import { getActiveCases } from "../../data/cases";

export const useActiveCases = () => {

  useEffect(() => {
    const fetchActiveCases = async () => {
      const response = await getActiveCases();
      console.log(response);
    };
    fetchActiveCases();
  });

  return {
    
  };
};

export default useActiveCases;