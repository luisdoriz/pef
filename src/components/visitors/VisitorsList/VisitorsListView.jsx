import React from 'react'
import { Table } from 'antd';
import { getVisitorColumns } from '../../../constants/tables';

const VisitorsListView = ({ visitors, deleteVisitor }) => {
  const columns = getVisitorColumns(deleteVisitor)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={visitors} />
    </div>
  )
}

export default VisitorsListView
