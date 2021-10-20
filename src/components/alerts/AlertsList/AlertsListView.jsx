import React from 'react'
import { Table } from 'antd';
import { getAlertsColumns } from '../../../constants/tables';

const AlertsListView = ({ alerts, deleteAlert }) => {
  const columns = getAlertsColumns(alerts, deleteAlert)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={alerts} />
    </div>
  )
}

export default AlertsListView
