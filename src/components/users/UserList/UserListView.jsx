import React from 'react'
import { Table } from 'antd';
import { getUserColumns } from '../../../constants/tables';

const UserListView = ({ users, editUser, roles, loading }) => {
  const columns = getUserColumns(editUser, roles)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={users} loading={loading} scroll={{ y: 400 }} pagination={{position:["none","none"]}}/>
    </div>
  )
}

export default UserListView
