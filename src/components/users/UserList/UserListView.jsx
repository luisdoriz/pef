import React from 'react'
import { Table } from 'antd';
import { getUserColumns } from '../../../constants/tables';

const UserListView = ({ users, editUser }) => {
  const columns = getUserColumns(editUser)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default UserListView
