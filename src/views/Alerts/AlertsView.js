import React from "react";
import { PageHeader } from "antd";
import useAlerts from "../../hooks/Alerts/useAlerts";
import { AlertsList } from "../../components/alerts";

const AlertsView = ({ user }) => {
  const { idRole } = user;
  const { alerts, removeAlert } = useAlerts();
  const deleteAlert = (prop) => {
    removeAlert({ idAlert: prop.idAlert });
  };

  return (
    <>
      <PageHeader onBack={null} title="Alertas" />
      <AlertsList idRole={idRole} alerts={alerts} deleteAlert={deleteAlert} />
    </>
  );
};

export default AlertsView;
