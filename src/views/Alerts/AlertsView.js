import React from 'react'
import { PageHeader } from 'antd';
import useAlerts from '../../hooks/Alerts/useAlerts';
import { AlertsList } from "../../components/alerts";

const AlertsView = () => {
    
    const { alerts, removeAlert } = useAlerts();
    console.log(alerts)
    const deleteAlert = (prop) =>{
      removeAlert( {idAlert: prop.idAlert} );
    }

  return (
    <>
      <PageHeader
        onBack={null}
        title="Alertas"
        />
      <AlertsList
        alerts={alerts}
        deleteAlert={deleteAlert}
      />
    </>
  )
}

export default AlertsView
