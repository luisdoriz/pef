import React from 'react'
import { Table } from 'antd';
import { getGatewaysColumns } from '../../../constants/tables';

const GatewaysListView = ({ gateways, editGateway }) => {
  const columns = getGatewaysColumns(editGateway);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={gateways} />
    </div>
  )
}

export default GatewaysListView