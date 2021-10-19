import React from 'react'
import { Table } from 'antd';
import { getAlertsColumns } from '../../../constants/tables';

const AlertsListView = ({ alerts }) => {
  const columns = getAlertsColumns()
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={alerts} />
    </div>
  )
}

export default AlertsListView
