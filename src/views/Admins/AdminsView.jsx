import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row, notification } from 'antd';
import { AdminsList, AddAdmin, EditAdmin } from "../../components/organizations";
import { useHistory, useParams } from "react-router-dom";
import { useUsers } from '../../hooks';

const AdminsView = () => {
  let history = useHistory();
  const { idOrganization } = useParams();
  const { admins, loading, postUser, removeUser, editUser } = useUsers(idOrganization);
  const [addAdminVisible, setAddAdminVisible] = useState(false)
  const [editAdminVisible, setEditAdminVisible] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const openNotification = (type, title, message) =>
    notification[type]({
      message: title,
      description: message,
    });

  const setEditAdmin = (prop) => {
    setSelectedAdmin(prop)
    setEditAdminVisible(true)
  }

  const addAdmin = (prop) => {
    postUser({ ...prop, idRole: 2, idOrganization: idOrganization })
  }

  const removeAdmin = (prop) => {
    removeUser(prop);
  }

  const printError = () => {
    openNotification(
      "error",
      "Valores no válidos",
      "El nombre o email que ingresó ya existe"
    );
  }

  return (
    <>
      <PageHeader
        title="Administradores"
        onBack={() => history.goBack()}
      />
      <AddAdmin
        addAdmin={addAdmin}
        visible={addAdminVisible}
        onClose={() => setAddAdminVisible(false)}
        admins={admins}
        printError={printError}
      />
      <EditAdmin
        editAdmin={editUser}
        visible={editAdminVisible}
        onClose={() => setEditAdminVisible(false)}
        admins={admins}
        printError={printError}
        removeAdmin={removeAdmin}
        selectedAdmin={selectedAdmin}
        setEditAdminVisible={setEditAdminVisible}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddAdminVisible(true)}
        >
          Agregar
        </Button>
      </Row>
      <AdminsList
        admins={admins}
        loading={loading}
        editAdmin={setEditAdmin}
      />
    </>
  )
}

export default AdminsView
