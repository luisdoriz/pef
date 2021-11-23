import React from 'react'
import { Table } from 'antd';
import { getFacilitiesColumns } from '../../../constants/tables';

const FacilitiesListView = ({ facilities, loading, removeFacility }) => {
  const columns = getFacilitiesColumns(removeFacility);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={facilities} loading={loading} scroll={{ y: 400 }}  />
    </div>
  )
}

export default FacilitiesListView