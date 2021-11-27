import React from 'react'
import { useState, useContext } from 'react';
import { Button, PageHeader, Row, notification } from 'antd';
import useUsers from '../../hooks/Users/useUsers';
import { UserList, AddUser, EditUser } from "../../components/users";
import Context from "../../contexts/mainContext";

const UsersView = () => {
  const { mainData } = useContext(Context.Consumer);
  const { user: { idOrganization } } = mainData;
  const { users, postUser, roles, removeUser, editUser, loading } = useUsers();
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [editUserVisible, setEditUserVisible] = useState(false)
  const [user, setCurrentUser] = useState(null)
  const openNotification = (type, title, message) =>
    notification[type]({
      message: title,
      description: message,
    });
  const setEditUser = (prop) => {
    setCurrentUser(prop)
    setEditUserVisible(true)
  }

  const onCloseEditUser = () => {
    setEditUserVisible(!editUserVisible)
  }

  const addUser = (prop) => {
    postUser({ ...prop, idOrganization: idOrganization });
  }

  const printError = () => {
    openNotification(
      "error",
      "Email no válido",
      "El correo electrónico que ingresó ya existe"
    );
  }

  return (
    <>
      <PageHeader
        onBack={null}
        title="Configuración"
        subTitle="Usuarios" />
      <AddUser
        addUser={addUser}
        visible={addUserVisible}
        onClose={() => setAddUserVisible(!addUserVisible)}
        roles={roles}
        users={users}
        printError={printError}
      />
      <EditUser
        user={user}
        visible={editUserVisible}
        onClose={() => onCloseEditUser()}
        removeUser={removeUser}
        editUser={editUser}
        roles={roles}
        setEditUserVisible={setEditUserVisible}
        users={users}
        printError={printError}
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
        loading={loading}
      />
    </>
  )
}

export default UsersView
