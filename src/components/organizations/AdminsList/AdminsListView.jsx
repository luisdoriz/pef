import React from 'react'
import { Table } from 'antd';
import { getAdminColumns } from '../../../constants/tables';

const AdminsListView = ({ admins, loading, editAdmin }) => {
  const columns = getAdminColumns(editAdmin)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={admins} loading={loading} scroll={{ y: 400 }}  />
    </div>
  )
}

export default AdminsListView
