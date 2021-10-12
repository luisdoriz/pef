import React from 'react'
import { Table } from 'antd';
import { getEmployeesColumns } from '../../../constants/tables';


const EmployeeListView = ({ employees, facilities, editEmployee }) => {
  const columns = getEmployeesColumns(facilities, editEmployee)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={employees} />
    </div>
  )
}

export default EmployeeListView
