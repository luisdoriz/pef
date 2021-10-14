import React from 'react'
import { Table } from 'antd';
import { getCasesColumns } from '../../../constants/tables';

const ActiveCasesListView = ({ cases, seeCaseDetail }) => {
  const columns = getCasesColumns(seeCaseDetail)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={cases} />
    </div>
  )
}

export default ActiveCasesListView
