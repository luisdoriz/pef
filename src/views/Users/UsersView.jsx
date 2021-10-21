import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row } from 'antd';
import useUsers from '../../hooks/Users/useUsers';
import { UserList, AddUser, EditUser } from "../../components/users";

const UsersView = () => {
  
  const { users, postUser, roles, removeUser, editUser } = useUsers();
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [editUserVisible, setEditUserVisible] = useState(false)
  const [user, setCurrentUser] = useState(null)

  const setEditUser = (prop) => {
    setCurrentUser(prop)
    setEditUserVisible(true)
  }

  const onCloseEditUser = () => {
    setEditUserVisible(!editUserVisible)
  }

  const addUser = (prop) => {
    postUser(prop);
  }

  return (
    <>
      <PageHeader
        onBack={null}
        title="Configuracion"
        subTitle="Usuarios" />
      <AddUser
        addUser={addUser}
        visible={addUserVisible}
        onClose={() => setAddUserVisible(!addUserVisible)}
        roles={roles}
      />
      <EditUser
        user={user}
        visible={editUserVisible}
        onClose={() => onCloseEditUser()}
        removeUser={removeUser}
        editUser={editUser}
        roles={roles}
        setEditUserVisible={setEditUserVisible}
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
        editUser={setEditUser}
        roles={roles}
      />
    </>
  )
}

export default UsersView
