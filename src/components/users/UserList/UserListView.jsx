import React from 'react'
import { Table } from 'antd';
import { getUserColumns } from '../../../constants/tables';

const UserListView = ({ users, editUser, roles }) => {
  const columns = getUserColumns(editUser, roles)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default UserListView
