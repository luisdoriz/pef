import React from 'react'
import { Table } from 'antd';
import { getFacilitiesColumns } from '../../../constants/tables';

const FacilitiesListView = ({ facilities, editFacility }) => {
  console.log(facilities)
  const columns = getFacilitiesColumns(editFacility);
  return (
    <div style={{ paddingTop: 16}}>
      <Table columns={columns} dataSource={facilities} />
    </div>
  )
}

export default FacilitiesListView