import { useEffect, useState } from "react";
import { getAlerts } from "../../data/alerts";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const response = await getAlerts();
      setAlerts(response.data);
      setLoading(false)
    };
    if (alerts.length === 0 && loading)
      fetchAlerts();
  },[alerts, loading]);
  
  return {
    alerts,
  };
};

export default useAlerts;