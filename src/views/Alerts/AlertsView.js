import React from 'react'
import { PageHeader } from 'antd';
import useAlerts from '../../hooks/Alerts/useAlerts';
import { AlertsList } from "../../components/alerts";

const AlertsView = () => {
    //const alerts = [{type: "Llegada tardía", date: "2021/10/18", IdEmployee: 1, employeeName: "Daniel Ramirez"}]
    const { alerts } = useAlerts();
  return (
    <>
      <PageHeader
        onBack={null}
        title="Alertas"
        />
      <AlertsList
        alerts={alerts}
      />
    </>
  )
}

export default AlertsView
