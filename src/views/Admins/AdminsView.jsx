import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row, notification } from 'antd';
import { AdminsList, AddAdmin, EditAdmin } from "../../components/organizations";
import { useHistory, useParams } from "react-router-dom";

const AdminsView = () => {
  let history = useHistory();
  let { idOrganization } = useParams();
  const organizations = [
    {
      name: "Org 1",
      address: "Su casa",
      phoneNumber: "8120001227",
      idOrganization: 1
    },
    {
      name: "Org 2",
      address: "Tu casa",
      phoneNumber: "8101231627",
      idOrganization: 2
    }
  ]
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
    console.log(prop) //TODO PONER RUTAS
  }
  const editAdmin = (prop) => {
    console.log(prop) //TODO PONER RUTAS
  }
  const removeAdmin = (prop) => {
    console.log(prop) //TODO PONER RUTAS
  }

  const printError = () => {
    openNotification(
      "error",
      "Valores no válidos",
      "El nombre o email que ingresó ya existe"
    );
  }
  const loading = false
  const admins = [
    {
      idAdmin: 1,
      name: "Admin 1",
      email: "correo1@correo.com",
    },
    {
      idAdmin: 2,
      name: "Admin 2",
      email: "correo2@correo.com",
    },
  ]
  return (
    <>
      <PageHeader
        title="Administradores"
        subTitle={'1'}
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
        editAdmin={editAdmin}
        visible={editAdminVisible}
        onClose={() => setEditAdminVisible(false)}
        admins={admins}
        printError={printError}
        removeAdmin={removeAdmin}
        selectedAdmin={selectedAdmin}
        setEditAdminVisible={setEditAdmin}
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
