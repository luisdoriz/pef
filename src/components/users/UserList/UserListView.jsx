import React from 'react'
import { Table, Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

const EmployeeListView = ({ users, editUser }) => {
  const sorter = (a, b) => a.name.length - b.name.length
  const sortDirections = ['descend']
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
      title: 'Apellido', dataIndex: 'lastName', key: 'lastName', sorter,
      sortDirections,
    },
    {
      title: 'Correo', dataIndex: 'email', key: 'email', sorter,
      sortDirections,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => editUser(row)}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      />,
    },
  ];
  return (
    <div style={{ paddingTop: 16 }}>
      <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default EmployeeListView
