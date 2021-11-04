import React from 'react'
import { Table } from 'antd';
import { getCurrentAreasColumns } from '../../../constants/tables';

const CurrentAreasListView = ({ names, deleteArea }) => {
  const columns = getCurrentAreasColumns(deleteArea);
  return (
    <div >
      <Table columns={columns} dataSource={names} />
    </div>
  )
}

export default CurrentAreasListView