import React from 'react'
import { Table } from 'antd';
import { getRecoveredCasesColumns } from '../../../constants/tables';

const RecoveredCasesListView = ({ cases, facilities, loading}) => {
  const columns = getRecoveredCasesColumns(facilities)
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={cases} loading={loading} />
    </div>
  )
}

export default RecoveredCasesListView