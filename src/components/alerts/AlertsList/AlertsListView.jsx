import React from 'react'
import { Table } from 'antd';
import { getAlertsColumns } from '../../../constants/tables';

const AlertsListView = ({ alerts, deleteAlert, idRole, loading, types, facilities }) => {
  const columns = getAlertsColumns(deleteAlert, idRole, types, facilities)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table scroll={{ y: 450 }} pagination={{position:["none","none"]}} columns={columns} dataSource={alerts} loading={loading} />
    </div>
  )
}

export default AlertsListView
