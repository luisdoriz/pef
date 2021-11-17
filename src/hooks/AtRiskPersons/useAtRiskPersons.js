import { useEffect, useState } from "react";
import { getAtRiskPersons } from "../../data/cases";
import { notification } from "antd";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

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