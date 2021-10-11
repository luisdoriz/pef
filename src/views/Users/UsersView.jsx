import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row, Col } from 'antd';

import { UserList, AddUser, EditUser } from "../../components/users";
const initialUsers = []
const UsersView = () => {
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [editUserVisible, setEditUserVisible] = useState(false)
  const [user, setCurrentUser] = useState(null)
  const [users, setUsers] = useState(initialUsers)

  const editUser = (prop) => {
    setCurrentUser(prop)
    setEditUserVisible(true)
  }

  const onCloseEditUser = () => {
    setEditUserVisible(!editUserVisible)
    setCurrentUser(null)
  }
  return (
    <>
      <PageHeader
        onBack={null}
        title="Configuracion"
        subTitle="Usuarios" />
      <AddUser
        setUsers={(e) => setUsers([e, ...users])}
        visible={addUserVisible}
        onClose={() => setAddUserVisible(!addUserVisible)}
      />
      <EditUser
        user={user}
        visible={editUserVisible}
        onClose={() => onCloseEditUser()}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddUserVisible(!addUserVisible)}
        >
          Agregar
        </Button>
      </Row>
      <UserList
        users={users}
        editUser={editUser}
      />
    </>
  )
}

export default UsersView
