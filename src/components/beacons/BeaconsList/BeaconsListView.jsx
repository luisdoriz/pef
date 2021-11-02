import React from 'react'
import { Table } from 'antd';
import { getBeaconsColumns } from '../../../constants/tables';

const BeaconsListView = ({ beacons, deleteBeacon }) => {
  const columns = getBeaconsColumns(deleteBeacon);
  return (
    <div >
      <Table columns={columns} dataSource={beacons} />
    </div>
  )
}

export default BeaconsListView