import React from 'react'
import { Table } from 'antd';
import { getCurrentAreasColumns } from '../../../constants/tables';

const CurrentAreasListView = ({ areas, deleteArea }) => {
  console.log(areas)
  const columns = getCurrentAreasColumns(deleteArea);
  return (
    <div >
      <Table columns={columns} dataSource={areas} />
    </div>
  )
}

export default CurrentAreasListView