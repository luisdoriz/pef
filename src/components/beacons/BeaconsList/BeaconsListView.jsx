import React from 'react'
import { Table } from 'antd';
import { getBeaconsColumns } from '../../../constants/tables';

const BeaconsListView = ({ beacons, deleteBeacon, loading }) => {
  const columns = getBeaconsColumns(deleteBeacon);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={beacons} loading={loading} scroll={{ y: 300 }}   />
    </div>
  )
}

export default BeaconsListView