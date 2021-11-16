import React from 'react'
import { Table } from 'antd';
import { getEmployeesColumns } from '../../../constants/tables';


const EmployeeListView = ({ employees, facilities, editEmployee, privilegeLevels, loading }) => {
  const columns = getEmployeesColumns(facilities, editEmployee, privilegeLevels)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={employees} loading={loading} />
    </div>
  )
}

export default EmployeeListView
