import React from 'react'
import { Table } from 'antd';
import { getVisitorBeaconsColumns } from '../../../constants/tables';

const VisitorBeaconsListView = ({ beacons, deleteBeacon, loading }) => {
  const columns = getVisitorBeaconsColumns(deleteBeacon)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table loading={loading} columns={columns} dataSource={beacons} />
    </div>
  )
}

export default VisitorBeaconsListView
