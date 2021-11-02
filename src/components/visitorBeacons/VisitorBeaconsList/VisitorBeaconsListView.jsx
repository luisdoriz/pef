import React from 'react'
import { Table } from 'antd';
import { getVisitorBeaconsColumns } from '../../../constants/tables';

const VisitorBeaconsListView = ({ beacons, deleteBeacon }) => {
  const columns = getVisitorBeaconsColumns(deleteBeacon)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={beacons} />
    </div>
  )
}

export default VisitorBeaconsListView
