import React from 'react'
import { Table } from 'antd';
import { getOrganizationsColumns } from '../../../constants/tables';

const OrganizationsListView = ({ organizations, loading, editOrganization }) => {
  const columns = getOrganizationsColumns(editOrganization)
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={organizations} loading={loading} scroll={{ y: 400 }} pagination={{position:["none","none"]}}/>
    </div>
  )
}

export default OrganizationsListView
