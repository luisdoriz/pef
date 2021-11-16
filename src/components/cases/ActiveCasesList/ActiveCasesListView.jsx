import React from 'react'
import { Table } from 'antd';
import { getCasesColumns } from '../../../constants/tables';

const ActiveCasesListView = ({ cases, seeCaseDetail, loading, facilities }) => {
  const columns = getCasesColumns(seeCaseDetail, facilities)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={cases} loading={loading} />
    </div>
  )
}

export default ActiveCasesListView
