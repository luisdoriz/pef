import React from 'react'
import { Table } from 'antd';
import { getAreasColumns } from '../../../constants/tables';

const AreasListView = ({ areas, editArea, loading }) => {
  const columns = getAreasColumns(editArea);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={areas} loading={loading} scroll={{ y: 300 }}  />
    </div>
  )
}

export default AreasListView