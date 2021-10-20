import React from 'react'
import { Table } from 'antd';
import { getCasesColumns } from '../../../constants/tables';
import {
  LoadingOutlined
} from "@ant-design/icons";

const ActiveCasesListView = ({ cases, seeCaseDetail, loading }) => {
  const columns = getCasesColumns(seeCaseDetail)
  if(loading){
    return (
      <div style={{ paddingTop: 16 }}>
        <LoadingOutlined />
      </div>
    )
  }
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={cases} />
    </div>
  )
}

export default ActiveCasesListView
