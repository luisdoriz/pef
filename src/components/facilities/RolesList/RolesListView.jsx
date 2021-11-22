import React from 'react'
import { Table } from 'antd';
import { getPrivilegeLevelColumns } from '../../../constants/tables';

const RolesListView = ({ roles, editRole, loading }) => {
  const columns = getPrivilegeLevelColumns(editRole);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={roles} loading={loading} scroll={{ y: 300 }} pagination={{position:["none","none"]}} />
    </div>
  )
}

export default RolesListView