import React from 'react'
import { Table } from 'antd';
import { getBeaconsColumns } from '../../../constants/tables';

const BeaconsListView = ({ beacons, deleteBeacon, loading }) => {
  const columns = getBeaconsColumns(deleteBeacon);
  return (
    <div >
      <Table columns={columns} dataSource={beacons} loading={loading} scroll={{ y: 300 }} pagination={{position:["none","none"]}} />
    </div>
  )
}

export default BeaconsListView