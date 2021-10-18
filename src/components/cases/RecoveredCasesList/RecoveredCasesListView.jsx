import React from 'react'
import { Table } from 'antd';
import { getRecoveredCasesColumns } from '../../../constants/tables';

const RecoveredCasesListView = ({ cases }) => {
  const columns = getRecoveredCasesColumns()
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={cases} />
    </div>
  )
}

export default RecoveredCasesListView