import React from 'react'
import { Table } from 'antd';
import { getVisitorColumns } from '../../../constants/tables';

const VisitorsListView = ({ visitors, editVisitor, loading }) => {
  const columns = getVisitorColumns(editVisitor)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={visitors} loading={loading} scroll={{ y: 400 }}  />
    </div>
  )
}

export default VisitorsListView
