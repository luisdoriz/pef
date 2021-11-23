import React from 'react'
import { Table } from 'antd';
import { getPrivilegeLevelColumns } from '../../../constants/tables';

const RolesListView = ({ roles, editRole, loading, idFacility }) => {
  const columns = getPrivilegeLevelColumns(editRole);
  const rolesFacility = roles.filter((privilegeLevel) => privilegeLevel.idFacility === Number(idFacility));
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={rolesFacility} loading={loading} scroll={{ y: 300 }}   />
    </div>
  )
}

export default RolesListView