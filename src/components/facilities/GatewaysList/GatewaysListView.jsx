import React from 'react'
import { Table } from 'antd';
import { getGatewaysColumns } from '../../../constants/tables';

const GatewaysListView = ({ gateways, editGateway, loading }) => {
  const columns = getGatewaysColumns(editGateway);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={gateways} loading={loading} scroll={{ y: 300 }} pagination={{position:["none","none"]}}/>
    </div>
  )
}

export default GatewaysListView