import React from 'react'
import { Table } from 'antd';
import { getFacilitiesColumns } from '../../../constants/tables';

const FacilitiesListView = ({ facilities, editFacility, loading }) => {
  const columns = getFacilitiesColumns(editFacility);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={facilities} loading={loading} />
    </div>
  )
}

export default FacilitiesListView