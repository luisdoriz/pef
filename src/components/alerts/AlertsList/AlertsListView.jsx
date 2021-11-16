import React from 'react'
import { Table } from 'antd';
import { getAlertsColumns } from '../../../constants/tables';

const AlertsListView = ({ alerts, deleteAlert, idRole, loading }) => {
  const columns = getAlertsColumns(alerts, deleteAlert, idRole)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={alerts} loading={loading}/>
    </div>
  )
}

export default AlertsListView
