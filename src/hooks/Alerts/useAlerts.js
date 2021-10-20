import { useEffect, useState } from "react";
import { getAlerts, deleteAlert } from "../../data/alerts";

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

  const removeAlert = async (body) => {
    const { status } = await deleteAlert(body);
    setLoading(true);
    setAlerts(alerts)
  }

  return {
    alerts, removeAlert
  };
};

export default useAlerts;