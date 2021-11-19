import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row, notification } from 'antd';
import { AddOrganization, OrganizationsList, EditOrganization } from "../../components/organizations";

const OrganizationsView = () => {
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
  const [addOrganizationVisible, setAddOrganizationVisible] = useState(false)
  const [editOrganizationVisible, setEditOrganizationVisible] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState(null)

  const openNotification = (type, title, message) =>
    notification[type]({
      message: title,
      description: message,
    });

  const setEditOrganization = (prop) => {
    setSelectedOrganization(prop)
    setEditOrganizationVisible(true)
  }

  const addOrganization = (prop) => {
    console.log(prop) //TODO PONER RUTAS
  }
  const editOrganization = (prop) => {
    console.log(prop) //TODO PONER RUTAS
  }
  const removeOrganization = (prop) => {
    console.log(prop) //TODO PONER RUTAS
  }

  const printError = () => {
    openNotification(
      "error",
      "Nombre no válido",
      "El nombre que ingresó ya existe"
    );
  }

  const loadingOrganizations = false

  return (
    <>
      <PageHeader
        onBack={null}
        title="Organizaciones"
      />
      <AddOrganization
        addOrganization={addOrganization}
        visible={addOrganizationVisible}
        onClose={() => setAddOrganizationVisible(false)}
        organizations={organizations}
        printError={printError}
      />
      <EditOrganization
        editOrganization={editOrganization}
        visible={editOrganizationVisible}
        onClose={() => setEditOrganizationVisible(false)}
        organizations={organizations}
        printError={printError}
        removeOrganization={removeOrganization}
        selectedOrganization={selectedOrganization}
        setEditOrganizationVisible={setEditOrganizationVisible}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddOrganizationVisible(true)}
        >
          Agregar
        </Button>
      </Row>
      <OrganizationsList
        organizations={organizations}
        loading={loadingOrganizations}
        editOrganization={setEditOrganization}
      />
    </>
  )
}

export default OrganizationsView
