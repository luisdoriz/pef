import { useEffect, useState } from "react";
import { getAlerts, deleteAlert, postForgottenBeaconAlert, getAlertsTypes } from "../../data/alerts";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const response = await getAlerts();
      setAlerts(response.data);
      setLoading(false)
    };
    if (alerts.length === 0 && loading){
      fetchAlerts();
      fetchAlertsTypes();
    }
  }, [alerts, loading]);

  const fetchAlertsTypes = async () => {
    const response = await getAlertsTypes();
    setTypes(response.data);
    setLoading(false)
  };

  const removeAlert = async (body) => {
    // eslint-disable-next-line no-unused-vars
    const { status } = await deleteAlert(body);
    setLoading(true);
    setAlerts([])
  }

  const createAlert = async (body) => {
    // eslint-disable-next-line no-unused-vars
    const status = await postForgottenBeaconAlert({ ...body, idAlertType: 2 });
    setLoading(true);
    setAlerts([])
  }


  return {
    alerts,
    removeAlert,
    loading,
    createAlert,
    types
  };
};

export default useAlerts;