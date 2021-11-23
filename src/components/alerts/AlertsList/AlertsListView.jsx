import React from 'react'
import { Table } from 'antd';
import { getAlertsColumns } from '../../../constants/tables';

const AlertsListView = ({ alerts, deleteAlert, idRole, loading, types, facilities }) => {
  const columns = getAlertsColumns(deleteAlert, idRole, types, facilities)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={alerts} loading={loading} scroll={{ y: 450 }}/>
    </div>
  )
}

export default AlertsListView
