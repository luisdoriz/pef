import React from "react";
import { PageHeader } from "antd";
import { useAlerts } from "../../hooks";
import useFacilities from '../../hooks/Facilities';
import { AlertsList } from "../../components/alerts";

const AlertsView = ({ user }) => {
  const { idRole } = user;
  const { alerts, removeAlert, loading, types } = useAlerts();
  const { facilities } = useFacilities();
  const deleteAlert = (prop) => {
    removeAlert({ idAlert: prop.idAlert });
  };

  return (
    <>
      <PageHeader onBack={null} title="Alertas" />
      <AlertsList idRole={idRole} alerts={alerts} facilities={facilities} deleteAlert={deleteAlert} types={types} loading={loading} />
    </>
  );
};

export default AlertsView;
