import React from 'react'
import { Table } from 'antd';
import { getCurrentAreasColumns } from '../../../constants/tables';

const CurrentAreasListView = ( {names  }) => {
  const columns = getCurrentAreasColumns();
  return (
    <div >
      <Table columns={columns} dataSource={names} scroll={{ y: 300 }}  />
    </div>
  )
}

export default CurrentAreasListView